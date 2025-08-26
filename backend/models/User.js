const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: { type: String, default: "customer" }, // 'customer' | 'agent' | 'admin'
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
