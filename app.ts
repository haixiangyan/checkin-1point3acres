import * as puppeteer from 'puppeteer'
import {sleep} from './lib/tool'
import {getUser, login} from './logic/auth'
import checkin from './logic/checkin'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://www.1point3acres.com/bbs/')

  // 登录
  const {username, password} = await getUser()
  await login(page, username, password)

  // 签到
  await checkin()
  await sleep(3000)

  // 回答问题

  await page.screenshot({path: 'snapshot.png'});
  await browser.close()
})()
