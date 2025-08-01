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
import qrcode from 'qrcode';

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
      console.log("📱 Генерирую QR-код...");
      await qrcode.toFile("qr.png", qr);
      console.log("✅ QR-код сохранён в qr.png");
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg?.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!text?.toLowerCase().includes("sofia")) return;

    const cleanText = text.replace(/sofia/i, '').trim();
    const [responseText, responseButtons] = await handleMessage(from, cleanText);

    await sock.sendMessage(from, {
      text: responseText,
      ...(responseButtons.length > 0 && {
        buttons: responseButtons.map(b => ({ buttonId: b, buttonText: { displayText: b }, type: 1 })),
        footer: '',
      }),
    });
  });
}

startBot();
