import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useOnboardingStore } from '@/stores/onboarding';

export default defineNuxtRouteMiddleware((to) => {
	if (process.client) {
		const onboardingStore = useOnboardingStore();

		if (to.path === '/onboarding' && onboardingStore.isCompleted) {
			return navigateTo('/');
		}

		if (!onboardingStore.isCompleted && to.path !== '/onboarding') {
			return navigateTo('/onboarding');
		}
	}
});
