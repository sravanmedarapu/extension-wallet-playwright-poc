import { test, expect } from '../fixtures/fixtures'
import { Steps } from '../steps/steps';
import config from "../utils/config";

test.describe('Create wallet', () => {
  test('createWalletAndBackItUpFromHomeScreenTest: backup wallet from banner on home screen', async ({steps}: {steps: Steps}) => {
    let password = config.get("password")
    await steps.onboarding.verifyOnboardingPage();
    await steps.onboarding.createNewWallet({ password: password, agreeToShareData: true, agreeToSetTrustWalletAsDefault: true });

    await steps.home.acceptTipsPopup();
    await steps.home.navigateToSettings();

    await steps.settings.viewSecretPhrase(password);
    await steps.settings.verifySecretPhraseVisible();

    let secretPhrase: string[] = await steps.settings.downloadAndReadSecretPhrase();

    await steps.settings.navigateToHome();
    await steps.home.clickOnBackUpBanner();
    await steps.settings.backUpWalletByEnteringSecretPhrase(password, secretPhrase);

    await steps.home.verifyBackupBannerNotVisible()
  })

  test('createWalletTurnOffOptionsTest: Default wallet-OFF, Product Analytics-OFF', async ({steps}: {steps: Steps}) => {
    let password = config.get("password")
    await steps.onboarding.verifyOnboardingPage();
    await steps.onboarding.createNewWallet({
      password: password,
      agreeToShareData: false ,
      agreeToSetTrustWalletAsDefault: false
    });

    await steps.home.closeTipsModalPopup();
    await steps.home.navigateToSettings();

    await steps.settings.verifyProductAnalyticsToggleState({isOn: false});
    await steps.settings.verifyTrustWalletAsDefaultToggleState({isOn: false});
  })

  test('createWalletTurnOnOptionsTest: Default wallet-ON, Product Analytics-ON', async ({steps}: {steps: Steps}) => {
    let password = config.get("password")
    await steps.onboarding.verifyOnboardingPage();
    await steps.onboarding.createNewWallet({
      password: password,
      agreeToShareData: true ,
      agreeToSetTrustWalletAsDefault: true
    });

    await steps.home.acceptTipsPopup();
    await steps.home.navigateToSettings();

    await steps.settings.verifyProductAnalyticsToggleState({isOn: true});
    await steps.settings.verifyTrustWalletAsDefaultToggleState({isOn: true});
  })
})