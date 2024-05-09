// onboarding_page.ts
import { Page, Locator } from '@playwright/test';

export class OnboardingPage {

    public readonly onBoardingPageTitle = this.page.getByTestId('onboarding-step-title');

    private passwordFieldTestId = 'password-field';
    private checkboxTermsOfServiceTestId = this.page.getByTestId('checkbox-terms-of-service');
    public readonly trustSetAsDefaultWalletToggle: Locator = this.page.getByRole('switch', { name: 'default-wallet' });
    public readonly openWallet: Locator = this.page.getByRole('button', { name: 'Open wallet' });

    public readonly createNewWalletButton = this.page.getByRole('button', { name: 'Create a new wallet' });
    public readonly importOrRecoverWalletButton = this.page.getByRole('button', { name: 'Import or recover wallet' });
    public readonly ledgerButton = this.page.getByRole('button', { name: 'Ledger' });

    private readonly nextButton = this.page.getByRole('button', { name: 'Next' });

    private readonly noThankyouButton = this.page.getByRole('button', { name: 'No thanks' });

    private readonly shareDateButton = this.page.getByRole('button', { name: 'Share data' });

    private readonly openWalletButton = this.page.getByRole('button', { name: 'Open wallet' });

    private readonly viewSecretPhraseButton = this.page.getByText('View Secret Phrase');

    private readonly revealButton = this.page.getByRole('button', { name: 'Reveal' });

    private readonly downloadButton = this.page.getByRole('button', { name: 'Download' });

    constructor(private page: Page) {}

    async clickCreateNewWalletButton() {
        await this.createNewWalletButton.click();
    }

    async fillPasswordField(password: string) {
        await this.page.getByTestId(this.passwordFieldTestId).nth(0).fill(password);
        await this.page.getByTestId(this.passwordFieldTestId).nth(1).fill(password);
        
    }

    async fillePasswordScreen(password: string) {
        await this.fillPasswordField(password)
        await this.checkTermsOfService();
        await this.clickNextButton();
    }

    async checkTermsOfService() {
        await this.checkboxTermsOfServiceTestId.check();
    }

    async clickNextButton() {
        await this.nextButton.click();
    }
    
    async clickNoThankyouButton() {
        await this.noThankyouButton.click();
    }
    async toggleTrustWalletAsDefault() {
        await this.trustSetAsDefaultWalletToggle.click();
    }

    async clickShareDataButton() {
        await this.shareDateButton.click();
    }

    async clickOpenWallet() {
        await this.openWalletButton.click();
    }

    async clickViewSecretPhrase() {
        await this.viewSecretPhraseButton.click();
    }

    async clickReveal() {
        await this.revealButton.click();
    }


    async clickShow() {
        await this.page.getByRole('button', { name: 'Show' }).click();
    }

    async clickDownloadButton() {
        await this.downloadButton.click();
    }

    async waitForDownloadEvent() {
        return await this.page.waitForEvent('download');
    }

    async saveDownloadedFile(download: any, pathToExtension: string) {
        let secretFilePath = pathToExtension + download.suggestedFilename();
        await download.saveAs(secretFilePath);
    }

    async clickOnOpenWallet() {
        await this.openWallet.click();
    }
}