const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("twitch").setDescription("Produces the link to Snow's twitch"),

  async execute(interaction) {
    await interaction.reply("[ttv/iittlesnow](https://twitch.tv/iittlesnow)");
  },
};
