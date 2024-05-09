import { OnboardingSteps } from '../steps/onboarding_steps';
import { HomePageSteps } from '../steps/home_steps';
import { SettingsPageSteps } from '../steps/settings_page_steps';

export class Steps {
    static onboarding: OnboardingSteps;
    static home: HomePageSteps;
    static settings: SettingsPageSteps;
  
    static initializeSteps(page: any) {
      this.onboarding = new OnboardingSteps(page);
      this.home = new HomePageSteps(page);
      this.settings = new SettingsPageSteps(page);
    }
  }