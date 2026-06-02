const { getUserLevel } = require("../permissions");
const { audit } = require("../logger");

async function handleAdmin(i) {
  if (i.commandName !== "permissionselevate") return false;

  const level = await getUserLevel(i.member);
  if (level < 6)
    return i.reply({ content:"No perm", ephemeral:true });

  const u = i.options.getUser("user");
  const m = await i.guild.members.fetch(u.id);

  const role = i.guild.roles.cache.find(r =>
    r.name.includes("Senior")
  );

  if (!role) return i.reply("No role");

  await m.roles.add(role);

  audit("ELEVATE", i.user.tag, u.tag);

  return i.reply("Done");
}

module.exports = { handleAdmin };