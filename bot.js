const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const {
    BOT_COMANDS, 
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD
} = require('./module/constants');

const Job = require('./module/Job');
const About_Job = require('./module/About_Job');

const bot = new Telegraf(process.env.API_BOT);

bot.start((ctx) => {
    ctx.replyWithHTML(`Добро пожаловать! Чтобы начать поиск вакансий, укажите команду /jobs`);
});
bot.help((ctx) => ctx.reply(BOT_COMANDS));

bot.command('jobs', async (ctx) => {
    try {
        console.log(LANDS_KEYBOARD)
        await ctx.reply('Выбирите язык программирования', LANDS_KEYBOARD);
    } catch (e) {
        console.error(e);
    }
});

function add_action(name) {
    let about_job;
    try {
        bot.action(name, async (ctx) => {
            await ctx.answerCbQuery();
            // получаем от API hh.ru вакансии
            await fetch(`https://api.hh.ru/vacancies/?text=${name}`)
                .then(data => data.json())
                .then(data => {
                    let job = new Job(
                        data.items[0].id,
                        data.items[0].name,
                        data.items[0].area.name,
                        data.items[0].salary,
                        data.items[0].address
                    );
                    job.check_salary();

                    let note = new About_Job();
                    about_job = note.create_note_job(job);
                    
                })

            await ctx.replyWithHTML(about_job, MORE_INFO_KEYBOARD);
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