import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get correct directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use persistent storage directory on Render
const dbPath = process.env.RENDER ? "/var/data/notes.db" : path.join(__dirname, "database", "notes.db");

// Ensure the database directory exists (for local development)
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
