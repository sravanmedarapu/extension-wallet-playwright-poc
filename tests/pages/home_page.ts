
import path from 'path';
import { Locator, Page } from '@playwright/test';
export class HomePage {
    constructor(private page: Page) {}
    public backupBanner: Locator = this.page.getByTestId('backup-seedphrase-alert')
    public settingsTab: Locator = this.page.getByTestId('navigation-item-settings')
   
    async clickOnBackUpBanner() {
        await this.backupBanner.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSettingsTab() {
        await this.settingsTab.click();
    }
}