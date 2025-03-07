﻿<template>
	<div class="flex justify-between mt-8">
		<!-- Back button -->
		<BaseButton
			v-if="currentStep > 1"
			variant="secondary"
			@click="$emit('prev')"
		>
			Назад
		</BaseButton>

		<!-- Next/Finish button -->
		<BaseButton
			v-if="currentStep <= totalSteps"
			class="ml-auto"
			:disabled="!isStepValid"
			:variant="isStepValid ? 'primary' : 'secondary'"
			:class="[!isStepValid && 'opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 from-gray-400 to-gray-400']"
			@click="next"
			size="lg"
		>
			{{ isLastStep ? 'Завершить' : 'Далее' }}
		</BaseButton>

		<ProcessingAnimation
			v-if="isFormCompleted"
			@complete="onOnboardingCompleted"/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import ProcessingAnimation from '@/components/onboarding/ProcessingAnimation.vue';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '@/stores/onboarding';

interface Props {
	currentStep: number;
	totalSteps: number;
	isStepValid: boolean;
}

const props = defineProps<Props>();
const isFormCompleted = ref(false);
const router = useRouter();
const onboardingStore = useOnboardingStore();

const emit = defineEmits<{
	(e: 'next'): void;
	(e: 'prev'): void;
}>();

const isLastStep = computed(() =>
	props.currentStep === props.totalSteps
);

const next = (): void => {
	if (isLastStep.value) {
		isFormCompleted.value = true;
	} else {
		emit('next');
	}
};

const onOnboardingCompleted = (): void => {
	onboardingStore.completeOnboarding();
	router.push('/');
};
</script>
