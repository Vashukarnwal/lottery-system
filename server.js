const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = path.join(__dirname, "result.json");

/* ---------- helper functions ---------- */
function readWinner() {
  if (!fs.existsSync(DATA_FILE)) {
    return { winner: null };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveWinner(number) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ winner: number }, null, 2));
}

/* ---------- API ROUTES ---------- */

// ✅ ADD WINNER (ADMIN)
app.post("/api/add-winner", (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ success: false, message: "No number" });
  }

  saveWinner(number);
  console.log("Winner saved:", number);

  res.json({ success: true });
});

// ✅ CHECK RESULT (USER)
app.get("/api/check/:number", (req, res) => {
  const userNumber = req.params.number;
  const data = readWinner();

  res.json({
    winner: data.winner === userNumber
  });
});

// ✅ ADMIN PAGE ROUTE
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
