function analyze(text) {
  const t = text.toLowerCase();
  if (
    /(angry|terrible|worst|refund|complaint|issue|not working|broken|bad)/.test(
      t
    )
  )
    return "negative";
  if (/(thanks|thank you|great|awesome|good|perfect|working)/.test(t))
    return "positive";
  return "neutral";
}
module.exports = { analyze };
