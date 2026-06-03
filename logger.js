const fetch = require("node-fetch");

async function command(data) {
  const webhook = process.env.LOG_WEBHOOK;
  if (!webhook) return console.log("No webhook set");

  const embed = {
    username: "UH Utilities Logs",
    embeds: [
      {
        title: `Command: ${data.command}`,
        color: data.status === "SUCCESS" ? 0x2ecc71 : 0xe74c3c,
        fields: [
          {
            name: "User",
            value: `${data.user.tag} (${data.user.id})`
          },
          {
            name: "Status",
            value: data.status
          },
          {
            name: "Channel",
            value: data.channel?.name || "Unknown"
          },
          {
            name: "Guild",
            value: data.guild?.name || "DM"
          },
          {
            name: "Execution Time",
            value: `${data.ms}ms`
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  if (data.error) {
    embed.embeds[0].fields.push({
      name: "Error",
      value: data.error.slice(0, 1000)
    });
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });
  } catch (err) {
    console.error("Webhook failed:", err);
  }
}

module.exports = { command };