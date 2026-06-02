const { SlashCommandBuilder } = require("discord.js");

const commands = [

  // ⚔️ KICK
  {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Kick a user")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to kick")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      return i.reply(`👢 Kicked ${user.tag}`);
    }
  },

  // 🔨 BAN
  {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Ban a user")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to ban")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      return i.reply(`🔨 Banned ${user.tag}`);
    }
  },

  // 🧹 PURGE
  {
    data: new SlashCommandBuilder()
      .setName("purge")
      .setDescription("Delete messages")
      .addIntegerOption(o =>
        o.setName("amount")
          .setDescription("Number of messages")
          .setRequired(true)
      ),

    async execute(i) {
      const amount = i.options.getInteger("amount");
      return i.reply(`🧹 Deleted ${amount} messages (placeholder)`);
    }
  },

  // 🔇 MUTE
  {
    data: new SlashCommandBuilder()
      .setName("mute")
      .setDescription("Timeout a user")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to mute")
          .setRequired(true)
      )
      .addStringOption(o =>
        o.setName("duration")
          .setDescription("Duration (10m, 1h)")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      const duration = i.options.getString("duration");
      return i.reply(`🔇 Muted ${user.tag} for ${duration}`);
    }
  },

  // 🔊 UNMUTE
  {
    data: new SlashCommandBuilder()
      .setName("unmute")
      .setDescription("Remove timeout")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to unmute")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      return i.reply(`🔊 Unmuted ${user.tag}`);
    }
  },

  // 🎭 ROLE
  {
    data: new SlashCommandBuilder()
      .setName("role")
      .setDescription("Add or remove role")
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
          .setDescription("Role")
          .setRequired(true)
      ),

    async execute(i) {
      const action = i.options.getString("action");
      const user = i.options.getUser("user");
      const role = i.options.getRole("role");

      return i.reply(`🎭 ${action} role ${role.name} for ${user.tag}`);
    }
  },

  // 🎫 TICKETS
  {
    data: new SlashCommandBuilder()
      .setName("ticket_create")
      .setDescription("Create ticket"),

    async execute(i) {
      return i.reply("🎫 Ticket created (placeholder)");
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("ticket_close")
      .setDescription("Close ticket"),

    async execute(i) {
      return i.reply("❌ Ticket closed (placeholder)");
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("ticket_add")
      .setDescription("Add user to ticket")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to add")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      return i.reply(`➕ Added ${user.tag} to ticket`);
    }
  },

  // 📣 SSU
  {
    data: new SlashCommandBuilder()
      .setName("ssu")
      .setDescription("Server Start Up event")
      .addStringOption(o =>
        o.setName("host")
          .setDescription("Host name")
          .setRequired(true)
      )
      .addStringOption(o =>
        o.setName("cohost")
          .setDescription("Co-host name")
      ),

    async execute(i) {
      const host = i.options.getString("host");
      const cohost = i.options.getString("cohost") || "None";

      return i.reply(`🚨 **SSU EVENT**\n👑 Host: ${host}\n🤝 Co-Host: ${cohost}\n@everyone`);
    }
  },

  // 🔐 PERMISSIONS
  {
    data: new SlashCommandBuilder()
      .setName("permissionselevate")
      .setDescription("Give senior permissions")
      .addUserOption(o =>
        o.setName("user")
          .setDescription("User to elevate")
          .setRequired(true)
      ),

    async execute(i) {
      const user = i.options.getUser("user");
      return i.reply(`🔐 Elevated permissions for ${user.tag}`);
    }
  }

];

module.exports = commands;