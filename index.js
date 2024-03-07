const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const axios = require('axios');
const config = require("./config.json");
const prefix = '!';
const fs = require('fs');

let seconds = 5;
let interval = seconds*1000;

const apiDataFile = 'apiData.json';
const currentDataFile = 'currentData.json';
let urlZer0 = 'https://www.fflogs.com:443/v1/reports/user/ZeroLuciis?api_key=61fc0bdb451f8a18b46cc1063727401e'
let urlRashigi = 'https://www.fflogs.com:443/v1/reports/user/Rashigi?api_key=61fc0bdb451f8a18b46cc1063727401e'
let apiUrl = '';
client.on("ready", () => {
  
  console.log("Bot is online")
  client.user.setActivity("Here to provide you the good stuff.");

});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];


  if (command === 'test') {
      const fs = require('fs'); 
      let content; 
  
      try {  
          // Read the file synchronously
          content = fs.readFileSync('DiscordStatus.txt', 'utf8');
          // Save the first line in the file to a variable  
          client.user.setActivity(content.split('\n')[0]);
      } catch (err) {  
          console.error(err);  
  }
  

  }
    console.log("Author id: " +  message.author.id);

  if (command === 'logs') {
    if (message.author.id === '93015145822826496'){
      apiUrl = urlRashigi;
    }
    else if (message.author.id === '97345195930030080'){
      apiUrl = urlZer0;
    }
    else {
      apiUrl = urlRashigi;
    }
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].id);
            //log("https://xivanalysis.com/fflogs/"+data[0].id+"\n"+
            //    "https://www.fflogs.com/reports/"+data[0].id
            //);
            message.channel.send("**" + data[0].title + "**\n" +
                                 "https://xivanalysis.com/fflogs/" + data[0].id+"\n"+
                                 "https://www.fflogs.com/reports/" + data[0].id)+"`";
            
        });
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




function log(msg){
  let webhook_url = 'https://discord.com/api/webhooks/1078755268730552340/kx0BK6l7pNR6rfmNhCrjbNVvQAnLPn3tdw9Y9YMJDAooLFEbtYx8JmzPuxn0jMAy5Tws';//'https://discord.com/api/webhooks/1078746621451440158/Y4tBlyMvvPOhtcqWeAUvdUNB830w38G1j8axH-uI_zQN3ddFkY-dHaHDpqn799MUiU6f';
  let params = {
      username: 'FF14Logs?',
      content: msg,
  };

  return axios({
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(params),
      url: webhook_url,
  });
}


