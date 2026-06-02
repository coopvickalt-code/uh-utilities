const config = require("../config.json");

/**
 * Get highest role level for a member
 * (auto-picks best role if multiple match)
 */
function getUserLevel(member) {
  if (!member?.roles?.cache) return 0;

  let level = 0;

  for (const role of member.roles.cache.values()) {
    const roleLevel = config.roleLevels[role.id];

    if (typeof roleLevel === "number" && roleLevel > level) {
      level = roleLevel;
    }
  }

  return level;
}

/**
 * Check permission for command
 */
function hasPermission(member, commandName) {
  if (!member) return false;

  // Developer override
  if (config.developers.includes(member.id)) return true;

  const userLevel = getUserLevel(member);
  const requiredLevel = config.commandLevels[commandName] ?? 0;

  return userLevel >= requiredLevel;
}

module.exports = {
  getUserLevel,
  hasPermission
};