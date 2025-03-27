import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbPromise from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Route to fetch all notes
app.get("/api/notes", async (req, res) => {
  try {
    const db = await dbPromise;
    const notes = await db.all("SELECT * FROM notes");
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route to add a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const db = await dbPromise;
    await db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [
      title,
      content,
    ]);
    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route to update a note
app.put("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const db = await dbPromise;
  
      await db.run("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
        title,
        content,
        id,
      ]);
  
      res.json({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// API Route to delete a note
app.delete("/api/notes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const db = await dbPromise;
      const result = await db.run("DELETE FROM notes WHERE id = ?", [id]);
  
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
