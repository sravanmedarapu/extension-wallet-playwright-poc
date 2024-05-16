import { test, expect } from '../fixtures/fixtures'
import { Steps } from '../steps/steps';
import config  from '../utils/config';

test.describe('Import wallet', () => {
    const testData = new Map();
    testData.set('12 words', config.get('masterWalletSeed'));
    testData.set('24 words', config.get('24WordWalletSeed'));
    let password = config.get("password")
    for (let [key, walletSeed] of testData) {
        test(`import${key}WordWalletTest: Import a ${key} secret phrase wallet`, async ({steps}: {steps: Steps}) => {
            await steps.onboarding.verifyOnboardingPage();
            await steps.onboarding.importOrRecoverWallet(password);
            await steps.onboarding.inputSecretPhrase(walletSeed);
            await steps.onboarding.clearAndVerifySecretPhrasesCleared();
            await steps.onboarding.pasteSecretPhraseAndClickNext(walletSeed);
            await steps.onboarding.setShareDatePermissions(false);
            await steps.onboarding.verifySuccessfulWalletImport();
        });
    }
});