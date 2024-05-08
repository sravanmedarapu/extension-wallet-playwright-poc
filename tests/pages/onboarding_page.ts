// onboarding_page.ts
import { Page } from '@playwright/test';

export class OnboardingPage {
    private page: Page;
    private passwordFieldLocator = 'div';
    private passwordFieldTestId = 'password-field';
    private checkboxTermsOfServiceTestId = 'checkbox-terms-of-service';
    private navigationItemSettingsTestId = 'navigation-item-settings';
    private passwordFieldInputGroupTestId = 'password-field-input-group';
    private downloadButtonRole = 'button';
    private downloadButtonName = 'Download';

    constructor(page: Page) {
        this.page = page;
    }

    async goToOnboarding(extensionId: string) {
        await this.page.goto(`chrome-extension://${extensionId}/home.html#/onboarding`);
    }

    async takeScreenshot() {
        await this.page.screenshot({ path: 'screenshot.png' });
    }

    async clickCreateNewWallet() {
        await this.page.getByRole('button', { name: 'Create a new wallet' }).click();
    }

    async fillPasswordField(password: string) {
        await this.page.getByTestId(this.passwordFieldTestId).nth(0).fill(password);
        await this.page.getByTestId(this.passwordFieldTestId).nth(1).fill(password);
    }

    async checkTermsOfService() {
        await this.page.getByTestId(this.checkboxTermsOfServiceTestId).check();
    }

    async clickNext() {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async clickShareData() {
        await this.page.getByRole('button', { name: 'Share data' }).click();
    }

    async clickOpenWallet() {
        await this.page.getByRole('button', { name: 'Open wallet' }).click();
    }

    async clickGotIt() {
        await this.page.getByRole('button', { name: 'Got it' }).click();
    }

    async clickReadyToUseTrustWallet() {
        await this.page.getByRole('button', { name: 'I’m ready to use Trust Wallet' }).click();
    }

    async clickNavigationItemSettings() {
        await this.page.getByTestId(this.navigationItemSettingsTestId).click();
    }

    async clickViewSecretPhrase() {
        await this.page.getByText('View Secret Phrase').click();
    }

    async clickReveal() {
        await this.page.getByRole('button', { name: 'Reveal' }).click();
    }

    async clickPasswordFieldInputGroup() {
        await this.page.getByTestId(this.passwordFieldInputGroupTestId).locator('div').first().click();
    }

    async clickPasswordField() {
        await this.page.getByTestId(this.passwordFieldTestId).click();
    }

    async clickShow() {
        await this.page.getByRole('button', { name: 'Show' }).click();
    }

    async isVisibleHideButton() {
        await this.page.isVisible('button', { name: 'Hide' });
    }

    async clickDownloadButton() {
        await this.page.getByRole(this.downloadButtonRole, { name: this.downloadButtonName }).click();
    }

    async waitForDownloadEvent() {
        return await this.page.waitForEvent('download');
    }

    async saveDownloadedFile(download: any, pathToExtension: string) {
        let secretFilePath = pathToExtension + download.suggestedFilename();
        await download.saveAs(secretFilePath);
    }
}