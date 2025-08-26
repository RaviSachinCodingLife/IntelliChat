const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    senderRole: { type: String, enum: ["customer", "agent", "ai"] },
    text: String,
    sentiment: { type: String, default: "neutral" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
