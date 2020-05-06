import puppeteer, {Page} from 'puppeteer'
import {loginButton, passwordInput, usernameInput} from './lib/selectors'
import {sleep} from './lib/tool'

const login = async (page: Page, username: string, password: string) => {
  await page.focus(usernameInput)
  await page.keyboard.type(username)

  await page.focus(passwordInput)
  await page.keyboard.type(password)

  await page.click(loginButton)
}

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.1point3acres.com/bbs/')

  await login(page, 'username', 'password')

  await sleep(3000)

  await page.screenshot({path: 'example.png'});

  await browser.close()
})()
