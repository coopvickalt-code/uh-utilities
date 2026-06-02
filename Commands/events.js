const config = require("../config.json");

async function handleEvents(i) {
  if (i.commandName !== "event") return false;

  const t = config.eventTemplates[i.options.getString("type")];
  if (!t) return i.reply("Invalid");

  return i.reply({
    content:"@everyone",
    embeds:[{
      title:t.title,
      description:t.desc
        .replace("{host}", i.options.getString("host"))
        .replace("{cohost}", i.options.getString("cohost") || "None"),
      color:t.color
    }]
  });
}

module.exports = { handleEvents };