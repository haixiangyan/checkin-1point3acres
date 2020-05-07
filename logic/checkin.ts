import {Page} from 'puppeteer'
import {autoModeRadioInput, checkinBtn, startCheckinAnchor, 开心} from '../constants/selectors'
import {sleep} from '../lib/tool'
import loading from '../lib/loading'
import consola from 'consola'

const checkin = async (page: Page) => {
  if (await page.$(startCheckinAnchor) === null) {
    return loading.stop() && consola.error('无法签到')
  }

  // 开始签到
  await page.click(startCheckinAnchor)
  await sleep(1000)

  // 选一个表情
  await page.click(开心)

  // 快速选择
  await page.click(autoModeRadioInput)

  // 签到
  await page.click(checkinBtn)
}

export default checkin
