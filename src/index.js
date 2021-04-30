//import dotenv
require('dotenv').config()

//import libs
const Telegram_bot = require("node-telegram-bot-api");

// BOT
const token_secret = process.env.TOKEN_BOT;

const bot = new Telegram_bot(token_secret, { polling: true });

