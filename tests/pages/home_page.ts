
import path from 'path';
import { Locator, Page } from '@playwright/test';
export class HomePage {
    constructor(private page: Page) {}
    public backupBanner: Locator = this.page.getByTestId('backup-seedphrase-alert')
    public settingsTab: Locator = this.page.getByTestId('navigation-item-settings')
   
    private readonly gotItBytton = this.page.getByRole('button', { name: 'Got it' });
    private readonly readyToUseWalletButton = this.page.getByRole('button', { name: 'I’m ready to use Trust Wallet' });
    private readonly closeTipsModelPopup = this.page.getByTestId('close-modal-button');

    async clickOnGotIt() {
        await this.gotItBytton.click();
    }
    async clickReadyToUseTrustWallet() {
        await this.readyToUseWalletButton.click();
    }
    async clickOnBackUpBanner() {
        await this.backupBanner.click();
        await this.page.waitForTimeout(1000);
    }
    async clickSettingsTab() {
        await this.settingsTab.click();
    }

    async closeTipsPopup() {
        await this.closeTipsModelPopup.click();
      }
}