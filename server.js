import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // Import db directly, no async needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Route to fetch all notes
app.get("/api/notes", (req, res) => {
  try {
    const notes = db.prepare("SELECT * FROM notes").all(); // FIXED SYNTAX
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route to add a new note
app.post("/api/notes", (req, res) => {
  try {
    const { title, content } = req.body;
    const stmt = db.prepare("INSERT INTO notes (title, content) VALUES (?, ?)");
    stmt.run(title, content); // FIXED SYNTAX
    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route to update a note
app.put("/api/notes/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const stmt = db.prepare("UPDATE notes SET title = ?, content = ? WHERE id = ?");
    const result = stmt.run(title, content, id); // FIXED SYNTAX

    if (result.changes === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route to delete a note
app.delete("/api/notes/:id", (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
    const result = stmt.run(id); // FIXED SYNTAX

    if (result.changes === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
