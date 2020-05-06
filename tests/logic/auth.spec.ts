import * as fs from 'fs'
import * as path from 'path'
import {getUser} from '../../logic/auth'

const dotenvPath = path.join(__dirname, '../../.env')
const cachePath = path.join(__dirname, '../../db/user.json')

describe('getUser', function () {
  it('获取测试用户', () => {
    process.env.NODE_ENV = 'development'

    const user = getUser()

    // CI 上不测试
    if (!fs.existsSync(dotenvPath)) return

    const raw = fs.readFileSync(dotenvPath, 'utf8')!
    const [rawUsername, rawPassword] = raw.split('\n')

    expect(user.username).toEqual(rawUsername.split('=')[1])
    expect(user.password).toEqual(rawPassword.split('=')[1])
  })
  it('获取缓存的用户', () => {
    process.env.NODE_ENV = 'production'

    // 加入缓存的用户
    const mockUser = {username: 'Jack', password: '123'}
    fs.writeFileSync(cachePath, JSON.stringify(mockUser))

    const user = getUser()

    expect(user.username).toEqual(mockUser.username)
    expect(user.password).toEqual(mockUser.password)

    // 还原缓存
    const emptyUser = {username: null, password: null}
    fs.writeFileSync(cachePath, JSON.stringify(emptyUser))
  })
})
