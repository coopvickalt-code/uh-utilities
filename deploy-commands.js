const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const commands = [

  // ⚔️ MODERATION
  new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to kick")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to ban")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete a number of messages")
    .addIntegerOption(o =>
      o.setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Timeout a user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to mute")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("duration")
        .setDescription("Duration (e.g. 10m, 1h)")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Remove timeout from a user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to unmute")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("role")
    .setDescription("Add or remove a role")
    .addStringOption(o =>
      o.setName("action")
        .setDescription("add or remove")
        .setRequired(true)
        .addChoices(
          { name: "add", value: "add" },
          { name: "remove", value: "remove" }
        )
    )
    .addUserOption(o =>
      o.setName("user")
        .setDescription("Target user")
        .setRequired(true)
    )
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role to modify")
        .setRequired(true)
    ),

  // 🎫 TICKETS
  new SlashCommandBuilder()
    .setName("ticket_create")
    .setDescription("Create a support ticket"),

  new SlashCommandBuilder()
    .setName("ticket_close")
    .setDescription("Close the current ticket"),

  new SlashCommandBuilder()
    .setName("ticket_add")
    .setDescription("Add a user to the ticket")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to add")
        .setRequired(true)
    ),

  // 📣 EVENTS
  new SlashCommandBuilder()
    .setName("event")
    .setDescription("Create an event announcement")
    .addStringOption(o =>
      o.setName("type")
        .setDescription("Event type")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("host")
        .setDescription("Host name")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("cohost")
        .setDescription("Co-host name")
    ),

  // 🔐 ADMIN
  new SlashCommandBuilder()
    .setName("permissionselevate")
    .setDescription("Give Senior Permissions to a user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to elevate")
        .setRequired(true)
    )

];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Deploying commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands.map(c => c.toJSON()) }
    );

    console.log("✅ Commands deployed successfully");
  } catch (err) {
    console.error("❌ Deploy failed:", err);
  }
})();