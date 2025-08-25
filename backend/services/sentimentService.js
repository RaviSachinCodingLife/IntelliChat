function detectSentiment(text) {
  text = text.toLowerCase();
  if (text.includes("happy") || text.includes("good") || text.includes("great"))
    return "positive";
  if (text.includes("sad") || text.includes("bad") || text.includes("angry"))
    return "negative";
  return "neutral";
}

module.exports = { detectSentiment };
