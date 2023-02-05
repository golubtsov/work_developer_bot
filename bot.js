const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const comands = require('./module/constants');

const Job = require('./module/Job');

const bot = new Telegraf(process.env.API_BOT);

bot.start((ctx) => {
    ctx.replyWithHTML(`Добро пожаловать! Чтобы начать поиск вакансий, укажите команду /вакансии`);
});
bot.help((ctx) => ctx.reply(comands.bot_comands));

bot.command('jobs', async (ctx) => {
    try {
        await ctx.reply('Выбирите язык программирования', Markup.inlineKeyboard(
            [
                [Markup.button.callback('JavaScript', 'JavaScript'), Markup.button.callback('Python', 'Python'), Markup.button.callback('C#', 'C#')],
                [Markup.button.callback('C++', 'C++'), Markup.button.callback('PHP', 'PHP'), Markup.button.callback('Java', 'Java')],
                [Markup.button.callback('Go', 'Go'), Markup.button.callback('Swift', 'Swift'), Markup.button.callback('Kotlin', 'Kotlin')]
            ]
        ));
    } catch (e) {
        console.error(e);
    }
});

function add_action(name) {
    let job;
    let job_str;
    try {
        bot.action(name, async (ctx) => {
            await ctx.answerCbQuery();
            await fetch(`https://api.hh.ru/vacancies/?text=${name}`)
                .then(data => data.json())
                .then(data => {
                    job = new Job(
                        data.items[0].id,
                        data.items[0].name,
                        data.items[0].area.name,
                        data.items[0].salary,
                        data.items[0].address
                    );
                    job_str = `
                    ${job.name}
Город: ${job.area_name}
                    `;
                })

            await ctx.replyWithHTML(job_str, Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Смотреть', 'watch')]
                ]
            ));
        });
    } catch (e) {
        console.error(e);
    }
}

add_action('JavaScript');
add_action('Python');
add_action('C#');
add_action('C++');
add_action('PHP');
add_action('Java');
add_action('Go');
add_action('Swift');
add_action('Kotlin');

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));