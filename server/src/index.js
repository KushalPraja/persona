const express = require("express");
const { connectDB } = require("./db");
const { createBot, chatWithGemini, getBot } = require("./services/gemini");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(
  cors({

    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json({ limit: "2mb" }));
app.use(express.text({ type: "text/csv", limit: "2mb" }));

app.post("/api/bot", async (req, res) => {
  const { csv, prompt, tone } = req.body;
  if (!csv || !prompt || !tone) {
    return res
      .status(400)
      .json({ error: "csv, prompt, and tone are required" });
  }
  try {
    const id = await createBot({ csv, prompt, tone });
    res.json({ id, url: `/bot/${id}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/bot/:id/chat", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }
  try {
    const reply = await chatWithGemini({ botId: id, message });
    const updatedBot = await getBot(id);
    res.json({ reply, history: updatedBot.history });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/bot/:id", async (req, res) => {
  const { id } = req.params;
  const bot = await getBot(id);
  if (!bot) return res.status(404).json({ error: "Bot not found" });
  res.json({
    id: bot.id,
    prompt: bot.prompt,
    tone: bot.tone,
    history: bot.history,
  });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
