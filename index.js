const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const axios = require('axios');
const config = require("./config.json");
const prefix = '!';



client.on("ready", () => {

  console.log("Bot is online")
  client.user.setActivity("Test kekw");

})

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];


  if (command === 'test') {
    message.channel.send("Holy shit finally");
  }




  if (command === "givewaifupls") {
    const URL = 'https://api.waifu.pics/sfw/waifu';
    async function getWaifuURL() {
      try {
        const response = await axios.get(URL);
        console.log(response.data.url);
        message.channel.send(response.data.url);
      } catch (error) {
        console.log(error);
      }
    }
    getWaifuURL();
  }

  if (command === "givewaifuplsnsfw") {
    const URL = 'https://api.waifu.pics/nsfw/waifu';
    try {
      axios
        .get(URL)
        .then(response => {
          console.log(response.data.url);
          message.reply('Feeling spicy? One sec buddy!');
          message.channel.send({
            files: [{
              attachment: response.data.url,
              name: "SPOILER_FILE.jpg"
            }]
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
})
client.login(config.key);