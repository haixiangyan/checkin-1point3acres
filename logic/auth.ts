import * as fs from 'fs'
import * as inquirer from 'inquirer'
import {Page} from 'puppeteer'
import {loginButton, passwordInput, usernameInput} from '../constants/selectors'
import {userPath} from '../constants/paths'
import {userQuestion} from '../constants/questions'

export type TUser = {
  username: string
  password: string
}

type TUserAnswer = TUser & {
  saveCache: boolean
}

export const login = async (page: Page, username: string, password: string) => {
  await page.focus(usernameInput)
  await page.keyboard.type(username)

  await page.focus(passwordInput)
  await page.keyboard.type(password)

  await page.click(loginButton)
}

export const getUser = async (): Promise<TUser> => {
  // 测试
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
    return {
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string
    }
  }

  // 读取缓存的用户
  const cacheUser: TUser = JSON.parse(fs.readFileSync(userPath, 'utf8'))
  if (cacheUser.username && cacheUser.password) {
    return cacheUser
  }

  // 用户自己输入
  return await askUser()
}

const askUser = async (): Promise<TUser> => {
  const {username, password, saveCache}: TUserAnswer = await inquirer.prompt(userQuestion)

  // 缓存到本地
  if (saveCache) {
    fs.writeFileSync(userPath, JSON.stringify({username, password}))
  }

  return {username, password}
}
