const { SlashCommandBuilder } = require("discord.js");
const ms = require("ms");
const logger = require("./logger");

/* =========================
   LOG WRAPPER
========================= */
async function logAction(i, message) {
  return logger.command(i, message);
}
const commands = [

  // 👢 KICK
  {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Kick a user")
      .addUserOption(o => o.setName("user").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const user = i.options.getUser("user");
      const reason = i.options.getString("reason") || "No reason provided";

      const member = await i.guild.members.fetch(user.id);
      await member.kick(`Kicked by UH Moderation Staff! Reason: ${reason}`);

      await logAction(i,
        `👢 **KICK LOG**\nUser: ${user.tag}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply(
        `👢 ${user.tag} was kicked\n\nKicked by UH Moderation Staff! Reason: ${reason}`
      );
    }
  },

  // 🔨 BAN
  {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Ban a user")
      .addUserOption(o => o.setName("user").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const user = i.options.getUser("user");
      const reason = i.options.getString("reason") || "No reason provided";

      const member = await i.guild.members.fetch(user.id);
      await member.ban({ reason: `Banned by UH Staff! Reason: ${reason}` });

      await logAction(i,
        `🔨 **BAN LOG**\nUser: ${user.tag}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply(
        `🔨 ${user.tag} was banned\n\nBanned by UH Moderation Staff! Reason: ${reason}`
      );
    }
  },

  // 🔇 MUTE
  {
    data: new SlashCommandBuilder()
      .setName("mute")
      .setDescription("Timeout user")
      .addUserOption(o => o.setName("user").setRequired(true))
      .addStringOption(o => o.setName("duration").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const user = i.options.getUser("user");
      const duration = i.options.getString("duration");
      const reason = i.options.getString("reason") || "No reason provided";

      const member = await i.guild.members.fetch(user.id);

      await member.timeout(
        ms(duration),
        `Muted by UH Staff! Reason: ${reason}`
      );

      await logAction(i,
        `🔇 **MUTE LOG**\nUser: ${user.tag}\nDuration: ${duration}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply(
        `🔇 ${user.tag} muted for ${duration}\n\nReason: ${reason}`
      );
    }
  },

  // 🔊 UNMUTE
  {
    data: new SlashCommandBuilder()
      .setName("unmute")
      .setDescription("Remove timeout")
      .addUserOption(o => o.setName("user").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const user = i.options.getUser("user");
      const reason = i.options.getString("reason") || "No reason provided";

      const member = await i.guild.members.fetch(user.id);
      await member.timeout(null);

      await logAction(i,
        `🔊 **UNMUTE LOG**\nUser: ${user.tag}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply(`🔊 Unmuted ${user.tag}`);
    }
  },

  // 🧹 PURGE
  {
    data: new SlashCommandBuilder()
      .setName("purge")
      .setDescription("Delete messages")
      .addIntegerOption(o => o.setName("amount").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const amount = i.options.getInteger("amount");
      const reason = i.options.getString("reason") || "No reason provided";

      const deleted = await i.channel.bulkDelete(amount, true);

      await logAction(i,
        `🧹 **PURGE LOG**\nAmount: ${deleted.size}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply({
        content: `🧹 Deleted ${deleted.size} messages`,
        ephemeral: true
      });
    }
  },

  // 🎭 ROLE
  {
    data: new SlashCommandBuilder()
      .setName("role")
      .setDescription("Add/remove role")
      .addStringOption(o =>
        o.setName("action")
          .addChoices(
            { name: "add", value: "add" },
            { name: "remove", value: "remove" }
          )
          .setRequired(true)
      )
      .addUserOption(o => o.setName("user").setRequired(true))
      .addRoleOption(o => o.setName("role").setRequired(true))
      .addStringOption(o => o.setName("reason")),

    async execute(i) {
      const action = i.options.getString("action");
      const user = i.options.getUser("user");
      const role = i.options.getRole("role");
      const reason = i.options.getString("reason") || "No reason provided";

      const member = await i.guild.members.fetch(user.id);

      if (action === "add") await member.roles.add(role);
      else await member.roles.remove(role);

      await logAction(i,
        `🎭 **ROLE LOG**\nUser: ${user.tag}\nRole: ${role.name}\nAction: ${action}\nMod: ${i.user.tag}\nReason: ${reason}`
      );

      return i.reply(
        `🎭 ${action} role ${role.name} for ${user.tag}`
      );
    }
  },

  // 📣 SSU
{
  data: new SlashCommandBuilder()
    .setName("ssu")
    .setDescription("Server Start Up")
    .addStringOption(o => o.setName("host").setRequired(true))
    .addStringOption(o => o.setName("cohost"))

  async execute(i) {
    const host = i.options.getString("host");
    const cohost = i.options.getString("cohost") || "None";

    await logAction(
      i,
      `📣 **SSU LOG**\nHost: ${host}\nCoHost: ${cohost}\nBy: ${i.user.tag}\n`
    );

    return i.reply(
        `🚨 Server Start Up!SU\nHost: ${host}\nCoHost: ${cohost}\n@everyone , Get ingame for a **Server Start Up!** Events will be hosted, Roleplays will be conducted! Most active participants will get a prize at the end.`
    );
  }
}

module.exports = commands;