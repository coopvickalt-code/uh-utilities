const config = require("./config.json");
const db = require("./database");

function getUserLevel(member) {
  return new Promise((resolve) => {
    db.get("SELECT level FROM users WHERE id=?", [member.id], (err, row) => {
      if (row) return resolve(row.level);

      let lvl = 0;

      member.roles.cache.forEach(r => {
        const l = config.roleLevels[r.id];
        if (l && l > lvl) lvl = l;
      });

      resolve(lvl);
    });
  });
}

function canUse(level, req, id) {
  return config.developers.includes(id) || level >= req;
}

function canTarget(exec, target, id) {
  if (config.developers.includes(id)) return false;
  return exec > target;
}

module.exports = { getUserLevel, canUse, canTarget };