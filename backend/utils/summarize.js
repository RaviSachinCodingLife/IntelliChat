const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

module.exports = async function summarize(messages) {
  const plain = messages
    .map((m) => `${m.senderRole.toUpperCase()}: ${m.text}`)
    .join("\n");
  const prompt = `Summarize the following support conversation into a short, customer-friendly conclusion (3-5 bullet points) with next steps if any:

${plain}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.error("Summary error:", e?.message || e);
    return "Summary unavailable.";
  }
};
