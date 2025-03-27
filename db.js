import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open SQLite database
const dbPromise = open({
  filename: "./database/notes.db",
  driver: sqlite3.Database,
});

// Create table if not exists
async function initializeDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initializeDB();

export default dbPromise;
