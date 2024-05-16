import { test, expect } from '../fixtures/fixtures'
import {Steps} from "../steps/steps";
import config from "../utils/config";
import {BrowserContext, Page} from "@playwright/test";

test.describe('Swap', () => {
    test('swapPolygonTokenTest: Swap coin to token on Polygon', async ({steps}: {steps: Steps}) => {
        let password = config.get("password")
        let seed = config.get("swapWalletSeed")
        await steps.onboarding.verifyOnboardingPage();
        await steps.onboarding.importWalletByEnteringSecretPhrase({ password: password, agreeToShareData: false, walletSeed: seed, setTrustWalletAsDefault: false });
        await steps.home.clickSwapButton();
        await steps.swap.verifySwapPage();

        await steps.swap.selectFromNetwork("Polygon");
        await steps.swap.verifyDefaultFromTokenName("MATIC");

        await steps.swap.selectToNetwork("Polygon");
        await steps.swap.selectToToken("USDT");

        await steps.swap.enterFromAmount("0.01");
        await steps.swap.verifySlippageTolerance();

        await steps.swap.clickSwapAndVerifySwapConfirmPage();


    })
});