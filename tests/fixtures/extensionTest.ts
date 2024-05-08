import { BrowserContext, chromium, test as base } from '@playwright/test'
import path from 'path'

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, '../resources/extension/release-2.12.0-9fe78fb-poc')
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        process.env.CI ? `--headless=new` : '',
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })

    await use(context)
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [background] = context.serviceWorkers()
    if (!background) {
      background = await context.waitForEvent('serviceworker')
    }

    const extensionId = background.url().split('/')[2]
   
    let pages = await context.pages();
    // Find the extension tab and close it
    for (let page of pages) {
      if (page.url().includes(extensionId)) {
        await page.close();
      }
    }
    await use(extensionId)
    await context.close()
  },
})

export const expect = test.expect
