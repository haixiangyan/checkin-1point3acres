import * as puppeteer from 'puppeteer'
import consola from 'consola'
import {getUser, login} from './logic/auth'
import checkin from './logic/checkin'
import loading from './lib/loading'

(async () => {
  // 启动浏览器
  loading.start('启动无头浏览器')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  loading.stop()
  consola.success('成功启动无头浏览器')

  // 访问一亩三分地
  loading.start('访问一亩三分地')
  await page.goto('https://www.1point3acres.com/bbs/')
  loading.stop()
  consola.success('成功访问一亩三分地主页')

  // 登录
  loading.start('登录中')
  const {username, password} = await getUser()
  await login(page, username, password)
  loading.stop()
  consola.success('登录成功')

  // 签到
  loading.start('开始签到')
  await checkin(page)
  loading.stop()
  consola.success('签到成功')

  // 回答问题

  // 关闭进程
  await page.screenshot({path: 'snapshot.png'});
  await browser.close()
})()
