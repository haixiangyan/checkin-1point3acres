import fs from 'fs'
import {userPath} from '../constants/paths'

export const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const initUserCache = () => {
  if (fs.existsSync(userPath)) return

  writeJSONSync(userPath, {
    username: null,
    password: null
  })
}

export const clearUserCache = () => {
  writeJSONSync(userPath, {
    username: null,
    password: null
  })
}

export const writeJSONSync = (path: string, data: Object) => {
  fs.writeFileSync(path, JSON.stringify(data))
}

export const readJSONSync = (path: string) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}
