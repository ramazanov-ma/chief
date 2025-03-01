import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useOnboardingStore } from '@/stores/onboarding';

export default defineNuxtRouteMiddleware((to) => {
	if (!process.client) {
		return;
	}

	const onboardingStore = useOnboardingStore();

	if (to.path !== '/onboarding' && !onboardingStore.isCompleted) {
		return navigateTo('/onboarding');
	}

	if (to.path === '/onboarding' && onboardingStore.isCompleted) {
		return navigateTo('/');
	}

	return;
});
