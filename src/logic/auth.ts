import path from 'path'
import fs from 'fs'
import {Page} from 'puppeteer'
import {loginButton, passwordInput, usernameInput} from '../lib/selectors'

export const login = async (page: Page, username: string, password: string) => {
  await page.focus(usernameInput)
  await page.keyboard.type(username)

  await page.focus(passwordInput)
  await page.keyboard.type(password)

  await page.click(loginButton)
}

export const getUser = () => {
  // 测试
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
    return {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }
  }

  const userPath = path.join(__dirname, '../db/user.json')
  // 读取缓存的用户
  if (fs.existsSync(userPath)) {
    return require(userPath)
  }

  // TODO: 用户自己输入
}
