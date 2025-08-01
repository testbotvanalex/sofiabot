// index.js
import fs from 'fs';
import {
  makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys';
import P from 'pino';
import 'dotenv/config';
import { handleMessage } from './logic.js';

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_state');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) console.log('📱 Сканируй QR-код для входа:\n', qr);
    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log('❌ Соединение закрыто. Переподключение?', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ WhatsApp подключён!');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message?.buttonsResponseMessage?.selectedButtonId ||
      '';

    if (!text) return;
    console.log(`📩 ${sender}: ${text}`);

    const [reply, buttons] = await handleMessage(sender, text);

    await sock.sendMessage(sender, { text: reply });
    if (buttons.length > 0) {
      const buttonText = buttons.map((b, i) => `${i + 1}. ${b}`).join('\n');
      await sock.sendMessage(sender, { text: `\n${buttonText}` });
    }
  });
}

startBot().catch((err) => console.error('Ошибка запуска бота:', err));