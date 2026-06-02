const config = require("../config.json");
const { getUserLevel } = require("../permissions");
const { audit } = require("../logger");

const tracker = new Map();

function track(id) {
  const now = Date.now();

  if (!tracker.has(id)) tracker.set(id, []);

  const arr = tracker.get(id);

  arr.push(now);

  const filtered = arr.filter(t =>
    now - t < config.antiNuke.timeWindowMs
  );

  tracker.set(id, filtered);

  return filtered.length;
}

async function check(i) {
  const cmd = i.commandName;

  if (!["kick","ban","purge"].includes(cmd)) return false;

  const level = await getUserLevel(i.member);

  const count = track(i.user.id);

  if (level < config.antiNuke.whitelistLevel &&
      count >= config.antiNuke.threshold) {

    const m = await i.guild.members.fetch(i.user.id).catch(()=>null);
    if (m) await m.kick("Anti-Nuke");

    audit("ANTI-NUKE", i.user.tag, cmd);

    return true;
  }

  return false;
}

module.exports = { check };