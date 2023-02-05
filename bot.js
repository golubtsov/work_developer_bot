const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const {
    BOT_COMANDS, 
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD
} = require('./module/constants');

const Job = require('./module/Job');
const About_Job = require('./module/About_Job');
const Id_Job = require('./module/Id_Job');
const About_Job_Id = require('./module/About_Job_Id');

let str_find_name = 'Язык программирования не указан. Чтобы начать просмотр вакансий, наберите /jobs и выбирите язык.';
let count = 0;
let id_job = 0;

const bot = new Telegraf(process.env.API_BOT);

bot.start((ctx) => {
    ctx.replyWithHTML(`Добро пожаловать! Чтобы начать поиск вакансий, укажите команду /jobs`);
});
bot.help((ctx) => ctx.reply(BOT_COMANDS));

bot.command('jobs', async (ctx) => {
    try {
        str_find_name = 'Язык программирования не указан. Чтобы начать просмотр вакансий, наберите /jobs и выбирите язык.';
        count = 0;
        id_job = 0;
        await ctx.reply('Выбирите язык программирования', LANDS_KEYBOARD);
    } catch (e) {
        console.error(e);
    }
});


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
                        data.items[count].id,
                        data.items[count].name,
                        data.items[count].area.name,
                        data.items[count].salary,
                    );
                    job.check_salary();

                    let note = new About_Job();
                    about_job = note.create_note_job(job);
                    
                    id_job = job.id;
                })

            await ctx.reply(about_job, MORE_INFO_KEYBOARD);

            count++;
        });
    } catch (e) {
        console.error(e);
    }
}

function get_next_job(){
    try {
        bot.action('watch', async (ctx) => {
            await ctx.answerCbQuery();
            // получаем от API hh.ru вакансии
            await fetch(`https://api.hh.ru/vacancies/?text=${str_find_name}`)
                .then(data => data.json())
                .then(data => {
                    let job = new Job(
                        data.items[count].id,
                        data.items[count].name,
                        data.items[count].area.name,
                        data.items[count].salary,
                    );
                    job.check_salary();

                    let note = new About_Job();
                    about_job = note.create_note_job(job);
                    
                })

            await ctx.reply(about_job, MORE_INFO_KEYBOARD);

            count++;
        })
    } catch (e) {
        console.error(e);
    }
}

function stop(){
    try {
        bot.action('stop', async (ctx) => {
            str_find_name = 'Поиск остановлен. Чтобы начать заново, наберите /jobs';
            count = 0;
            await ctx.answerCbQuery();
            await ctx.reply(str_find_name);
        })
    } catch (e) {
        console.error(e)
    }
}

function learn_more(){
    let text_job = '';
    try {
        bot.action('learn_more', async (ctx) => {
            await ctx.answerCbQuery();

            await fetch(`https://api.hh.ru/vacancies/${id_job}`)
                .then(data => data.json())
                .then(data => {
                    let id_job_class = new Id_Job(
                        data.id,
                        data.name,
                        data.area.name,
                        data.salary,
                        data.address,
                        data.experience.name,
                        data.key_skills
                    );
                    id_job_class.check_salary(); 
                    
                    let info_job = new About_Job_Id(id_job_class);
                    info_job.check_skills();
                    text_job = info_job.create_note();
                })

            await ctx.reply(text_job, MORE_INFO_KEYBOARD);
        });
    } catch (e) {
        console.error(e);
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

learn_more();

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));