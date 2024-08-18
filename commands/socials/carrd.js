const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("carrd").setDescription("Produces the link to Snow's Carrd"),

  async execute(interaction) {
    await interaction.reply("https://iittlesnow.carrd.co");
  },
};
