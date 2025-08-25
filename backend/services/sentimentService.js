function analyze(text) {
  const lower = text.toLowerCase();
  if (lower.includes("bad") || lower.includes("angry")) return "negative";
  if (lower.includes("good") || lower.includes("happy")) return "positive";
  return "neutral";
}

module.exports = { analyze };
