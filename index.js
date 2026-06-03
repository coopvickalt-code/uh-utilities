require("dotenv").config();
const express = require("express");
const logger = require("./logger");
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
   INTERACTIONS (FIXED - SINGLE HANDLER)
========================= */
const logger = require("./logger");

client.on("interactionCreate", async (i) => {
  if (!i.isChatInputCommand()) return;

  const cmd = commands.find(c => c.data.name === i.commandName);

  if (!cmd) {
    return i.reply({
      content: "❌ Command not found",
      ephemeral: true
    });
  }

  const start = Date.now();

  try {
    await cmd.execute(i, client);

    await logger.command({
      user: i.user,
      command: i.commandName,
      channel: i.channel,
      guild: i.guild,
      status: "SUCCESS",
      ms: Date.now() - start
    });

  } catch (err) {
    console.error(err);

    await logger.command({
      user: i.user,
      command: i.commandName,
      channel: i.channel,
      guild: i.guild,
      status: "ERROR",
      error: err?.message || "Unknown error",
      ms: Date.now() - start
    });

    if (!i.replied) {
      return i.reply({
        content: "❌ Error running command",
        ephemeral: true
      });
    }
  }
});

/* =========================
   LOGIN
========================= */
client.login(process.env.TOKEN);