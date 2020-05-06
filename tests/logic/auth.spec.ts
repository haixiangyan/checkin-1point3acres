import * as fs from 'fs'
import * as inquirer from 'inquirer'
import {getUser} from '../../logic/auth'
import {dotenvPath, userPath} from '../../constants/paths'

describe('getUser', () => {
  it('获取测试用户', async () => {
    process.env.NODE_ENV = 'development'

    const user = await getUser()

    // CI 上不测试
    if (!fs.existsSync(dotenvPath)) return

    const raw = fs.readFileSync(dotenvPath, 'utf8')!
    const [rawUsername, rawPassword] = raw.split('\n')

    expect(user.username).toEqual(rawUsername.split('=')[1])
    expect(user.password).toEqual(rawPassword.split('=')[1])
  })
  it('获取缓存的用户', async () => {
    process.env.NODE_ENV = 'production'

    // 加入缓存的用户
    const mockUser = {username: 'Jack', password: '123'}
    fs.writeFileSync(userPath, JSON.stringify(mockUser))

    const user = await getUser()

    expect(user.username).toEqual(mockUser.username)
    expect(user.password).toEqual(mockUser.password)

    // 还原缓存
    const emptyUser = {username: null, password: null}
    fs.writeFileSync(userPath, JSON.stringify(emptyUser))
  })
  it('获取命令行输入的用户', async () => {
    process.env.NODE_ENV = 'production'

    const mockUser = {username: 'Jack', password: '123', saveCache: false}

    // @ts-ignore
    inquirer.prompt = () => Promise.resolve(mockUser)

    const user = await getUser()

    expect(user.username).toEqual(mockUser.username)
    expect(user.password).toEqual(mockUser.password)
  })
})
