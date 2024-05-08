
import { Page } from '@playwright/test';
import path from 'path';
export class HomePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickOnBackUpBanner() {
        await this.page.getByTestId('backup-seedphrase-alert').click();
    }
}