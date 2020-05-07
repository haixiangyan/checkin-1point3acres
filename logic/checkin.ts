import {Page} from 'puppeteer'
import {startCheckinAnchor} from '../constants/selectors'
import {sleep} from '../lib/tool'
import loading from '../lib/loading'
import consola from 'consola'

const checkin = async (page: Page) => {
  if (await page.$(startCheckinAnchor) === null) {
    loading.stop() && consola.error('无法签到')
    return process.exit(0)
  }

  // 开始签到
  await page.click(startCheckinAnchor)
  await sleep(2000)

  // 这里只能使用 evaluate
  await page.evaluate(() => {
    const 开心 = '#kx'
    const autoModeRadioInput = '#qiandao > div > table.tfm > tbody > tr:nth-child(1) > td > label:nth-child(2)'
    const checkinBtn = '#qiandao > p > button'

    // 选一个表情
    // @ts-ignore
    document.querySelector(开心).click()

    // 快速选择
    // @ts-ignore
    document.querySelector(autoModeRadioInput).click()

    // 签到
    // @ts-ignore
    document.querySelector(checkinBtn).click()
  })
}

export default checkin
