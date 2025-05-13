import config from '../config.js';
import { fillPerson, fillWord } from './fills.js';

export const waitAndClick = async (page, selector, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const el = page.locator(selector);
      await el.waitFor({ state: 'visible', timeout: 300 });
      await page.waitForTimeout(100);
      await el.click({ timeout: 300 });
      return;
    } catch (e) {
      console.warn(`Click attempt ${i + 1} failed for ${selector}`);
      if (i === retries - 1) {
        throw new Error(`Failed to click ${selector} after ${retries} attempts`);
      }
      await page.waitForTimeout(200);
    }
  }
};

export const login = async (page) => {
  await page.fill('.login-input', config.account.login);
  await page.fill('.password-input', config.account.password);
  await page.click('#register-button');
  await page.waitForSelector('.ghost-btn', { visible: true });
};

export const getExams = async (page) => {
  const { person } = config;

  await page.goto('https://info-car.pl/new/prawo-jazdy/zapisz-sie-na-egzamin-na-prawo-jazdy/wybor-terminu');

  await fillPerson(page, person);
  await fillWord(page);

  const selector = '#practical-container > input';

  let isChecked = false;
  do {
    await waitAndClick(page, selector);

    isChecked = await page.evaluate((sel) => {
      const radio = document.querySelector(sel);
      return radio?.checked;
    }, selector);
  } while (!isChecked);

  const days = {};

  const headers = await page.$$eval('.accordion-header h5', headers => headers.map(header => header.textContent.trim()));

  for (let header of headers) {
    const dateMatch = header.match(/(\d{2}\.\d{2})/);
    const date = dateMatch ? dateMatch[0] : null;

    days[date] = await page.$$eval(`div.accordion-item:has(.accordion-header h5:has-text("${header}")) .theory-row`, rows => {
      return rows.map(row => {
        const time = row.querySelector('.exam-time span')?.textContent.trim();
        const places = row.querySelector('.exam-places')?.textContent.trim();
        return { time, places };
      });
    });
  }

  return days;
};

export const chooseAndGetFirstExam = async (page) => {
  await page.locator('button:has-text("Wybierz")').first().click();
  await waitAndClick(page, '#confirm-modal-btn');
  await waitAndClick(page, '#next-btn');

  let examInfo = await page.locator('div.info-summary').nth(1).innerText();
  examInfo = examInfo.replace(/Edytuj$/, '').trim();

  //await page.click('button:has-text("Potwierdzam")');
  await page.waitForTimeout(1000);

  const hasConflict = await page.locator('text=Inna rezerwacja jest już aktywna dla PKK').isVisible();

  if (hasConflict) {
    return null;
  }

  return examInfo;
};