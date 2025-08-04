// logic.js
import 'dotenv/config';
import OpenAI from 'openai';
import { TEXTS } from './texts.js';
import fs from 'fs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
let sessions = {};
const SESSIONS_FILE = 'sessions.json';

function saveSessions() {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
}

function loadSessions() {
  try {
    const data = fs.readFileSync(SESSIONS_FILE, 'utf8');
    sessions = JSON.parse(data);
    console.log('✅ Sessies geladen vanuit bestand.');
  } catch (err) {
    console.log('⚠️ Geen sessies bestand gevonden of fout bij het laden. Start met een lege sessie.');
    sessions = {};
  }
}

loadSessions();

function getSession(id) {
  if (!sessions[id]) {
    sessions[id] = { step: "language", lang: null, answers: {} };
  }
  return sessions[id];
}

function parseIndex(msg, options) {
  const match = msg.match(/\d+/);
  if (!match) return null;
  const idx = parseInt(match[0]) - 1;
  if (isNaN(idx) || idx < 0 || idx >= options.length) return null;
  return options[idx];
}

export async function handleMessage(from, msg) {
  const session = getSession(from);
  const a = session.answers;
  const text = msg.trim();
  const lower = text.toLowerCase();

  console.log(`🧭 ${from} | step: ${session.step} | lang: ${session.lang} | text: "${text}"`);

  if (["reset", "stop", "/start"].includes(lower)) {
    sessions[from] = { step: "language", lang: null, answers: {} };
    saveSessions();
    return ["🌍 Please select your language / Пожалуйста, выберите язык / Por favor seleccione idioma:\n\n1️⃣ Русский 🇷🇺\n2️⃣ Español 🇪🇸\n3️⃣ English 🇬🇧", []];
  }

  if (session.step === "language") {
    let newLang = null;
    if (["1", "русский", "ru"].includes(lower)) newLang = "ru";
    else if (["2", "español", "es"].includes(lower)) newLang = "es";
    else if (["3", "english", "en"].includes(lower)) newLang = "en";

    if (newLang) {
      session.lang = newLang;
      session.step = "gdpr";
      saveSessions();
      const t = TEXTS[newLang];
      return [t.gdpr_intro, t.gdpr_buttons];
    } else {
      const fallback = "🌍 Please select your language / Пожалуйста, выберите язык / Por favor seleccione idioma:\n\n1️⃣ Русский 🇷🇺\n2️⃣ Español 🇪🇸\n3️⃣ English 🇬🇧";
      return [fallback, []];
    }
  }

  const t = TEXTS[session.lang] || TEXTS.ru;
  if (!t.symptoms_options || !Array.isArray(t.symptoms_options)) {
    return ["⚠️ Ошибка конфигурации. Пожалуйста, попробуйте позже.", []];
  }

  let responseText;
  let responseButtons = [];

  switch (session.step) {
    case "gdpr":
      if (text.startsWith("1")) {
        session.step = "name";
        responseText = t.ask_name;
      } else if (text.startsWith("2")) {
        responseText = t.gdpr_more;
        responseButtons = t.gdpr_buttons;
      } else {
        responseText = t.invalid_input;
        responseButtons = t.gdpr_buttons;
      }
      break;

    case "name":
      a.name = text;
      session.step = "age";
      responseText = t.ask_age;
      break;

    case "age":
      if (!/^\d+$/.test(text)) {
        responseText = t.invalid_age;
      } else {
        a.age = parseInt(text);
        session.step = "symptoms";
        responseText = t.ask_symptoms + "\n" + t.symptoms_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      }
      break;

    case "symptoms": {
      const selected = text.split(",").map(s => parseInt(s.trim())).filter(i => i >= 1 && i <= t.symptoms_options.length);
      if (selected.length === 0) {
        responseText = t.invalid_input;
      } else {
        a.symptoms = selected.map(i => t.symptoms_options[i - 1]);
        const isSummer = new Date().getMonth() >= 5 && new Date().getMonth() <= 8;
        const hasPigmentation = a.symptoms.includes(t.symptoms_options[1]);
        if (isSummer && hasPigmentation) {
          session.step = "pigment_warning";
          responseText = t.pigment_warning;
          responseButtons = t.gdpr_buttons;
        } else {
          session.step = "skin";
          responseText = t.ask_skin + "\n" + t.skin_types_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
        }
      }
      break;
    }

    case "pigment_warning":
      session.step = "skin";
      responseText = t.ask_skin + "\n" + t.skin_types_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      break;

    case "skin": {
      const skin = parseIndex(text, t.skin_types_options);
      if (!skin) {
        responseText = t.invalid_input;
        responseButtons = t.skin_types_options.map((s, i) => `${i + 1}. ${s}`);
      } else {
        a.skin_type = skin;
        session.step = "cleansing";
        responseText = t.ask_cleansing + "\n" + t.cleansing_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      }
      break;
    }

    case "cleansing": {
      const cln = parseIndex(text, t.cleansing_options);
      if (!cln) {
        responseText = t.invalid_input;
        responseButtons = t.cleansing_options.map((s, i) => `${i + 1}. ${s}`);
      } else {
        a.cleansing = cln;
        session.step = "frequency";
        responseText = t.ask_frequency + "\n" + t.frequency_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      }
      break;
    }

    case "frequency": {
      const fr = parseIndex(text, t.frequency_options);
      if (!fr) {
        responseText = t.invalid_input;
        responseButtons = t.frequency_options.map((s, i) => `${i + 1}. ${s}`);
      } else {
        a.frequency = fr;
        session.step = "homecare";
        responseText = t.ask_homecare + "\n" + t.homecare_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      }
      break;
    }

    case "homecare": {
      const hc = parseIndex(text, t.homecare_options);
      if (!hc) {
        responseText = t.invalid_input;
        responseButtons = t.homecare_options.map((s, i) => `${i + 1}. ${s}`);
      } else {
        a.homecare = hc;
        session.step = "conditions";
        responseText = t.ask_conditions + "\n" + t.conditions_options.map((s, i) => `${i + 1}. ${s}`).join("\n");
      }
      break;
    }

    case "conditions": {
      const cond = text.split(",").map(i => parseInt(i.trim())).filter(i => i >= 1 && i <= t.conditions_options.length);
      if (!cond.length) {
        responseText = t.invalid_input;
        responseButtons = t.conditions_options.map((s, i) => `${i + 1}. ${s}`);
      } else {
        a.conditions = cond.map(i => t.conditions_options[i - 1]);
        session.step = "summary";
        responseText = "🔎 " + buildSummary(t, a);
        responseButtons = t.confirm_summary;
      }
      break;
    }

    case "summary":
      if (text.startsWith("1")) {
        const offer = await generateOffer(a, session.lang);
        if (offer === t.sensitive_condition_message || offer === t.pigment_warning_summer) {
          session.step = "handoff";
          responseText = offer;
        } else {
          session.step = "offer";
          responseText = offer;
          responseButtons = t.offer_options;
        }
      } else if (text.startsWith("2")) {
        session.step = "age";
        responseText = t.ask_age;
      } else {
        responseText = t.invalid_summary_choice;
        responseButtons = t.confirm_summary;
      }
      break;

    case "offer":
      if (text.startsWith("1")) {
        session.step = "book";
        responseText = t.ask_datetime;
      } else if (text.startsWith("2")) {
        session.step = "handoff";
        responseText = t.handoff;
      } else {
        responseText = t.invalid_input;
        responseButtons = t.offer_options;
      }
      break;

    case "book":
      a.datetime = text;
      session.step = "done";
      responseText = t.booked(text);
      break;

    case "handoff":
    case "done":
      responseText = t.handoff;
      break;

    default:
      responseText = t.invalid_input;
      break;
  }

  saveSessions();
  return [responseText, responseButtons];
}

