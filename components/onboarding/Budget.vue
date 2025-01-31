<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="wallet">Бюджет на продукты</TitleSection>
			<p class="mt-2 text-gray-600 text-sm text-center">Какой бюджет вы планируете выделить на продукты в
				неделю?</p>
		</div>

		<div class="max-w-md mx-auto space-y-4">
			<div class="flex justify-between text-sm text-gray-600">
				<span>1 000 ₽</span>
				<span>30 000 ₽</span>
			</div>

			<input
				type="range"
				class="slider"
				:min="0"
				:max="100"
				:step="1"
				:value="sliderValue"
				@input="updateValue($event)"
			/>

			<div class="text-center font-medium text-blue-600 text-lg">
				{{ formatBudget(modelValue.budget) }} ₽
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, onMounted, watch } from 'vue';
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: FormData): void;
}>();

const sliderValue = computed(() => {
	const budget = props.modelValue.budget;
	if (budget <= 5000) {
		return (budget / 5000) * 50;
	} else {
		const remaining = budget - 5000;
		const percentage = remaining / 25000;
		return 50 + (percentage * 50);
	}
});

const sliderToBudget = (value: number): number => {
	if (value <= 50) {
		return Math.round((value / 50) * 5000 / 100) * 100;
	} else {
		const percentage = (value - 50) / 50;
		const remaining = percentage * 25000;
		return Math.round((5000 + remaining) / 500) * 500;
	}
};

const formatBudget = (value: number) => {
	return new Intl.NumberFormat('ru-RU').format(value);
};

const updateSliderProgress = (value: number) => {
	const slider = document.querySelector('.slider') as HTMLElement;
	if (slider) {
		slider.style.setProperty('--slider-progress', `${ value }%`);
	}
};

const updateValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	updateSliderProgress(value);
	const budget = sliderToBudget(value);
	emit('update:modelValue', { ...props.modelValue, budget });
};

onMounted(() => {
	updateSliderProgress(sliderValue.value);
});

watch(sliderValue, (newValue) => {
	updateSliderProgress(newValue);
});
</script>

<style scoped>
.slider {
	-webkit-appearance: none;
	appearance: none;
	width: 100%;
	height: 8px;
	border-radius: 4px;
	background: #E5E7EB; /* серый фон */
	outline: none;
	position: relative;
}

.slider {
	background: linear-gradient(to right, #3B82F6 0%, #3B82F6 var(--slider-progress, 0%), #E5E7EB var(--slider-progress, 0%), #E5E7EB 100%);
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #3B82F6;
	cursor: pointer;
	border: 4px solid white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
	transform: scale(1.1);
}

.slider::-moz-range-thumb {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #3B82F6;
	cursor: pointer;
	border: 4px solid white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
	transform: scale(1.1);
}

.slider::-moz-range-track {
	background: transparent;
}

.slider:focus {
	outline: none;
}

.slider:focus::-webkit-slider-thumb {
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.slider:focus::-moz-range-thumb {
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>
