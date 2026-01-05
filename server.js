const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 STATIC FILES (CSS, IMG, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 🏠 HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔐 LOGIN
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 👨‍💼 ADMIN
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 📊 RESULT PAGE
app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "result.html"));
});

// 🏆 WIN PAGE
app.get("/won", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "won.html"));
});

// ➕ ADD WINNER
app.post("/add-winner", (req, res) => {
  const { number } = req.body;
  if (!number) return res.json({ success: false });

  fs.writeFileSync("result.json", JSON.stringify({ winner: number }));
  res.json({ success: true });
});

// ✅ CHECK RESULT
app.post("/check", (req, res) => {
  const { number } = req.body;
  const data = JSON.parse(fs.readFileSync("result.json", "utf8"));

  res.json({ win: data.winner === number });
});

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
