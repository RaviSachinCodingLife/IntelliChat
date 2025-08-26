const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    needsHuman: { type: Boolean, default: false },
    status: { type: String, default: "open" }, // open | submitted | closed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
