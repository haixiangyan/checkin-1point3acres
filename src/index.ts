import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.1point3acres.com/bbs/');

  await page.click('')

  await browser.close();
})();
