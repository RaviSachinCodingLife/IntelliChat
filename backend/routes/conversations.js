const router = require("express").Router();
const auth = require("../middleware/auth");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const summarize = require("../utils/summarize");
const { sendSummaryEmail } = require("../services/mailer");

// Create new conversation (customer)
router.post("/", auth, async (req, res) => {
  const convo = await Conversation.create({ customerId: req.user.id });
  res.json({ conversation: convo });
});

// Get conversation + messages
router.get("/:id", auth, async (req, res) => {
  const convo = await Conversation.findById(req.params.id);
  if (!convo) return res.status(404).json({ error: "Not found" });
  const messages = await Message.find({ conversation: convo._id }).sort({
    createdAt: 1,
  });
  res.json({ conversation: convo, messages });
});

// Submit conversation: mark submitted, generate summary, email it
router.post("/:id/submit", auth, async (req, res) => {
  const convo = await Conversation.findById(req.params.id);
  if (!convo) return res.status(404).json({ error: "Not found" });
  const messages = await Message.find({ conversation: convo._id }).sort({
    createdAt: 1,
  });

  const summary = await summarize(messages);
  await Conversation.findByIdAndUpdate(convo._id, { status: "submitted" });

  await sendSummaryEmail({
    to: req.user.email, // we’ll inject email at auth middleware if needed, otherwise fetch user
    subject: "Your IntelliChat Conversation Summary",
    text: summary,
  });

  res.json({ ok: true, summary });
});

// GET all messages for a conversation
router.get("/:id/messages", async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.id }).sort({
      createdAt: 1,
    });
    res.json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
