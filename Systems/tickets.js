const db = require("../database");
const { audit } = require("../logger");

async function closeTicket(channel, user) {
  const msgs = await channel.messages.fetch({ limit: 50 });

  let out = "";

  msgs.reverse().forEach(m => {
    out += `[${m.author.tag}] ${m.content}\n`;
  });

  audit("TICKET CLOSE", user.tag, channel.name);

  db.run("UPDATE tickets SET open=0 WHERE channelId=?", [channel.id]);

  return out;
}

module.exports = { closeTicket };