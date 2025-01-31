<template>
	<div class="flex justify-between mt-8">
		<!-- Back button -->
		<BaseButton
			v-if="showBackButton"
			variant="secondary"
			@click="$emit('prev')"
		>
			Назад
		</BaseButton>

		<!-- Next/Finish button -->
		<BaseButton
			:class="{ 'ml-auto': showBackButton }"
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
	showBackButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	showBackButton: true
});

// Check if current step is the last one
const isLastStep = computed(() =>
	props.currentStep === props.totalSteps
);

// Define available events
defineEmits<{
	(e: 'next'): void;
	(e: 'prev'): void;
}>();
</script>
