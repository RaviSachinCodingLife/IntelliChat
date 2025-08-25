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
  console.log("WebSocket connected ✅");

  ws.on("message", async (message) => {
    let userMessage;

    try {
      const msgObj = JSON.parse(message);
      userMessage = msgObj.input;
    } catch {
      userMessage = message.toString();
    }

    console.log("User:", userMessage);

    const reply = await handleMessage(userMessage);
    const sentiment = SentimentService.analyze(userMessage);

    const savedMessage = await Message.create({
      user: "customer",
      text: userMessage,
      sentiment,
    });

    ws.send(JSON.stringify({ reply, sentiment }));
  });

  ws.on("close", () => {
    console.log("WebSocket disconnected ❌");
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`))
  )
  .catch((err) => console.log(err));
