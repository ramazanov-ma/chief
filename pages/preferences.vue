<!-- pages/preferences.vue -->
<template>
	<div class="p-4">
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-gray-900 mb-2">Настройки</h1>
			<p class="text-gray-600">Настройте приложение под себя</p>
		</div>

		<div class="space-y-4">
			<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
				<h3 class="text-gray-900 font-medium mb-4">Предпочтения в еде</h3>
				<!-- Здесь содержимое настроек -->
			</div>

			<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
				<h3 class="text-gray-900 font-medium mb-4">Настройки меню</h3>
				<!-- Настройки для генерации меню -->
			</div>

			<button
				@click="resetOnboarding"
				class="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-left text-gray-900 hover:bg-gray-50 transition-colors"
			>
				Пройти онбординг заново
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '~/stores/onboarding'

const router = useRouter()
const onboardingStore = useOnboardingStore()

const resetOnboarding = () => {
	onboardingStore.resetOnboarding()
	router.push('/onboarding')
}
</script>
