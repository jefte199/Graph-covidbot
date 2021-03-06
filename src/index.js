//import dotenv
require('dotenv').config()

//import libs
const Telegram_bot = require("node-telegram-bot-api");
const express = require("express");
const fetch = require("node-fetch");

//For deploy in Heroku
const app = express();

app.set('port', (process.env.PORT || 3333));

app.get('/', function(request, response) {
  const result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {0
  console.log('App is running, server is listening on port ', app.get('port'));
});

setInterval(() => {
  fetch(`https://graph-covidbot.herokuapp.com/`)
  .then(res => {
    const response = res;

    bot.sendMessage(process.env.ID_BOT, `APP STATUS: ${response.status}`);  
  });
}, process.env.TIME_INTERVAL);


//function API
function graph_covid(initials){
  const obj_graph_img_img = {
    URL: "https://corona.dnsforfamily.com/graph.png?c="+initials+"&time=whatever",
    MSG: `Vermelho - Mortes por dia\nAmarelo - Infectados por dia\nBranco(linha pontilhada) - Recuperados
    \nInformação em tempo Real`
  };
  return obj_graph_img_img;
}

// Style font BOT
const style_font = {
  parse_mode: 'Markdown'
};

// BOT
const token_secret = process.env.TOKEN_BOT;

const bot = new Telegram_bot(token_secret, { polling: true });

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, 
    `Olá ${msg.from.first_name}, bem vindo ao graph covid\n/help para saber como me usar`);

  bot.sendMessage(process.env.ID_BOT, 
    `${msg.from.first_name}, Acabou de entrar no graph_api`);
});

bot.onText(/\/help/, (msg) => {

  bot.sendMessage(msg.chat.id, 
    `Você pode me controlar enviando estes comandos:
    \n*FONTES*
    \n/fonte *-* Para ver meu código e a fonte das minhas informações
    \n*BRASIL*
    \n/brasil *-* para informações de todo o Brasil
    \n*MUNDO*
    \n/israel\n/espanha\n/italia\n/china\n/islandia
    \nOutros paises embreve
    `,style_font);

});

bot.on('message', (msg) => {

  if (msg.text.toString().toLowerCase().indexOf("dica") === 0) {
    const msg_dica = msg.text;

    bot.sendMessage(msg.chat.id, "Obrigado pela dica");
    bot.sendMessage(process.env.ID_BOT, `ID - retorno para ${msg.from.first_name}: ${msg.chat.id} \n${msg_dica}`);
  }
});

bot.onText(/\/fonte/, (msg) => {

  bot.sendMessage(msg.chat.id,`
    *FONTE*
    \nEu obtenho minhas informações da seguinte API\nhttps://corona.dnsforfamily.com/api.txt
    \n*CÓDIGO*
    \nVocê pode ver meu código fonte aqui.\nhttps://github.com/jefte199/Graph-covidbot
    \n*MELHORIAS*
    \nVocê pode me enviar sugestões de melhorias da seguinte maneira.\nescreva "dica" e depois uma dica
    \n*EXEMPLO*
    \ndica Queria que tivesse o Sri Lanka nas opções de país.
    \nSua dica vai ser muito bem recebida.
    `,style_font);  

});

bot.onText(/\/brasil/, (msg) => {

  const obj_graph_img = graph_covid("BR");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

bot.onText(/\/israel/, (msg) => {

  const obj_graph_img = graph_covid("IL");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

bot.onText(/\/espanha/, (msg) => {

  const obj_graph_img = graph_covid("ES");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

bot.onText(/\/china/, (msg) => {

  const obj_graph_img = graph_covid("CN");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

bot.onText(/\/italia/, (msg) => {

  const obj_graph_img = graph_covid("IT");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

bot.onText(/\/islandia/, (msg) => {

  const obj_graph_img = graph_covid("IS");

  bot.sendPhoto(msg.chat.id,`${obj_graph_img.URL}`,{caption : `${obj_graph_img.MSG}`});  

});

// Secret Route

bot.on('message', (msg) => {

  if (msg.text.toString().toLowerCase().indexOf("retorno") === 0) {
    const [, msg_retorno] = msg.text.split('retorno');
    const [msg_re, msg_id] =  msg_retorno.split('id');
    bot.sendMessage(msg.chat.id, "Mensagem enviada");
    bot.sendMessage(msg_id, `${msg_re}`);
  }
});
