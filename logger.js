const { WebhookClient } = require("discord.js");
require("dotenv").config();
const db = require("./database");

const hook = new WebhookClient({ url: process.env.LOG_WEBHOOK });

function log(msg) {
  hook.send(`📌 UH UTILITIES\n${msg}`);
}

function audit(action, executor, target) {
  db.run(
    "INSERT INTO audit (action,executor,target,time) VALUES (?,?,?,?)",
    [action, executor, target, Date.now()]
  );

  log(`🧾 ${action} | ${executor} → ${target}`);
}

module.exports = { log, audit };