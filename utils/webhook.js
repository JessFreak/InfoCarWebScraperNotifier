import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';
import { formater } from './formater.js';

export const notify = {
    telegram: async (content) => {
        const bot = new TelegramBot(config.telegram.botToken, { polling: false });
        const message = typeof content === 'string' ? formater.selected(content) : formater.exams(content);
        await bot.sendMessage(config.telegram.chatId, message, { parse_mode: 'Markdown' });
    },
};
