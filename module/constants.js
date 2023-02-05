const { Markup } = require('telegraf');

const BOT_COMANDS = `
/start - Начать поиск вакансий
/help - Посмотреть команды бота
/jobs - Начать сбор информации
`;

const LANDS_KEYBOARD = Markup.inlineKeyboard(
    [
        [Markup.button.callback('JavaScript', 'JavaScript'), Markup.button.callback('Python', 'Python'), Markup.button.callback('C#', 'C#')],
        [Markup.button.callback('C++', 'C++'), Markup.button.callback('PHP', 'PHP'), Markup.button.callback('Java', 'Java')],
        [Markup.button.callback('Go', 'Go'), Markup.button.callback('Swift', 'Swift'), Markup.button.callback('Kotlin', 'Kotlin')]
    ]
);

const MORE_INFO_KEYBOARD = Markup.inlineKeyboard(
    [
        [Markup.button.callback('Смотреть', 'watch')]
    ]
);

module.exports = {
    BOT_COMANDS,
    LANDS_KEYBOARD,
    MORE_INFO_KEYBOARD
}