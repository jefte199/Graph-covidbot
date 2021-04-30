//import dotenv
require('dotenv').config()

//import libs
const Telegram_bot = require("node-telegram-bot-api");

// BOT
const token_secret = process.env.TOKEN_BOT;

const bot = new Telegram_bot(token_secret, { polling: true });

// Style font
const style_font = {
  parse_mode: 'Markdown'
};

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, 
    `Olá ${msg.from.first_name}, bem vindo ao graphic covid\n/help para saber como me usar`);

});

bot.onText(/\/help/, (msg) => {

  bot.sendMessage(msg.chat.id, 
    `Você pode me controlar enviando estes comandos:
    \n*FONTES*
    \n/fonte *-* Para ver meu código e a fonte das minhas informações
    \n*BRASIL*
    \n/brasil *-* para informações de todo o Brasil
    \n*MUNDO*
    \nTenho informações somente de forma geral\n/israel\n/eua *-* Estados Unidos\n/italia\n/china
    \nOutros paises embreve`,
    style_font);

});
