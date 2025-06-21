const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const BotSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  context: { type: mongoose.Schema.Types.Mixed, required: true },
  prompt: { type: String, required: true },
  tone: { type: String, required: true },
  history: { type: [MessageSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bot", BotSchema);
