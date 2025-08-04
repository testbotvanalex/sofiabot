// texts.js
export const TEXTS = {
  ru: {
    gdpr_intro: "🌸 Добро пожаловать в *The Beauty Salon*!\nПрежде чем мы начнём, мне нужно немного информации, чтобы всё прошло корректно:\n🔐 Мы соблюдаем закон о защите персональных данных (GDPR). Продолжая, вы даёте согласие на обработку предоставленных данных с целью связи, диагностики и записи на процедуры.",
    gdpr_more: "📋 Мы собираем только нужную информацию, чтобы подобрать для вас индивидуальный уход. Всё в соответствии с GDPR (Испания).\nПолитика конфиденциальности: https://www.estetica-santa-ponsa.es/privacy",
    ask_name: "😊 Отлично! Как я могу к вам обращаться? (Имя и фамилия)",
    ask_age: "📆 Сколько вам лет?",
    invalid_age: "❗ Пожалуйста, введите ваш возраст цифрой.",
    ask_symptoms: "🎯 Что вас беспокоит? Укажите цифры через запятую:",
    symptoms_options: [
      "Акне и постакне",
      "Пигментные пятна",
      "Купероз",
      "Морщины и потеря упругости",
      "Жирный блеск и расширенные поры",
      "Обезвоживание и сухость"
    ],
    ask_skin: "🧴 Какой у вас тип кожи?",
    skin_types_options: [
      "Нормальная",
      "Сухая",
      "Жирная",
      "Комбинированная",
      "Чувствительная"
    ],
    ask_cleansing: "🧼 Когда была последняя чистка?",
    cleansing_options: [
      "Меньше 3 месяцев назад",
      "Больше 3 месяцев назад",
      "Никогда"
    ],
    ask_frequency: "📅 Как часто вы ходите к косметологу?",
    frequency_options: [
      "Каждый месяц",
      "Несколько раз в год",
      "Редко"
    ],
    ask_homecare: "🏠 Пользуетесь ли вы домашним уходом?",
    homecare_options: [
      "Да, регулярно",
      "Иногда",
      "Нет"
    ],
    ask_conditions: "⚠️ Есть ли у вас противопоказания?",
    conditions_options: [
      "Беременность/ГВ",
      "Онкология",
      "Аллергия",
      "Хронические заболевания",
      "Приём ретинола/витамина А"
    ],
    pigment_warning: "☀️ Летом мы не делаем агрессивную коррекцию пигментации.\nПредлагаем мягкий уход и можем записать на осень 🍂",
    summary_intro: "📋 Проверьте, пожалуйста:",
    confirm_summary: ["1️⃣ Всё верно 👍", "2️⃣ Изменить ✍️"],
    offer_options: ["📅 Записаться на процедуру", "💬 Связаться со специалистом"],
    ask_datetime: "🗓️ Напишите, пожалуйста, удобную дату и время (например, *завтра в 15:00*)",
    booked: (dt) => `✅ Записал: *${dt}*. Мы подтвердим ближайшее время! Спасибо за запись 🌸`,
    handoff: "👩‍⚕️ Специалист скоро свяжется с вами лично. Благодарим за обращение! 😊",
    invalid_input: "❗ Пожалуйста, выберите корректный вариант.",
    invalid_summary_choice: "❗ Пожалуйста, выберите:\n1️⃣ Всё верно 👍\n2️⃣ Изменить ✍️",
    choose_lang: "🌍 Здравствуйте! Пожалуйста, выберите язык:",
    lang_buttons: ["1 – Русский", "2 – Español", "3 – English"],
    gdpr_buttons: ["1️⃣ Продолжить", "2️⃣ Подробнее"],
    summary_name: "Имя",
    summary_age: "Возраст",
    summary_symptoms: "Жалобы",
    summary_skin_type: "Тип кожи",
    summary_cleansing: "Последняя чистка",
    summary_frequency: "Уход",
    summary_homecare: "Домашний уход",
    summary_conditions: "Противопоказания",
    openai_system: "Ты профессиональный косметолог из премиального салона. Используй эмодзи, не пиши слишком много, цена в евро (€), диагностика включена.",
    openai_user_template: (data) => `Клиент: 👤 имя ${data.name}, 🎂 возраст ${data.age}, 🔎 жалобы: ${data.symptoms.join(", ")}, 🧴 тип кожи: ${data.skin_type}, 🧼 чистка: ${data.cleansing}, 💆 уход: ${data.frequency}, 🏠 домашний уход: ${data.homecare}, ⚠️ противопоказания: ${data.conditions.join(", ")}. ✨ Подбери коротко одну процедуру с описанием, ценой (€) en преимуществами.`,
    openai_error: "⚠️ Не удалось сформировать предложение. Попробуйте позже.",
    sensitive_condition_message: "⚠️ Из-за упомянутого вами состояния мы не можем автоматически подобрать процедуру. Специалист скоро свяжется с вами лично. Спасибо за понимание!",
    pigment_warning_summer: "☀️ Летом мы избегаем агрессивных процедур по пигментации. Специалист предложит альтернативу и запишет на осень. Спасибо! 🍂"
  },
  es: {
    gdpr_intro: "🌸 Bienvenido a *The Beauty Salon*!\nAntes de empezar, necesitamos un poco de información para poder atenderle correctamente:\n🔐 Cumplimos con la ley de protección de datos (GDPR). Al continuar, acepta el uso de sus datos para contacto, diagnóstico y reserva.",
    gdpr_more: "📋 Solo recopilamos la información necesaria para ofrecerle un cuidado personalizado. Conforme al GDPR (España).\nPolítica de privacidad: https://www.estetica-santa-ponsa.es/privacy",
    ask_name: "😊 ¡Perfecto! ¿Cómo podemos dirigirnos a usted? (Nombre y apellido)",
    ask_age: "📆 ¿Cuántos años tiene?",
    invalid_age: "❗ Por favor, introduzca su edad como número.",
    ask_symptoms: "🎯 ¿Qué le preocupa? Indique los números separados por comas:",
    symptoms_options: [
      "Acné y post-acné",
      "Manchas de pigmentación",
      "Cuperosis",
      "Arrugas y pérdida de firmeza",
      "Brillo graso y poros dilatados",
      "Deshidratación y sequedad"
    ],
    ask_skin: "🧴 ¿Cuál es su tipo de piel?",
    skin_types_options: [
      "Normal",
      "Seca",
      "Grasa",
      "Mixta",
      "Sensible"
    ],
    ask_cleansing: "🧼 ¿Cuándo fue su última limpieza facial?",
    cleansing_options: [
      "Hace menos de 3 meses",
      "Hace más de 3 meses",
      "Nunca"
    ],
    ask_frequency: "📅 ¿Con qué frecuencia acude al esteticista?",
    frequency_options: [
      "Cada mes",
      "Varias veces al año",
      "Raramente"
    ],
    ask_homecare: "🏠 ¿Usa productos de cuidado en casa?",
    homecare_options: [
      "Sí, regularmente",
      "A veces",
      "No"
    ],
    ask_conditions: "⚠️ ¿Tiene alguna contraindicación?",
    conditions_options: [
      "Embarazo/lactancia",
      "Oncología",
      "Alergias",
      "Enfermedades crónicas",
      "Uso de retinol/vitamina A"
    ],
    pigment_warning: "☀️ En verano evitamos tratamientos agresivos contra la pigmentación.\nOfrecemos cuidados suaves y podemos agendarle para otoño 🍂",
    summary_intro: "📋 Por favor, revise sus respuestas:",
    confirm_summary: ["1️⃣ Todo correcto 👍", "2️⃣ Cambiar ✍️"],
    offer_options: ["📅 Reservar cita", "💬 Contactar con especialista"],
    ask_datetime: "🗓️ Escriba una fecha y hora que le venga bien (por ejemplo: *mañana a las 15:00*)",
    booked: (dt) => `✅ Anotado: *${dt}*. Confirmaremos su cita pronto. ¡Gracias por elegirnos! 🌸`,
    handoff: "👩‍⚕️ Un especialista se pondrá en contacto con usted en breve. ¡Gracias por su confianza! 😊",
    invalid_input: "❗ Por favor, seleccione una opción válida.",
    invalid_summary_choice: "❗ Por favor elija:\n1️⃣ Todo correcto 👍\n2️⃣ Cambiar ✍️",
    choose_lang: "🌍 Hola! Seleccione idioma:",
    lang_buttons: ["1 – Русский", "2 – Español", "3 – English"],
    gdpr_buttons: ["1️⃣ Continuar", "2️⃣ Más info"],
    summary_name: "Nombre",
    summary_age: "Edad",
    summary_symptoms: "Preocupaciones",
    summary_skin_type: "Tipo de piel",
    summary_cleansing: "Última limpieza",
    summary_frequency: "Frecuencia",
    summary_homecare: "Cuidado en casa",
    summary_conditions: "Contraindicaciones",
    openai_system: "Eres un cosmetólogo profesional de un salón premium. Usa emojis, no seas extenso, el precio es en euros (€) e incluye diagnóstico.",
    openai_user_template: (data) => `Cliente: 👤 nombre ${data.name}, 🎂 edad ${data.age}, 🔎 preocupaciones: ${data.symptoms.join(", ")}, 🧴 tipo de piel: ${data.skin_type}, 🧼 limpieza: ${data.cleansing}, 💆 frecuencia: ${data.frequency}, 🏠 cuidado en casa: ${data.homecare}, ⚠️ contraindicaciones: ${data.conditions.join(", ")}. ✨ Sugiere un tratamiento breve con descripción, precio (€) y beneficios.`,
    openai_error: "⚠️ No se pudo generar la oferta. Inténtelo más tarde.",
    sensitive_condition_message: "⚠️ Debido a la condición mencionada, no podemos sugerir un tratamiento automáticamente. Un especialista se pondrá en contacto con usted.",
    pigment_warning_summer: "☀️ En verano evitamos tratamientos agresivos para la pigmentación. Un especialista le ofrecerá una alternativa y agenda. ¡Gracias! 🍂"
  },
  en: {
    gdpr_intro: "🌸 Welcome to *The Beauty Salon*!\nBefore we begin, we need a few details to proceed:\n🔐 We comply with GDPR. By continuing, you agree to the processing of your data for contact, diagnosis, and booking.",
    gdpr_more: "📋 We only collect what's necessary to offer personalized care. GDPR compliant (Spain).\nPrivacy policy: https://www.estetica-santa-ponsa.es/privacy",
    ask_name: "😊 Great! How can we address you? (Full name)",
    ask_age: "📆 How old are you?",
    invalid_age: "❗ Please enter your age as a number.",
    ask_symptoms: "🎯 What are your concerns? Enter numbers separated by commas:",
    symptoms_options: [
      "Acne and post-acne",
      "Pigmentation spots",
      "Couperose",
      "Wrinkles and loss of firmness",
      "Oily shine and enlarged pores",
      "Dehydration and dryness"
    ],
    ask_skin: "🧴 What is your skin type?",
    skin_types_options: [
      "Normal",
      "Dry",
      "Oily",
      "Combination",
      "Sensitive"
    ],
    ask_cleansing: "🧼 When was your last facial cleansing?",
    cleansing_options: [
      "Less than 3 months ago",
      "More than 3 months ago",
      "Never"
    ],
    ask_frequency: "📅 How often do you visit a beautician?",
    frequency_options: [
      "Every month",
      "Several times a year",
      "Rarely"
    ],
    ask_homecare: "🏠 Do you use home skincare?",
    homecare_options: [
      "Yes, regularly",
      "Sometimes",
      "No"
    ],
    ask_conditions: "⚠️ Do you have any contraindications?",
    conditions_options: [
      "Pregnancy/breastfeeding",
      "Oncology",
      "Allergies",
      "Chronic diseases",
      "Use of retinol/vitamin A"
    ],
    pigment_warning: "☀️ In summer, we avoid aggressive pigmentation treatments.\nWe suggest gentle care and can schedule you for autumn 🍂",
    summary_intro: "📋 Please check your answers:",
    confirm_summary: ["1️⃣ All correct 👍", "2️⃣ Edit ✍️"],
    offer_options: ["📅 Book appointment", "💬 Contact specialist"],
    ask_datetime: "🗓️ Please enter your preferred date and time (e.g. *tomorrow at 3pm*)",
    booked: (dt) => `✅ Noted: *${dt}*. We'll confirm shortly. Thank you 🌸`,
    handoff: "👩‍⚕️ A specialist will contact you shortly. Thank you for your trust! 😊",
    invalid_input: "❗ Please select a valid option.",
    invalid_summary_choice: "❗ Please choose:\n1️⃣ All correct 👍\n2️⃣ Edit ✍️",
    choose_lang: "🌍 Hello! Please choose your language:",
    lang_buttons: ["1 – Русский", "2 – Español", "3 – English"],
    gdpr_buttons: ["1️⃣ Continue", "2️⃣ More info"],
    summary_name: "Name",
    summary_age: "Age",
    summary_symptoms: "Concerns",
    summary_skin_type: "Skin type",
    summary_cleansing: "Last cleansing",
    summary_frequency: "Frequency",
    summary_homecare: "Home care",
    summary_conditions: "Contraindications",
    openai_system: "You are a professional beautician from a premium salon. Use emojis, keep it short, price in euros (€), diagnosis included.",
    openai_user_template: (data) => `Client: 👤 name ${data.name}, 🎂 age ${data.age}, 🔎 concerns: ${data.symptoms.join(", ")}, 🧴 skin type: ${data.skin_type}, 🧼 cleansing: ${data.cleansing}, 💆 frequency: ${data.frequency}, 🏠 home care: ${data.homecare}, ⚠️ contraindications: ${data.conditions.join(", ")}. ✨ Suggest one short treatment with description, price (€), and benefits.`,
    openai_error: "⚠️ Failed to generate offer. Please try again later.",
    sensitive_condition_message: "⚠️ Due to your condition, we can't offer a treatment automatically. A specialist will contact you soon.",
    pigment_warning_summer: "☀️ We avoid aggressive pigmentation treatments during summer. A specialist will suggest alternatives. Thank you! 🍂"
  }
};