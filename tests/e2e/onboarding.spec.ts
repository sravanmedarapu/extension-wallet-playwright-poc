import { test, expect } from '../fixtures/extensionTest'
import path from 'path'
import { OnboardingPage } from '../pages/onboarding_page';
import { SettingsPage } from '../pages/settings_page';
import { HomePage } from '../pages/home_page';
import { getSecretPhraseFromFile } from '../utils/file_utils';

test.describe('Create wallet', () => {
  test('backup wallet from banner on home screen', async ({
    page,
    extensionId,
    browser,
    context
  }) => {
    await new Promise(f => setTimeout(f, 1000));
    const onboardingPage = new OnboardingPage(page);
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);
    const password = 'Trust@1234';
    await onboardingPage.goToOnboarding(extensionId, context);
    await onboardingPage.clickCreateNewWalletButton();
    await onboardingPage.fillePasswordScreen(password);
 
    await onboardingPage.clickShareDataButton();
    await onboardingPage.clickOpenWallet();
    await onboardingPage.clickGotIt();
    await onboardingPage.clickReadyToUseTrustWallet();
    await onboardingPage.clickNavigationItemSettings();

    await settingsPage.clickViewSecretPhrase();
    await expect(settingsPage.secretPhraseWarningMessage).toHaveText("Do NOT share your Secret Phrase!These words can be used to steal all your funds.");

    await settingsPage.fillPasswordField(password);
    await settingsPage.clickReveal();
    await settingsPage.clickShowButton();
    
    await expect(settingsPage.hideButton).toBeVisible();

    let secretFilePath: string = await settingsPage.downloadSecretPhrase();
    await settingsPage.closeTipsModalPopup();
    let secretPhrase: string[] = await getSecretPhraseFromFile(secretFilePath);
    await settingsPage.clickHomeItem();
    await homePage.clickOnBackUpBanner();
    await settingsPage.backUpWalletByEnteringSecretPhrase(password, secretPhrase);
    
    await expect(homePage.backupBanner).not.toBeVisible();
  })

  test('Default wallet-OFF, Product Analytics-OFF', async ({
    page,
    extensionId,
    browser,
    context
  }) => {
    const onboardingPage = new OnboardingPage(page);
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);
    const password = 'Trust@1234';
    await onboardingPage.goToOnboarding(extensionId, context);
    await onboardingPage.clickCreateNewWalletButton();
    await onboardingPage.fillePasswordScreen(password);
    await onboardingPage.clickNoThankyouButton();

    await expect(onboardingPage.trustSetAsDefaultWalletToggle).toBeChecked();
    await onboardingPage.toggleTrustWalletAsDefault();
    await expect(onboardingPage.trustSetAsDefaultWalletToggle).not.toBeChecked();
    await onboardingPage.clickOnOpenWallet()

    await settingsPage.closeTipsModalPopup();
    await homePage.clickSettingsTab();

    await expect(settingsPage.shareProductAnalyticsToggle).not.toBeChecked();
    await expect(settingsPage.setAsDefaultWalletToggle).not.toBeChecked();
  })

test('Default wallet-ON, Product Analytics-ON', async ({
  page,
  extensionId,
  browser,
  context
}) => {
  const onboardingPage = new OnboardingPage(page);
  const settingsPage = new SettingsPage(page);
  const homePage = new HomePage(page);
  const password = 'Trust@1234';
  await onboardingPage.goToOnboarding(extensionId, context);
  await onboardingPage.clickCreateNewWalletButton();
  await onboardingPage.fillePasswordScreen(password);

  await onboardingPage.clickShareDataButton();
  await onboardingPage.clickOpenWallet();

  await onboardingPage.clickGotIt();

  await onboardingPage.clickReadyToUseTrustWallet();
  await homePage.clickSettingsTab();

  await expect(settingsPage.shareProductAnalyticsToggle).toBeChecked();
  await expect(settingsPage.setAsDefaultWalletToggle).toBeChecked();
})
})