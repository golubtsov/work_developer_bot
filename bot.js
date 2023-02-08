const { Telegraf } = require('telegraf');
require('dotenv').config();

const {
    BOT_COMANDS,
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD,
    STOP_POISK
} = require('./module/constants');

const Job = require('./module/Job');


let count = 0; // счетчик, чтобы получать следующую вакансию из массива
let id_job; // id вакансии из массива
let info_job; // весь объект вакансии из массива
let name_lang; // имя выбранного языка программирования

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

// ф-ия получает массив вакансий, получает элемент согласно count, отправляет запрос на полученик более подробной иформации о вакансии
async function get_jobs(name) {
    // когда вызываем ф-ию get_next_job, у нас нет данных о выбранном языке, т.к. кнопка "Смотреть еще" одна, а кнопки с языками передают имена языков, для решения этой проблемы использую строку 37, во время получения первой вакансии в name_lang кладем выбранный язык, после этого просматриваю след. вакансии будет тот же язык программирования
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

// ф-ия создает на основе класса Job сообщение о вакансии
function create_info_job(job){
    let el_job = new Job(
        job.id,
        job.name,
        job.salary,
        job.address,
        job.experience.name,
        job.key_skills
    );

    el_job.check_salary();
    el_job.check_from_to();
    el_job.check_adress();
    el_job.check_skills();

    let note = el_job.create_note();
    return note;
}

function get_action_btn(name) {
    try {
        bot.action(name, async (ctx) => {
            await ctx.answerCbQuery();
            await get_jobs(name);
            let note = create_info_job(info_job);
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
            let note = create_info_job(info_job);
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