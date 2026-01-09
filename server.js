const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); // ✅ app pehle define

// ---------- middleware ----------
app.use(express.json());
app.use(express.static("public"));

// ---------- admin credentials ----------
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

// ---------- login route ----------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------- data file ----------
const DATA_FILE = "result.json";

// ---------- helpers ----------
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ winners: [] }));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------- ROUTES ----------

// admin add winner
app.post("/api/add-winner", (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ success: false });
  }

  const data = readData();

  if (!data.winners.includes(number)) {
    data.winners.push(number);
    writeData(data);
  }

  res.json({ success: true });
});

// check result
app.post("/api/check", (req, res) => {
  const { number } = req.body;

  const data = readData();
  const win = data.winners.includes(number);

  res.json({ winner: win });
});

// pages
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
