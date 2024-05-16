import {Page, Locator, BrowserContext} from '@playwright/test';

export class BaseSteps {
    constructor(protected page: Page, protected browserContext: BrowserContext, protected extensionId: string) {}
    public settingsTab: Locator = this.page.getByTestId('navigation-item-settings')
    public homeTab: Locator = this.page.getByTestId('navigation-item-home')
   

    async goToOnboarding() {
        await this.page.goto(`chrome-extension://${this.extensionId}/home.html#/onboarding`);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByTestId('onboarding-step-title').waitFor({state: 'visible'});
        // Find the extension tab and close it
        // let pages = await context.pages();
        // for (let pageId of pages) {
        //     if (this.page != pageId) {
        //     await pageId.close();
        //     }
        // }
    }
    
    async navigateToSettings() {
        await this.settingsTab.click();
    }

    async navigateToHome() {
        await this.homeTab.click();
    }
}