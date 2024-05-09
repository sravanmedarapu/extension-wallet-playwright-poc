import { BaseSteps } from './base_steps';
import { HomePage } from '../pages/home_page';
import { expect } from 'playwright/test';

export class HomePageSteps extends BaseSteps {
  private homePage: HomePage;

  constructor(page: any) {
    super(page);
    this.homePage = new HomePage(page);
  }

  async acceptTipsPopup() {
    await this.homePage.clickOnGotIt();
    await this.homePage.clickReadyToUseTrustWallet();
  }

  async closeTipsModalPopup() {
    await this.homePage.closeTipsPopup();
  }

  async verifyBackupBannerNotVisible() {
    await expect(this.homePage.backupBanner).not.toBeVisible();
  }

  async clickOnBackUpBanner() {
    await this.homePage.clickOnBackUpBanner();
  }
}