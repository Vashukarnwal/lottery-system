const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// 👉 public folder serve करो
app.use(express.static(path.join(__dirname, "public")));

// ---------- LOGIN ----------
const ADMIN_ID = "admin";
const ADMIN_PASS = "12345";

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_ID && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------- ADMIN ----------
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ---------- ADD WINNER ----------
app.post("/add-winner", (req, res) => {
  const { number } = req.body;
  if (!number) return res.json({ success: false });

  const file = "result.json";
  let data = { winners: [] };

  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  if (!data.winners.includes(number)) {
    data.winners.push(number);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }

  res.json({ success: true });
});

// ---------- CHECK RESULT ----------
app.post("/check", (req, res) => {
  const { number } = req.body;
  if (!number) return res.json({ win: false });

  const data = JSON.parse(fs.readFileSync("result.json"));
  res.json({ win: data.winners.includes(number) });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
