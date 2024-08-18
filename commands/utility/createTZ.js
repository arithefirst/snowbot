const { SlashCommandBuilder } = require("discord.js");

function date2epoch(M, D, Y, T, PM) {
  // If PM is true, add 12 to the time to convert to 24h
  if (PM == true) {
    if (+T.split(":")[0] == 12) {
      T = 0 + ":" + T.split(":")[1];
    } else {
      var H24 = +T.split(":")[0] + 12;
      T = H24 + ":" + T.split(":")[1];
    }
  }

  // Create the date and return it's epoch value
  var myDate = new Date(M + " " + D + ", " + Y + " " + T);
  return myDate.getTime() / 1000.0;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timezonegen")
    .setDescription("Generates a string that will adapt to the timezone of any user viewing it when sent")
    .addIntegerOption((option) => option.setName("month").setDescription("The month for the TZ string").setRequired(true))
    .addIntegerOption((option) => option.setName("day").setDescription("The day for the TZ string").setRequired(true))
    .addStringOption((option) => option.setName("time").setDescription("The time for the TZ string in HH:MM format. Only accepts 12hr format.").setRequired(true))
    .addBooleanOption((option) => option.setName("pm").setDescription("Set to true if the time you input is PM").setRequired(true))
    .addIntegerOption((option) => option.setName("year").setDescription("The year for the TZ string; When left blank will default to the current year").setRequired(false)),

  async execute(interaction) {
    var m = interaction.options.getInteger("month");
    var d = interaction.options.getInteger("day");
    var y = interaction.options.getInteger("year") ?? new Date().getFullYear();
    var t = interaction.options.getString("time");
    var pm = interaction.options.getBoolean("pm");
    await interaction.reply({ content: "`<t:" + date2epoch(m, d, y, t, pm) + ">`", ephemeral: true });
  },
};
