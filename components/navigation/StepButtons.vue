<template>
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
			@click="$emit('next')"
		>
			{{ isLastStep ? 'Завершить' : 'Далее' }}
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '../ui/BaseButton.vue';

interface Props {
	currentStep: number;
	totalSteps: number;
	isStepValid: boolean;
}

const props = defineProps<Props>();

defineEmits<{
	(e: 'next'): void;
	(e: 'prev'): void;
}>();

const isLastStep = computed(() =>
	props.currentStep === props.totalSteps
);
</script>
