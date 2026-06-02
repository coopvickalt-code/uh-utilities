const { getUserLevel, canUse, canTarget } = require("../permissions");
const { audit } = require("../logger");
const config = require("../config.json");

async function handleModeration(i) {
  const cmd = i.commandName;
  const level = await getUserLevel(i.member);
  const req = config.commandLevels[cmd] || 0;

  if (!["kick","ban","mute","unmute","purge","role"].includes(cmd))
    return false;

  if (!canUse(level, req, i.user.id))
    return i.reply({ content: "No perm", ephemeral:true });

  if (cmd === "kick") {
    const u = i.options.getUser("user");
    const m = await i.guild.members.fetch(u.id);

    const t = await getUserLevel(m);
    if (!canTarget(level, t, u.id))
      return i.reply({ content:"Protected", ephemeral:true });

    await m.kick();
    audit("KICK", i.user.tag, u.tag);
    return true;
  }

  if (cmd === "ban") {
    const u = i.options.getUser("user");
    const m = await i.guild.members.fetch(u.id);

    const t = await getUserLevel(m);
    if (!canTarget(level, t, u.id))
      return i.reply({ content:"Protected", ephemeral:true });

    await m.ban();
    audit("BAN", i.user.tag, u.tag);
    return true;
  }

  if (cmd === "purge") {
    const amt = i.options.getInteger("amount");
    await i.channel.bulkDelete(amt);
    audit("PURGE", i.user.tag, amt);
    return true;
  }

  return false;
}

module.exports = { handleModeration };