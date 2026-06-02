require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const config = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

/* =========================
   EXPRESS KEEP-ALIVE SERVER
========================= */
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("UH Utilities is online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[WEB] Keep-alive server running on port ${PORT}`);
});

/* =========================
   DISCORD BOT
========================= */
client.once("ready", () => {
  console.log(`${config.botName} is online`);
});

client.on("interactionCreate", async (i) => {
  if (!i.isChatInputCommand()) return;

  // TEMP TEST RESPONSE (replace with your handlers)
  if (i.commandName === "ping") {
    return i.reply("Pong!");
  }
});

client.login(process.env.TOKEN);