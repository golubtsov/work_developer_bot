const { Markup } = require('telegraf');

const STOP_POISK = 'Поиск остановлен. Чтобы начать заново, наберите /jobs';

// список команд бота
const BOT_COMANDS = `
/start - Начать поиск вакансий
/help - Посмотреть команды бота
/jobs - Выбрать язык программирования и начать поиск вакансий
`;

// клавиатура с языками программирования
const LANDS_KEYBOARD = Markup.inlineKeyboard(
    [
        [Markup.button.callback('JavaScript', 'JavaScript'), Markup.button.callback('Python', 'Python'), Markup.button.callback('C#', 'C#')],
        [Markup.button.callback('C++', 'C++'), Markup.button.callback('PHP', 'PHP'), Markup.button.callback('Java', 'Java')],
        [Markup.button.callback('Go', 'Go'), Markup.button.callback('Swift', 'Swift'), Markup.button.callback('Kotlin', 'Kotlin')]
    ]
);

// клавиатура для дополнительной иформации о вакансии
const MORE_INFO_KEYBOARD = Markup.inlineKeyboard(
    [
        [Markup.button.callback('Смотреть еще', 'watch')],
        [Markup.button.callback('Узнать больше', 'learn_more')],
        [Markup.button.callback('Остановить', 'stop')],
    ]
);

module.exports = {
    BOT_COMANDS,
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD,
    STOP_POISK
}