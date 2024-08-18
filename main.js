const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function date2epoch(M, D, Y, T, PM) {
  // If PM is true, add 12 to the time to convert to 24h
  if (PM == true) {
    var H24 = +T.split(":")[0] + 12;
    T = H24 + ":" + T.split(":")[1];
  }

  // Create the date and return it's epoch value
  var myDate = new Date(M + " " + D + ", " + Y + " " + T);
  return myDate.getTime() / 1000.0;
}

console.log(date2epoch(8, 18, 2024, "1:27", true));

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
