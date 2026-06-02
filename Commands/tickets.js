const db = require("../database");
const { closeTicket } = require("../systems/tickets");

async function handleTickets(i) {
  const cmd = i.commandName;

  if (!cmd.startsWith("ticket")) return false;

  if (cmd === "ticket_create") {
    const ch = await i.guild.channels.create({
      name:`ticket-${i.user.username}`,
      type:0
    });

    db.run("INSERT INTO tickets VALUES (NULL,?,?,1)", [
      i.user.id,
      ch.id
    ]);

    return i.reply({ content:`Created ${ch}`, ephemeral:true });
  }

  if (cmd === "ticket_close") {
    const t = await closeTicket(i.channel, i.user);

    await i.user.send("Transcript:\n```"+t+"```").catch(()=>{});
    await i.channel.delete();

    return true;
  }

  return false;
}

module.exports = { handleTickets };