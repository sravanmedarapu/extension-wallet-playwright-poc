import {BrowserContext, chromium, test as base, TestInfo} from '@playwright/test'
import path from 'path'
import * as fs from 'fs';
import propertiesReader from 'properties-reader';
import {Steps} from "../steps/steps";

export const test = base.extend<{
  context: BrowserContext
  extensionId: string,
  steps: Steps
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, '../resources/extension/release-2.12.0-9fe78fb-poc')
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      recordVideo: {
        dir: "./recordings"
      }
        ,
      args: [
        process.env.CI ? `--headless=new` : '',
        // `--headless=false`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })

    await use(context)

    await context.close()
  },
  extensionId: async ({ context }, use) => {
    // for manifest v3:
    let [background] = context.serviceWorkers()
    if (!background) {
      background = await context.waitForEvent('serviceworker')
    }
    
    const extensionId = background.url().split('/')[2]
    await use(extensionId)
  },
  steps: async ({ page, context, extensionId }, use) => {
    const steps = new Steps(page, context, extensionId);
    await use(steps);
  },
  saveVideo: [
    async ({ page }: any, use: () => any, testInfo: any) => {
      await use();
      if (testInfo.status === 'failed') {
        const originalVideoPath = await page.video().path();
        testInfo.attachments.push({
          name: 'video',
          path: originalVideoPath,
          contentType: 'video/webm',
        });
        }
    },
    { auto: true },
  ],
})

test.beforeEach(async ({ steps   }) => {
  console.log('setup: beforeEach');
  const defaultLaunchPagePromise = steps.context.waitForEvent('page');
  const defaultLaunchPage = await defaultLaunchPagePromise;
  // TODO: defaultLaunchPage.close() sometimes closing actual page instead of extension page
  // if (page !== defaultLaunchPage) {
  //   await defaultLaunchPage.close();
  // }
  await steps.onboarding.goToOnboarding();

});

test.afterEach(async ({ steps   }, testInfo) => {
  console.log('teardown: afterEach');

  const screenshot = await steps.page. screenshot();
  await testInfo. attach('screenshot', { body: screenshot, contentType: 'image/ png' });

  await steps.context.close()
})


export const expect = test.expect
