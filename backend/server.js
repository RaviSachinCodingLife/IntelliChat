// backend/server.js
require("dotenv").config();
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const app = require("./app");
const { handleMessage } = require("./services/chatService");
const SentimentService = require("./services/sentimentService");
const Message = require("./models/Message");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  ws.on("message", async (rawMessage) => {
    try {
      // Expect JSON: { input: "Hello AI" }
      const { input } = JSON.parse(rawMessage.toString());

      console.log("User said:", input);

      // Detect sentiment
      const sentiment = SentimentService.detectSentiment(input);

      // Save user message in MongoDB
      await Message.create({ sender: "You", text: input, sentiment });

      // Generate AI reply
      const reply = await handleMessage(input);

      // Save AI message
      await Message.create({ sender: "AI", text: reply, sentiment: "neutral" });

      // Send back to frontend
      ws.send(JSON.stringify({ reply }));
    } catch (err) {
      console.error("Error handling message:", err);
      ws.send(JSON.stringify({ reply: "Error processing your request." }));
    }
  });

  ws.on("close", () => {
    console.log("WebSocket disconnected");
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on ${PORT}`))
  )
  .catch((err) => console.error(err));
