import { test, expect } from '../fixtures/extensionTest'
import { Steps } from '../steps/steps';
import config  from '../utils/config';

test.beforeEach(async ({ context, page, extensionId }) => {
    const defaultLaunchPagePromise = context.waitForEvent('page');
    const defaultLaunchPage = await defaultLaunchPagePromise;
    // TODO: defaultLaunchPage.close() sometimes closing actual page instead of extension page
    // await defaultLaunchPage.close();
    Steps.initializeSteps(page);
    await Steps.onboarding.goToOnboarding(extensionId, context);
});

test.describe('Import wallet', () => {
    const testData = new Map();
    testData.set('12 words', config.get('masterWalletSeed'));
    testData.set('24 words', config.get('24WordWalletSeed'));
    let password = config.get("password")
    for (let [key, walletSeed] of testData) {
        test(`Import a ${key} secret phrase wallet`, async () => {
            await Steps.onboarding.verifyOnboardingPage();
            await Steps.onboarding.importOrRecoverWallet(password);
            await Steps.onboarding.inputSecretPhrase(walletSeed);
            await Steps.onboarding.clearAndVerifySecretPhrasesCleared();
            await Steps.onboarding.pasteSecretPhrase(walletSeed);
            await Steps.onboarding.setShareDatePermissions(false);
            await Steps.onboarding.verifySuccessfulWalletImport();
        });
    }
});