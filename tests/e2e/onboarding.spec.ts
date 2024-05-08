import { BrowserContext } from '@playwright/test';
import { test, expect } from '../fixtures/extensionTest'
import path from 'path'
import { OnboardingPage } from '../pages/onboarding_page';
import { SettingsPage } from '../pages/settings_page';
import { HomePage } from '../pages/home_page';
import { log } from 'console';
import { getSecretPhraseFromFile } from '../utils/file_utils';

test.describe('Create wallet', () => {
  test('backup wallet from banner on home screen', async ({
    page,
    extensionId,
    browser,
    context
  }) => {
    const onboardingPage = new OnboardingPage(page);
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);
    const password = 'Trust@1234';
    const pathToExtension = path.join(__dirname, '../downloads/');
    await onboardingPage.goToOnboarding(extensionId);
   
    let pages = await context.pages();
    for (let pageId of pages) {
      if (page != pageId) {
        await pageId.close();
      }
    }

    
    await onboardingPage.clickCreateNewWallet();
    await onboardingPage.fillPasswordField(password);
    await onboardingPage.checkTermsOfService();
    await onboardingPage.clickNext();
    await onboardingPage.clickShareData();
    await onboardingPage.clickOpenWallet();
    await onboardingPage.clickGotIt();
    await onboardingPage.clickReadyToUseTrustWallet();
    await onboardingPage.clickNavigationItemSettings();

    await settingsPage.clickViewSecretPhrase();
    await settingsPage.fillPasswordField(password);
    await settingsPage.clickReveal();
    await settingsPage.clickShowButton();
    
    await expect(page.getByRole('button', { name: 'Hide' })).toBeVisible();

    let secretFilePath: string = await settingsPage.downloadSecretPhrase();
    await settingsPage.closeModal();
    let secretPhrase: string[] = await getSecretPhraseFromFile(secretFilePath);
    await settingsPage.clickHomeItem();
    await homePage.clickOnBackUpBanner();
    await settingsPage.backUpWalletByEnteringSecretPhrase(password, secretPhrase);
  })
})