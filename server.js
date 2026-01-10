const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ---------- middleware ----------
app.use(express.json());
app.use(express.static("public"));

// ---------- admin credentials ----------
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

// ---------- login state ----------
let isLoggedIn = false;

// ---------- login route ----------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    isLoggedIn = true;
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
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ name: "", number: "", winners: [] })
    );
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------- ADMIN : ADD WINNER (NAME + NUMBER) ----------
app.post("/api/add-winner", (req, res) => {
  if (!isLoggedIn) {
    return res.status(401).json({ success: false });
  }

  const { name, number } = req.body;
  if (!name || !number) {
    return res.json({ success: false });
  }

  const data = readData();

  data.name = name;
  data.number = number;

  if (!data.winners.includes(number)) {
    data.winners.push(number);
  }

  writeData(data);
  res.json({ success: true });
});

// ---------- USER : CHECK RESULT ----------
app.post("/api/check", (req, res) => {
  const { number } = req.body;
  const data = readData();

  const win = data.winners.includes(number);
  res.json({ winner: win });
});

// ---------- AUTO-FILL API (FOR won.html) ----------
app.get("/api/winner", (req, res) => {
  const data = readData();
  res.json({
    name: data.name,
    number: data.number
  });
});

// ---------- pages ----------
app.get("/admin", (req, res) => {
  if (!isLoggedIn) {
    return res.redirect("/login.html");
  }
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
