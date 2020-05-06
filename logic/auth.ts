import path from 'path'
import {Page} from 'puppeteer'
import {loginButton, passwordInput, usernameInput} from '../lib/selectors'

export type TUser = {
  username: string
  password: string
}

export const login = async (page: Page, username: string, password: string) => {
  await page.focus(usernameInput)
  await page.keyboard.type(username)

  await page.focus(passwordInput)
  await page.keyboard.type(password)

  await page.click(loginButton)
}

export const getUser = (): TUser => {
  // 测试
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
    return {
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string
    }
  }

  const userPath = path.join(__dirname, '../db/user.json')
  // 读取缓存的用户
  const cacheUser: TUser = require(userPath)
  if (cacheUser.username && cacheUser.password) {
    return cacheUser
  }

  // TODO: 用户自己输入
  return {
    username: '',
    password: ''
  }
}
