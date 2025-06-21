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

  // Ask Gemini to generate a graph and FAQ based on context
  let graph = { nodes: [], links: [] };
  let faqs = [];
  try {
    const geminiPrompt = `You are a smart product assistant. Given the following product context, generate a JSON object with:
- A force-directed graph with 20-30 nodes and meaningful links (nodes should represent product features, usage, benefits, specifications, etc. based on the context)
- Each node should have:
  - id ( What the node represents ) Example: "Wi-Fi, Battery, Medical Elements, etc.
  - group (e.g., product, feature, benefit, specification, etc.)
  - category (e.g., hardware, software, usability, etc.)
  - description (1-2 sentences about the node)
  - insights (array of 2-4 key insights about the node)
  - color (hex or color name, for visual distinction based on the category try to keep at least 2-3 nodes of 1 category)
Each link should have:
  - source (node id)
  - target (node id)
  - relationship (e.g., 'enables', 'is part of', 'improves', etc.)
- An FAQ list (10-20 relevant questions and answers about the product)

Respond strictly in this JSON format:
{
  "graph": {
    "nodes": [ { "id": "...", "group": "...", "category": "...", "description": "...", "insights": ["..."], "color": "..." }, ... ],
    "links": [ { "source": "...", "target": "...", "relationship": "..." }, ... ]
  },
  "faqs": [ { "question": "...", "response": "..." }, ... ]
}

Product Context:
${context}
Prompt: ${prompt}
Tone: ${tone}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: geminiPrompt }],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    });

    console.log(response.text);
    
    const parsed = JSON.parse(response.text || "{}");
    if (parsed.graph && parsed.graph.nodes && parsed.graph.links) {
      graph = parsed.graph;
    }
    if (Array.isArray(parsed.faqs)) {
      faqs = parsed.faqs;
    }
  } catch (e) {
    console.error("Error generating graph:", e);
    throw e;
  }

  const bot = new Bot({
    id,
    context,
    prompt,
    tone,
    history: [],
    graph,
    faqs,
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
    };
  }
  bot.history.push({ role: "user", content: message });
  bot.history.push({ role: "assistant", content: JSON.stringify(reply) });
  await bot.save();
  return reply;
}

module.exports = { createBot, getBot, chatWithGemini };
