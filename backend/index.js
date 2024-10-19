const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const app = express();
const port = 3001;

// Enable CORS to allow requests from your React Native app
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  },
});

// Set up multer for file uploads with file type filtering
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const filetypes = /jpeg|jpg|png|gif/; // Add other file types if necessary
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // Accept the file
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    ); // Reject the file
  },
});

// Create the uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Set up SQLite3 database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        upload_time DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
  }
});

// Handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const fileName = req.file.filename;
    const filePath = path.join("uploads", fileName);

    // Insert image details into SQLite database
    db.run(
      `INSERT INTO images (file_name, file_path) VALUES (?, ?)`,
      [fileName, filePath],
      function (err) {
        if (err) {
          console.error("Error inserting into database", err.message);
          res.status(500).json({ message: "Database error" });
        } else {
          console.log(
            `File uploaded and saved to database with ID: ${this.lastID}`
          );
          res.status(200).json({
            message: "Image uploaded and saved",
            id: this.lastID,
            file: req.file,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
});

// Get all uploaded images
app.get("/images", (req, res) => {
  db.all("SELECT * FROM images", [], (err, rows) => {
    if (err) {
      console.error("Error fetching images: ", err.message);
      res.status(500).json({ message: "Error fetching images" });
    } else {
      res.status(200).json({ images: rows });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://192.168.0.109:${port}`);
});
