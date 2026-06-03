require("dotenv").config();
async function command(interaction) {
  const webhook = process.env.LOG_WEBHOOK;
  if (!webhook) return;

  const payload = {
    username: "UH Utilities Logs",
    embeds: [
      {
        title: "Command Used",
        color: 0x3498db,
        fields: [
          {
            name: "User",
            value: `${interaction.user.tag} (${interaction.user.id})`
          },
          {
            name: "Command",
            value: `/${interaction.commandName}`
          },
          {
            name: "Channel",
            value: interaction.channel?.name || "Unknown"
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(console.error);
}

module.exports = { command };