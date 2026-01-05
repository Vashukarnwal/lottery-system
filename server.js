const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static("public"));

// file path safe for render
const resultFile = path.join(__dirname, "result.json");

// ADMIN API
app.post("/add-winner", (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ success: false, message: "Number required" });
    }

    fs.writeFileSync(resultFile, JSON.stringify({ winner: number }));
    res.json({ success: true });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// RESULT API
app.get("/get-result", (req, res) => {
  if (!fs.existsSync(resultFile)) {
    return res.json({ winner: null });
  }
  const data = fs.readFileSync(resultFile);
  res.json(JSON.parse(data));
});

// START SERVER
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
