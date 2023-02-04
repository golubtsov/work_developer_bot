const TelegramBotIp = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_BOT;
const check_lang = require('./module/check_langs');
const get_jobs = require('./module/check_langs');

const program_languges = [
    ["JavaScript", "Python", "C#"],
    ["Java", "C++", "C"],
    ["PHP", "Go", "Ruby"]
];

const keyboard_lang = {
    "reply_markup": {
        "keyboard": program_languges
    }
}

const bot = new TelegramBotIp(token, { polling: true });

bot.getMyCommands([
    { comand: '/start', description: 'Начало работы' },
    { comand: '/langage', description: 'Выбрать язык программирования' },
    { comand: '/level', description: 'Вабрать уровень подготовки' }
]);

bot.on('message', async msg => {
    const text = msg.text;
    const chat_id = msg.chat.id;

    let user_lang = '';
    let user_level = '';

    switch (text) {
        case '/start':
            await bot.sendMessage(chat_id, 'Выбирите язык программирования', keyboard_lang);
            break;

        case text:
            if(check_lang(text, program_languges) == true){
                // get_jobs(text);
                await bot.sendMessage(chat_id, 'Ищем');
            } else {
                await bot.sendSticker(chat_id, 'https://tlgrm.ru/_/stickers/ec0/cef/ec0cef02-04d5-4091-a18f-fee3aaf0a0b0/8');
                await bot.sendMessage(chat_id, 'Я не знаю такого языка программирования', keyboard_lang);
            }
            break;

        default:
            break;
    }

});