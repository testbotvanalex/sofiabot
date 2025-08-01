// gpt.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateOffer(data, lang = "ru") {
  const t = translate(lang);
  const prompt = `${t.prompt_intro} ${t.prompt_data(data)} ${t.prompt_outro}`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: t.system },
        { role: "user", content: prompt }
      ]
    });
    return chat.choices[0].message.content.trim();
  } catch (e) {
    console.error("❌ GPT error:", e);
    return t.error;
  }
}

function translate(lang) {
  const prompts = {
    ru: {
      system: "Ты косметолог из премиального салона красоты в Испании.",
      prompt_intro: "Клиент прошёл мини-диагностику. Подбери подходящую процедуру.",
      prompt_data: (d) => `Возраст: ${d.age}, жалобы: ${d.symptoms}, тип кожи: ${d.skin}, чистка: ${d.cleansing}, частота: ${d.frequency}, домашний уход: ${d.homecare}, противопоказания: ${d.conditions}.`,
      prompt_outro: "Опиши 1 процедуру, укажи цену и 3–4 преимущества. Добавь: 'бесплатная диагностика включена'.",
      error: "⚠️ Не удалось получить персональное предложение. Попробуйте позже."
    },
    es: {
      system: "Eres esteticista de un centro de belleza premium en España.",
      prompt_intro: "El cliente ha realizado un mini diagnóstico. Sugiere un tratamiento adecuado.",
      prompt_data: (d) => `Edad: ${d.age}, molestias: ${d.symptoms}, piel: ${d.skin}, limpieza: ${d.cleansing}, frecuencia: ${d.frequency}, cuidado en casa: ${d.homecare}, contraindicaciones: ${d.conditions}.`,
      prompt_outro: "Describe 1 tratamiento, incluye precio y 3–4 beneficios. Añade: 'el diagnóstico gratuito está incluido'.",
      error: "⚠️ No se pudo generar la propuesta. Inténtalo más tarde."
    },
    en: {
      system: "You are a professional cosmetologist from a premium beauty salon in Spain.",
      prompt_intro: "The client has completed a mini-diagnosis. Suggest a suitable treatment.",
      prompt_data: (d) => `Age: ${d.age}, issues: ${d.symptoms}, skin type: ${d.skin}, cleansing: ${d.cleansing}, frequency: ${d.frequency}, homecare: ${d.homecare}, contraindications: ${d.conditions}.`,
      prompt_outro: "Describe one treatment, add price and 3–4 benefits. Include: 'free diagnosis included'.",
      error: "⚠️ Failed to generate a personalized offer. Try again later."
    }
  };

  return prompts[lang] || prompts.ru;
}
