import { OnboardingPage } from '../pages/onboarding_page';
import { SettingsPage } from '../pages/settings_page';
import { HomePage } from '../pages/home_page';
import { BrowserContext, expect } from 'playwright/test';
import { BaseSteps } from './base_steps';

export class OnboardingSteps extends BaseSteps {
  private onboardingPage: OnboardingPage;

  constructor(page: any) {
    super(page);
    this.onboardingPage = new OnboardingPage(page);
  }

  async verifyOnboardingPage() {
    await expect(this.onboardingPage.onBoardingPageTitle).toHaveText("Welcome to the Trust Wallet Extension");
    await expect(this.onboardingPage.createNewWalletButton).toBeVisible();
    await expect(this.onboardingPage.importOrRecoverWalletButton).toBeVisible();
    await expect(this.onboardingPage.ledgerButton).toBeVisible();
  }


async createNewWallet({ password, agreeToShareData: shareData, agreeToSetTrustWalletAsDefault: setTrustWalletAsDefault }: 
    { password: string, agreeToShareData: boolean , agreeToSetTrustWalletAsDefault: boolean}) {
    await this.onboardingPage.clickCreateNewWalletButton();
    await this.onboardingPage.fillePasswordScreen(password);
    await this.setShareDatePermissions(shareData);
    await this.setTrustWalletAsDefaultWallet(setTrustWalletAsDefault)
    await this.onboardingPage.clickOpenWallet();
}

  async toggleOffTrustWalletAsDefault() {
    await expect(this.onboardingPage.trustSetAsDefaultWalletToggle).toBeChecked();
    await this.onboardingPage.toggleTrustWalletAsDefault();
    await expect(this.onboardingPage.trustSetAsDefaultWalletToggle).not.toBeChecked();
  }

  async setShareDatePermissions(shareData: boolean) {
    if (shareData) {
      await this.onboardingPage.clickShareDataButton();
    } else {
      await this.onboardingPage.clickNoThankyouButton();
    }
  }

  async setTrustWalletAsDefaultWallet(agreeToSetTrustWalletAsDefault: boolean) {
    if (!agreeToSetTrustWalletAsDefault) {
      await this.onboardingPage.toggleTrustWalletAsDefault();
    }
  }
}