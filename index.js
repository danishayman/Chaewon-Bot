require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const gifs = require('./gifs.json');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Chaewon Bot is alive!'));
app.listen(3000, () => console.log('Web server is running.'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!chaewon') {
    const gif = gifs[Math.floor(Math.random() * gifs.length)];
    message.channel.send(gif);
  }
});

client.login(process.env.DISCORD_TOKEN);
