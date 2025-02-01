import { defineStore } from 'pinia';
import { FORM_STEPS } from '@/constants/steps';

export const useOnboardingStore = defineStore('onboarding', {
	state: () => ({
		isCompleted: process.client ? localStorage.getItem(FORM_STEPS.ONBOARDING_COMPLETED_KEY) === 'true' : false
	}),

	actions: {
		completeOnboarding() {
			this.isCompleted = true;

			if (process.client) {
				localStorage.setItem(FORM_STEPS.ONBOARDING_COMPLETED_KEY, 'true');
			}
		},

		resetOnboarding() {
			this.isCompleted = false;
			if (process.client) {
				localStorage.removeItem(FORM_STEPS.FORM_PROGRESS_KEY);
				localStorage.removeItem(FORM_STEPS.ONBOARDING_COMPLETED_KEY);
			}
		}
	}
});