function buildSummary(t, a) {
  return (
    `${t.summary_intro}\n` +
    `${t.summary_name}: ${a.name}\n` +
    `${t.summary_age}: ${a.age}\n` +
    `${t.summary_symptoms}: ${a.symptoms.join(", ")}\n` +
    `${t.summary_skin_type}: ${a.skin_type}\n` +
    `${t.summary_cleansing}: ${a.cleansing}\n` +
    `${t.summary_frequency}: ${a.frequency}\n` +
    `${t.summary_homecare}: ${a.homecare}\n` +
    `${t.summary_conditions}: ${a.conditions.join(", ")}`
  );
}

async function generateOffer(data, lang) {
  const t = TEXTS[lang] || TEXTS.ru;
  const sensitiveConditions = [t.conditions_options[1], t.conditions_options[3], t.conditions_options[4]];
  const hasSensitiveCondition = data.conditions.some(condition => sensitiveConditions.includes(condition));
  if (hasSensitiveCondition) return t.sensitive_condition_message;

  const isSummer = new Date().getMonth() >= 5 && new Date().getMonth() <= 8;
  const hasPigmentation = data.symptoms.includes(t.symptoms_options[1]);
  if (isSummer && hasPigmentation) return t.pigment_warning_summer;

  try {
    const r = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: t.openai_system },
        { role: "user", content: t.openai_user_template(data) }
      ]
    });
    return r.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI Error:", err);
    return t.openai_error;
  }
}
// test auto-update at 14:35