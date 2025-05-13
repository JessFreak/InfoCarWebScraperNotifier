import { waitAndClick } from './parse.js';
import config from '../config.js';

const ensureCheckboxChecked = async (page, selector) => {
  await page.evaluate((sel) => {
    const checkbox = document.querySelector(sel);
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, selector);
};

export const fillPerson = async (page, person) => {
  await page.click('text=Egzamin na prawo jazdy (PKK)');
  await page.fill('#firstname', person.firstName);
  await page.fill('#lastname', person.lastName);

  await page.fill('#pesel', person.pesel);
  await page.fill('#pkk', person.ppk);

  await page.click('#category-select');
  await waitAndClick(page, `#${person.category}`);

  await page.fill('#email', person.email);
  await page.fill('#phoneNumber', person.phone);

  await ensureCheckboxChecked(page, '#regulations-text');

  await page.click('#next-btn > div');
};

export const fillWord = async (page) => {
  const mapSelector = `#map > div.maplibregl-canvas-container.mapboxgl-canvas-container.maplibregl-interactive.mapboxgl-interactive.maplibregl-touch-drag-pan.mapboxgl-touch-drag-pan.maplibregl-touch-zoom-rotate.mapboxgl-touch-zoom-rotate > div:nth-child(${config.person.word.cssNumber})`;
  const chooseBtnSelector = '#choose-btn';

  let chooseBtnVisible = false;
  do {
    await waitAndClick(page, mapSelector);

    chooseBtnVisible = await page.waitForSelector(chooseBtnSelector, {
      state: 'visible',
      timeout: 200,
    }).catch(() => null);
  } while (!chooseBtnVisible);

  await page.click(chooseBtnSelector);

  await page.click('#next-btn > div');
};
