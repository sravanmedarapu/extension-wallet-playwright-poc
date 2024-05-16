import { OnboardingSteps } from '../steps/onboarding_steps';
import { HomePageSteps } from '../steps/home_steps';
import { SettingsPageSteps } from '../steps/settings_page_steps';
import {ManageCryptoSteps} from "./manage_crypto_steps";
import {SwapSteps} from "./swap_steps";

export class Steps {
    constructor(public page: any, public context: any, private extensionId: string) {
        this.initializeSteps()
    }
    public onboarding: OnboardingSteps;
    public home: HomePageSteps;
    public settings: SettingsPageSteps;
    public manageCrypto: ManageCryptoSteps;
    public swap: SwapSteps;

    public initializeSteps() {
      this.onboarding = new OnboardingSteps(this.page, this.context, this.extensionId);
      this.home = new HomePageSteps(this.page, this.context, this.extensionId);
      this.settings = new SettingsPageSteps(this.page, this.context,  this.extensionId);
      this.manageCrypto = new ManageCryptoSteps(this.page, this.context, this.extensionId);
      this.swap = new SwapSteps(this.page, this.context, this.extensionId);
    }
  }