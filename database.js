const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./uh.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, level INTEGER DEFAULT 0)`);

  db.run(`CREATE TABLE IF NOT EXISTS blacklist (id TEXT, type TEXT, reason TEXT)`);

  db.run(`CREATE TABLE IF NOT EXISTS audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT,
    executor TEXT,
    target TEXT,
    time INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    channelId TEXT,
    open INTEGER DEFAULT 1
  )`);
});

module.exports = db;