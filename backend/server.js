require("dotenv").config();
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const url = require("url");
const app = require("./app");
const { handleMessage } = require("./services/chatService");
const { analyze } = require("./services/sentimentService");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/** Store clients by conversation and role for routing to agents if needed */
const clients = new Map(); // conversationId -> Set(ws)

wss.on("connection", async (ws, req) => {
  const { query } = url.parse(req.url, true);
  const token = query?.token;
  const conversationId = query?.conversationId;

  // Auth (JWT in WS query)
  let userId = null;
  let role = "customer";
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    userId = payload.id;
    role = payload.role || "customer"; // could be 'agent'
  } catch {
    ws.close(4001, "Unauthorized");
    return;
  }

  if (!conversationId) {
    ws.close(4002, "conversationId required");
    return;
  }

  // Track connection
  if (!clients.has(conversationId)) clients.set(conversationId, new Set());
  clients.get(conversationId).add(ws);

  ws.on("message", async (raw) => {
    try {
      const { type, text } = JSON.parse(raw.toString());

      if (type === "user_message") {
        const sentiment = analyze(text);

        // Persist user message
        await Message.create({
          conversation: conversationId,
          senderId: userId,
          senderRole: role,
          text,
          sentiment,
        });

        // Load convo to see if escalated
        const convo = await Conversation.findById(conversationId);
        let needsHuman = convo?.needsHuman || false;

        // Heuristics for escalation: keyword or strong negative sentiment
        if (
          /agent|human|escalate|representative/i.test(text) ||
          sentiment === "negative"
        ) {
          needsHuman = true;
        }

        let aiReply = null;
        if (!needsHuman && role === "customer") {
          aiReply = await handleMessage(text, conversationId);
          await Message.create({
            conversation: conversationId,
            senderId: null,
            senderRole: "ai",
            text: aiReply,
            sentiment: "neutral",
          });
        }

        // Save flags on conversation
        await Conversation.findByIdAndUpdate(
          conversationId,
          { needsHuman },
          { new: true }
        );

        // Broadcast to all participants in this conversation
        const payload = JSON.stringify({
          type: "message",
          conversationId,
          from: role,
          text,
          aiReply,
          sentiment,
          needsHuman,
        });
        for (const client of clients.get(conversationId) || []) {
          if (client.readyState === WebSocket.OPEN) client.send(payload);
        }
      }
    } catch (e) {
      console.error("WS error:", e);
      ws.send(JSON.stringify({ type: "error", message: "Invalid payload" }));
    }
  });

  ws.on("close", () => {
    const set = clients.get(conversationId);
    if (set) set.delete(ws);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => server.listen(PORT, () => console.log(`Server on ${PORT}`)))
  .catch((err) => console.error(err));
