const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // To enable cross-origin requests from React Native
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Allow requests from the frontend

// Initialize SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Create the users table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )`);

    // Create the colors table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS colors (
            colorId INTEGER PRIMARY KEY AUTOINCREMENT,
            colorCode TEXT,
            colorName TEXT
        )`);
  }
});

// Basic CRUD routes for users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
