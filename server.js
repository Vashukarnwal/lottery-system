const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

const app = express();

/* ================= IMPORTANT FOR RENDER ================= */
app.set("trust proxy", 1);

// ---------- middleware ----------
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    name: "lottery.sid",
    secret: "lottery-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none"
    }
  })
);

// ---------- admin credentials ----------
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

// ---------- login route ----------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------- logout ----------
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
});

// ---------- auth middleware ----------
function isAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  return res.status(401).json({ success: false });
}

// ---------- data file ----------
const DATA_FILE = path.join(__dirname, "result.json");

// ---------- helpers ----------
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({
        rank: "",
        name: "",
        number: "",
        ticket: "",
        series: "",
        amount: "",
        date: "",
        winners: []
      })
    );
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------- ADMIN : ADD WINNER (FULL DATA) ----------
// ---------- ADMIN : ADD WINNER (FINAL) ----------
app.post("/api/add-winner", isAdmin, (req, res) => {
  const { rank, name, number, ticket, series, amount, date } = req.body;

  if (!name || !number) {
    return res.json({ success: false });
  }

  const data = readData();

  data.rank   = rank || "";
  data.name   = name;
  data.number = number;
  data.ticket = ticket || "";
  data.series = series || "";
  data.amount = amount || "";
  data.date   = date || "";

  if (!data.winners.includes(number)) {
    data.winners.push(number);
  }

  writeData(data);
  res.json({ success: true });
});

  // old winner logic (optional)
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
  res.json({ winner: data.winners.includes(number) });
});

// ---------- AUTO-FILL API (FOR WON PAGE) ----------
app.get("/api/winner", (req, res) => {
  const data = readData();

  res.json({
    rank: data.rank,
    name: data.name,
    number: data.number,
    ticket: data.ticket,
    series: data.series,
    amount: data.amount,
    date: data.date
  });
});

// ---------- pages ----------
app.get("/admin", (req, res) => {
  if (!req.session.isAdmin) {
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
