// index.js
import fs from 'fs';
import {
  makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import P from 'pino';
import 'dotenv/config';
import qrcode from 'qrcode';
import { handleMessage, getSession } from './logic.js';

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_state');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log('📱 Генерирую QR-код...');
      await qrcode.toFile('qr.png', qr);
      console.log('✅ QR-код сохранён в qr.png');
    }

    if (connection === 'open') {
      console.log('✅ Бот подключён к WhatsApp!');
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('🔌 Соединение закрыто. Повторное подключение:', shouldReconnect);
      if (shouldReconnect) startBot();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const from = m.key.remoteJid;
    const msg =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      m.message.imageMessage?.caption ||
      '';

    if (!msg || !from) return;

    const cleanMsg = msg.trim().toLowerCase();
    const session = getSession(from);
    const isStartCommand = ['sofia', 'reset', '/start', '1', '2', '3'].includes(cleanMsg);
    const isActiveSession = session?.lang !== null;

    if (!isStartCommand && !isActiveSession) {
      console.log('🔕 Игнорируем сообщение:', msg);
      return;
    }

    console.log(`📩 Сообщение от ${from}: ${msg}`);

    try {
      const [text, buttons] = await handleMessage(from, msg);

      const isShort = text.length < 300 && !text.includes('\n\n');

      if (buttons.length > 0 && isShort) {
        await sock.sendMessage(from, {
          text,
          footer: 'The Beauty Salon 💆‍♀️',
          buttons: buttons.map((b, i) => ({
            buttonId: `btn_${i + 1}`,
            buttonText: { displayText: b },
            type: 1,
          })),
        });
      } else {
        await sock.sendMessage(from, { text });

        if (buttons.length > 0) {
          await sock.sendMessage(from, {
            text: '👇',
            footer: 'The Beauty Salon 💆‍♀️',
            buttons: buttons.map((b, i) => ({
              buttonId: `btn_${i + 1}`,
              buttonText: { displayText: b },
              type: 1,
            })),
          });
        }
      }
    } catch (err) {
      console.error('❌ Ошибка при обработке сообщения:', err);
    }
  });
}

startBot();