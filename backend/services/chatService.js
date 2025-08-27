const { GoogleGenerativeAI } = require("@google/generative-ai");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

async function buildContext(conversationId, limit = 10) {
  const msgs = await Message.find({ conversation: conversationId })
    .sort({ createdAt: -1 })
    .limit(limit);
  return msgs
    .reverse()
    .map((m) => `${m.senderRole.toUpperCase()}: ${m.text}`)
    .join("\n");
}

async function handleMessage(text, conversationId) {
  try {
    const context = await buildContext(conversationId, 12);
    const prompt = `You are an AI support assistant. Be concise, empathetic, and helpful. If the issue seems complex or account-specific, suggest escalation to a human agent.

Conversation history:
${context}

User: ${text}
AI:`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    return reply || "I’m here to help—could you clarify that?";
  } catch (err) {
    console.error("Gemini API Error:", err.message || err);
    return "Sorry, I’m having trouble right now.";
  }
}

module.exports = { handleMessage };
