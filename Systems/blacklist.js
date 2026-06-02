const db = require("../database");

function isBlacklisted(userId, type) {
  return new Promise((resolve) => {
    db.get(
      "SELECT * FROM blacklist WHERE id=? AND type=?",
      [userId, type],
      (err, row) => {
        resolve(!!row);
      }
    );
  });
}

function addBlacklist(id, type, reason) {
  db.run(
    "INSERT INTO blacklist (id,type,reason) VALUES (?,?,?)",
    [id, type, reason]
  );
}

function removeBlacklist(id, type) {
  db.run(
    "DELETE FROM blacklist WHERE id=? AND type=?",
    [id, type]
  );
}

module.exports = { isBlacklisted, addBlacklist, removeBlacklist };