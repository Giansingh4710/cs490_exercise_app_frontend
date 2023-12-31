const { Builder, By, Key } = require('selenium-webdriver')
const assert = require('assert')
import BASE_URLS from '../constants'
const baseURL = BASE_URLS.UI_BASE_URL
import { loginAsClient, logout } from './utils/testHelperFunctions'

// Automated UI testing to test Client features:
//  Client can view list of Coaches and request to hire a Coach (1)
//  Client can filter through Coaches based on specialization/price/location (1)
describe('Client Tests', function () {
  let driver
  beforeAll(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })
  afterAll(() => driver && driver.quit())

  loginAsClient(driver)

  it('Client can view list of Coaches and request to hire a Coach'),
    async function () {
      await driver.get(baseURL + '/ExploreCoaches')
    }

  it('Client can filter through Coaches based on specialization/price/location'),
    async function () {
      await driver.get(baseURL + '/ExploreCoaches')

      const coachListBefore = await driver.findElements(By.css('.coach-card'))
      let coachListLengthBefore = coachListBefore.length
      await driver.wait(until.elementLocated(By.css('.filter-container')), 10000)

      const specializationDropdown = await driver.findElement(By.name('specialization'))
      const specializationOption = specializationDropdown.findElement(
        By.css('option[value="Train for a sport"]'),
      ) // Example value
      await specializationOption.click()

      // Set a maximum price
      const priceInput = await driver.findElement(By.name('selectPrice'))
      await priceInput.sendKeys('100') // Example value

      // Select a state
      const stateDropdown = await driver.findElement(By.name('state'))
      const stateOption = stateDropdown.findElement(By.css('option[value="California"]')) // Example value
      await stateOption.click()

      const coachListAfter = await driver.findElements(By.css('.coach-card'))
      let coachListLengthAfter = coachListAfter.length

      assert(coachListLengthAfter != coachListLengthBefore)
    }

  logout(driver)
})
