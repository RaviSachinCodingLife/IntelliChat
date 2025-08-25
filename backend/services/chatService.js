const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

console.log({ GEMINI_API_KEY, GEMINI_MODEL });

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

async function handleMessage(message) {
  try {
    const result = await model.generateContent(message);
    const text = result.response.text();

    return text || "Sorry, I couldn't understand.";
  } catch (err) {
    console.error("Gemini API Error:", err.message || err);
    return "Error processing your request.";
  }
}

module.exports = { handleMessage };
