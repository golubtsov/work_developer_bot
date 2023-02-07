const { Telegraf } = require('telegraf');
require('dotenv').config();

const {
    BOT_COMANDS,
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD,
    STOP_POISK
} = require('./module/constants');

const Job = require('./module/Job');


let count = 0;
let id_job;
let info_job;
let name_lang;

const bot = new Telegraf(process.env.API_BOT);

bot.start((ctx) => {
    ctx.replyWithHTML(`Добро пожаловать! Чтобы начать поиск вакансий, укажите команду /jobs`);
});
bot.help((ctx) => ctx.reply(BOT_COMANDS));

bot.command('jobs', async (ctx) => {
    try {
        str_find_name = 'Язык программирования не указан. Чтобы начать просмотр вакансий, наберите /jobs и выбирите язык.';
        count = 0;
        await ctx.reply('Выбирите язык программирования', LANDS_KEYBOARD);
    } catch (e) {
        console.error(e);
    }
});

async function get_jobs(name) {
    name_lang = name;
    await fetch(`https://api.hh.ru/vacancies/?text=${name}`)
        .then(data => data.json())
        .then(data => {
            id_job = data.items[count].id;
        })
    await fetch(`https://api.hh.ru/vacancies/${id_job}`)
        .then(data => data.json())
        .then(data => {
            info_job = data;
        })
}

function get_action_btn(name) {
    try {
        bot.action(name, async (ctx) => {
            await ctx.answerCbQuery();
            await get_jobs(name);

            let job = new Job(
                info_job.id,
                info_job.name,
                info_job.salary,
                info_job.address,
                info_job.experience.name,
                info_job.key_skills
            );

            job.check_salary();
            job.check_from_to();
            job.check_adress();
            job.check_skills();
            let note = job.create_note();

            await ctx.reply(note, MORE_INFO_KEYBOARD);

            count++;
        });
    } catch (e) {
        console.error(e);
    }
}

function get_next_job() {
    try {
        bot.action('watch', async (ctx) => {
            await ctx.answerCbQuery();
            await get_jobs(name_lang);

            let job = new Job(
                info_job.id,
                info_job.name,
                info_job.salary,
                info_job.address,
                info_job.experience.name,
                info_job.key_skills
            );

            job.check_salary();
            job.check_from_to();
            job.check_adress();
            job.check_skills();
            let note = job.create_note();

            await ctx.reply(note, MORE_INFO_KEYBOARD);

            count++;
        })
    } catch (e) {
        console.error(e);
    }
}

function stop() {
    try {
        bot.action('stop', async (ctx) => {
            count = 0;
            await ctx.answerCbQuery();
            await ctx.reply(STOP_POISK);
        })
    } catch (e) {
        console.error(e)
    }
}

get_action_btn('JavaScript');
get_action_btn('Python');
get_action_btn('C#');
get_action_btn('C++');
get_action_btn('PHP');
get_action_btn('Java');
get_action_btn('Go');
get_action_btn('Swift');
get_action_btn('Kotlin');

get_next_job();

stop();

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));