const Discord = require("discord.js")
const client = new Discord.Client()
const axios = require('axios');

client.on("message", msg => {
  if (msg.content.toString() == "/givewaifupls") {
    const URL = 'https://api.waifu.pics/sfw/waifu';
    axios
      .get(URL)
      .then(response => {
        console.log(response.data.url);
        msg.channel.send(response.data.url);
      })
      .catch(error => {
        console.log(error);
      });
  }
  if (msg.content.startsWith("/givewaifuplsnsfw")) {
    const URL = 'https://api.waifu.pics/nsfw/waifu';
    
    try{axios
      .get(URL)
      .then(response => {
        console.log(response.data.url);
        msg.reply('Feeling spicy? One sec buddy!');
        msg.channel.send({
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
client.login(process.env.TOKEN)


