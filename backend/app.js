const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const conversationRoutes = require("./routes/conversations");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("IntelliChat Backend OK"));
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);

module.exports = app;
