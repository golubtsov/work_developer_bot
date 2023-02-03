const TelegramBotIp = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_BOT;

// const program_languge = [
//     ["JavaScript", "Python", "C#"], 
//     ["Java", "C++", "C"], 
//     ["PHP", "Go", "Ruby"]
// ];

const program_languge = [
    {JavaScript: 'JavaScript'},
    {Python: 'Python'},
    {'C#': 'C#'},
    {Java: 'Java'},
    {'C++': 'C++'},
    {C: 'C'},
    {PHP: 'PHP'},
    {Go: 'Go'},
    {Ruby: 'Ruby'},
];

const bot = new TelegramBotIp(token, { polling: true });

bot.on('message', msg => {
    const text = msg.text;
    const chat_id = msg.chat.id;

    switch (text) {
        case '/start':
            bot.sendMessage(chat_id, "Выбирите язык программирования", {
                "reply_markup": {
                    "keyboard": program_languge
                }
            });
            break;

        case text:
            for (const key in program_languge) {
                if(key == text){
                    let res = `Вы выбрали: ${text}`;
                    bot.sendMessage(chat_id, res);
                }
            }
            break;

        default:
            bot.sendMessage(chat_id, 'Я тебя не понимаю');
            break;
    }

    console.log(text);
});