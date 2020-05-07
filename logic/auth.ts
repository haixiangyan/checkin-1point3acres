import * as fs from 'fs'
import * as inquirer from 'inquirer'
import consola from 'consola'
import {Page} from 'puppeteer'
import {loginButton, passwordInput, startCheckinAnchor, usernameInput} from '../constants/selectors'
import {userPath} from '../constants/paths'
import {userQuestion} from '../constants/questions'
import {readJSONSync, sleep} from '../lib/tool'
import loading from '../lib/loading'

export type TUser = {
  username: string
  password: string
}

export type TUserAnswer = TUser & {
  saveCache: boolean
}

export const login = async (page: Page, username: string, password: string) => {
  loading.start('登录中')

  await page.focus(usernameInput)
  await page.keyboard.type(username)

  await page.focus(passwordInput)
  await page.keyboard.type(password)

  await page.click(loginButton)

  await sleep(3000)
  // 登录失败
  if (await page.$(startCheckinAnchor) === null) {
    loading.stop() && consola.error('登录失败')

    const newUser = await askUser()

    await login(page, newUser.username, newUser.password)
  }
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
  const cacheUser: TUser = readJSONSync(userPath)
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
