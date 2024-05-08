// onboarding_page.ts
import { Page } from '@playwright/test';
import path from 'path';
export class SettingsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillPasswordField(password: string) {
        await this.page.getByTestId('password-field').fill(password);
    }

    async clickViewSecretPhrase() {
        await this.page.getByText('View Secret Phrase').click();
    }

    async clickReveal() {
        await this.page.getByRole('button', { name: 'Reveal' }).click();
    }
    async clickShowButton() {
        await this.page.getByRole('button', { name: 'Show' }).click();
    }

    async clickSubmitButton() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
    async clickProceedButton() {
        await this.page.getByRole('button', { name: 'Proceed' }).click();
    }

    async clickDownloadButton() {
        await this.page.getByRole('button', { name: 'Download' }).click();
    }

    async waitForDownloadEvent() {
        return await this.page.waitForEvent('download');
    }

    async saveDownloadedFile(download: any, pathToExtension: string) {
        let secretFilePath = pathToExtension + download.suggestedFilename();
        await download.saveAs(secretFilePath);
    }

    async downloadSecretPhrase(): Promise<string> {
        const downloadPromise = this.waitForDownloadEvent();
        await this.clickDownloadButton();
        const download = await downloadPromise;

        const pathToExtension = path.join(__dirname, '../downloads/')
        let secretFilePath = pathToExtension + download.suggestedFilename()
        // Wait for the download process to complete and save the downloaded file somewhere.
        await download.saveAs(secretFilePath);
        return secretFilePath;
    }

    async closeModal() {
        await this.page.getByTestId('close-modal-button').click();
    }

    async clickHomeItem() {
        await this.page.getByTestId('navigation-item-home').click();
    }

    async backUpWalletByEnteringSecretPhrase(password: string, secretPhrase: string[]) {
        await this.clickShowButton();
        await this.fillPasswordField(password);
        await this.clickSubmitButton();
        await this.clickProceedButton();
        await this.clickValidSecretPhraseButtons(secretPhrase);
        await this.clickNextButton();
    }


    async clickValidSecretPhraseButtons(secretPhrase: string[]) {
        for (let i = 0; i < secretPhrase.length; i++) {
            await this.page.click(`button:text("${secretPhrase[i]}"):not([disabled])`);
        }
    }

    async clickNextButton() {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
}

