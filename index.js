require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const commands = require("./commands");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

/* =========================
   EXPRESS KEEP ALIVE
========================= */
const app = express();

app.get("/", (req, res) => {
  res.send("UH Utilities is online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("[WEB] Keep-alive running");
});

/* =========================
   READY
========================= */
client.once("ready", () => {
  console.log(`${config.botName} is online`);
});

/* =========================
   INTERACTIONS
========================= */
client.on("interactionCreate", async (i) => {
  try {
    if (!i.isChatInputCommand()) return;

    console.log(`[CMD] ${i.commandName}`);

    const cmd = commands.find(c => c.data.name === i.commandName);

    if (!cmd) {
      return i.reply({
        content: "❌ Command not found",
        ephemeral: true
      });
    }

    await cmd.execute(i, client);

  } catch (err) {
    console.error(err);

    if (i.replied || i.deferred) return;

    return i.reply({
      content: "❌ Error running command",
      ephemeral: true
    });
  }
});

/* =========================
   LOGIN
========================= */
client.login(process.env.TOKEN);