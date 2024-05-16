import { test } from '../fixtures/fixtures'
import { Steps } from '../steps/steps';
import { NetworkDTO } from '../utils/dto/networkDto';
import config from '../utils/config';
import { log } from 'console';

test.describe('Import wallet', () => {
    test(`importCustomTokenTest: Importing custom tokens - Ethereum, Tron, Fantom, Arbitrum`, async ({steps}: {steps: Steps}) => {
        let password = config.get("password")
        await steps.onboarding.verifyOnboardingPage();
        await steps.onboarding.createNewWallet({ password: password, agreeToShareData: true, agreeToSetTrustWalletAsDefault: true });
        await steps.home.closeTipsModalPopup();

        await steps.manageCrypto.unsetAllCryptoToggleButtons()
        await steps.home.verifyNoCryptoActivatedMessageVisible()
        let networkTokens    = getNetworkTokens()
        for(let networkToken of networkTokens) {
            let symbol: string = config.get(networkToken.symbol)
            let address: string = config.get(networkToken.address)
            if (address.startsWith("'") && address.endsWith("'")) {
                // remove extra quotes
                address = address.slice(1, -1);
            }
            log(`Adding token ${symbol} with address ${address} on network ${networkToken.network}`)
            await steps.home.clickSearchButton()
            await steps.manageCrypto.selectTokenNetwork(networkToken.network, address)
            await steps.manageCrypto.validateTokenSymbol(symbol)
            await steps.manageCrypto.addToken()
            await steps.home.verifyCryptoTokenAddedToHomePage(symbol)
        }
    });
});

function getNetworkTokens(): NetworkDTO[] {
    return [
        new NetworkDTO("Tron", "tronCustomTokenAddress", "tronCustomTokenSymbol"),
        new NetworkDTO("Arbitrum", "arbitrumCustomTokenAddress", "arbitrumCustomTokenSymbol"),
        new NetworkDTO("Fantom", "fantomCustomTokenAddress", "fantomCustomTokenSymbol"),
        new NetworkDTO("Sui", "suiCustomTokenAddress", "suiCustomTokenSymbol"),
        new NetworkDTO("Ethereum", "ethereumCustomTokenAddress", "ethereumCustomTokenSymbol"),
        new NetworkDTO("Smart Chain", "bscCustomScamTokenAddress", "bscCustomScamTokenSymbol"),
        new NetworkDTO("Stride", "strideCustomTokenAddress", "strideCustomTokenSymbol")
    ];
}