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
        await ctx.reply('Выбирите язык программирования', LANDS_KEYBOARD);
    } catch (e) {
        console.error(e);
    }
});

let str_find_name = 'Язык программирования не указан. Чтобы начать просмотр вакансий, наберите /jobs и выбирите язык.';
let count = 0;

function get_info_job(name) {
    let about_job;
    try {
        bot.action(name, async (ctx) => {
            str_find_name = name;
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
                    );
                    job.check_salary();

                    let note = new About_Job();
                    about_job = note.create_note_job(job);
                    
                })

            await ctx.reply(about_job, MORE_INFO_KEYBOARD);
        });
    } catch (e) {
        console.error(e);
    }
}

function get_next_job(){
    try {
        bot.action('watch', async (ctx) => {
            await ctx.answerCbQuery();
            await ctx.reply(`Следующая вакансия - ${str_find_name}`);
        })
    } catch (e) {
        console.error(e);
    }
}

function stop(){
    try {
        bot.action('stop', async (ctx) => {
            str_find_name = 'Поиск остановлен. Чтобы начать заново, наберите /jobs';
            await ctx.answerCbQuery();
            await ctx.reply(str_find_name);
        })
    } catch (e) {
        console.error(e)
    }
}

get_info_job('JavaScript');
get_info_job('Python');
get_info_job('C#');
get_info_job('C++');
get_info_job('PHP');
get_info_job('Java');
get_info_job('Go');
get_info_job('Swift');
get_info_job('Kotlin');

get_next_job();

stop();

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));