const { v4: uuidv4 } = require("uuid");
const Papa = require("papaparse");
const Bot = require("./bot.model");
const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function parseCSV(csvString) {
  const parsed = Papa.parse(csvString, { header: true });
  return parsed.data;
}

function buildContextFromCSV(csvData) {
  let context = "";
  for (const row of csvData) {
    if (!row.Field || !row.Value) continue;
    context += `- ${row.Field}: ${row.Value}\n`;
  }
  return context;
}

async function createBot({ csv, prompt, tone }) {
  const csvData = parseCSV(csv);
  const context = buildContextFromCSV(csvData);
  const id = uuidv4();
  const bot = new Bot({
    id,
    context,
    prompt,
    tone,
    history: [],
    createdAt: new Date(),
  });
  await bot.save();
  return id;
}

async function getBot(id) {
  return await Bot.findOne({ id });
}

async function chatWithGemini({ botId, message }) {
  const bot = await getBot(botId);
  if (!bot) throw new Error("Bot not found");

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are a smart product assistant helping users understand product information.
Product Info: ${bot.context}
Instructions: ${bot.prompt}
Tone: ${bot.tone}

Respond strictly in valid JSON with the following structure:

{
  "response": "A friendly response that summarizes or answers the user's message.",
  "graph": {
    "nodes": [
      { "id": "Model X", "group": "product" },
      { "id": "Wi-Fi", "group": "feature" }
    ],
    "links": [
      { "source": "Model X", "target": "Wi-Fi" }
    ]
  },
  "faqs": [
    { "question": "Why doesn't it return to the dock?", "response": "Ensure the dock is plugged in and placed correctly." }
  ]
}

Only respond with pure JSON. No markdown, headers, or explanations.`,
        },
      ],
    },
    ...bot.history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
    config: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
    },
  });

  let reply;
  try {
    const jsonResponse = JSON.parse(response.text || "{}");
    reply = jsonResponse;
  } catch (error) {
    reply = {
      response: "Sorry, I couldn't generate a proper response.",
      graph: { nodes: [], links: [] },
      faqs: [],
    };
  }
  bot.history.push({ role: "user", content: message });
  bot.history.push({ role: "assistant", content: JSON.stringify(reply) });
  await bot.save();
  return reply;
}

module.exports = { createBot, getBot, chatWithGemini };
