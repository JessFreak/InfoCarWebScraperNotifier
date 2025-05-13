import { firefox } from 'playwright';
import { notify } from './utils/webhook.js';
import config from './config.js';
import { filterDatesInRange, getDateRange } from './utils/date.js';
import { chooseAndGetFirstExam, getExams, login } from './utils/parse.js';

const main = async () => {
    console.log('\x1Bc');
    console.log('Started');

    const browser = await firefox.launch({ headless: false });
    const page = await browser.newPage({ viewport: null });

    page.once('load', () => page.goto('https://info-car.pl/oauth2/login'));

    page.on('load', async () => {
        const url = page.url();
        if (url.startsWith('https://info-car.pl/oauth2/login')) {
            await page.waitForSelector('.login-input');
            await login(page);
            await page.click('#cookiescript_accept');
        }
    });

    const timerId = setInterval(async () => {
        try {
            const exams = await getExams(page);

            const { startDate, endDate } = getDateRange(config.daysAhead);
            const filteredExams = filterDatesInRange(exams, startDate, endDate);

            if (Object.keys(filteredExams).length > 0) {
                clearInterval(timerId);
                await notify[config.notifyVia](filteredExams);
                const examInfo = await chooseAndGetFirstExam(page);

                if (examInfo) {
                    await notify[config.notifyVia](examInfo);
                } else {
                    console.log(`[${new Date().toLocaleString()}] Conflict PPK`);
                }

            } else {
                console.log(`[${new Date().toLocaleString()}] No available exams`);
            }
        } catch (e) {
            console.error(e);
        }
    }, config.refreshTime * 1000);
};

await main();
