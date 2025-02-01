<!-- pages/index.vue -->
<template>
	<div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
		<div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
			<h1 class="text-3xl font-bold text-gray-800 mb-6">
				Добро пожаловать в Chief!
			</h1>
			<div class="space-y-4">
				<p class="text-gray-600">
					Ваш персональный помощник в планировании питания
				</p>

				<button
					@click="resetOnboarding"
					class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					Пройти онбординг заново
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '@/stores/onboarding';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const resetOnboarding = () => {
	onboardingStore.resetOnboarding();
	router.push('/onboarding');
};

definePageMeta({
	middleware: ['onboarding']
});
</script>
