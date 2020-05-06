import puppeteer from 'puppeteer'
import {sleep} from './lib/tool'
import {login} from './logic/auth'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.1point3acres.com/bbs/')

  await login(page, 'username', 'password')

  await sleep(3000)

  await page.screenshot({path: 'example.png'});

  await browser.close()
})()
