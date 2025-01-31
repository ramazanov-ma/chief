<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="clock">Время на готовку</TitleSection>
			<p class="mt-2 text-gray-600 text-sm text-center">Сколько времени вы готовы тратить на приготовление одного блюда?</p>
		</div>

		<div class="max-w-md mx-auto space-y-4">
			<div class="flex justify-between text-sm text-gray-600">
				<span>15 мин</span>
				<span>120 мин</span>
			</div>

			<input
				type="range"
				class="slider"
				:min="15"
				:max="120"
				:step="5"
				:value="modelValue.cookingTime"
				@input="updateValue($event)"
			/>

			<div class="text-center font-medium text-blue-600 text-lg">
				до {{ formatTime(modelValue.cookingTime) }}
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
	return props.modelValue.cookingTime;
});

const updateSliderProgress = (value: number) => {
	const slider = document.querySelector('.slider') as HTMLElement;
	if (slider) {
		const percentage = ((value - 15) / (120 - 15)) * 100;
		slider.style.setProperty('--slider-progress', `${ percentage }%`);
	}
};

const formatTime = (minutes: number) => {
	if (minutes < 60) {
		return `${ minutes } минут`;
	}
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (remainingMinutes === 0) {
		return `${ minutes } минут (${ hours } ${ hours === 1 ? 'час' : 'часа' })`;
	}

	return `${ minutes } минут (${ hours } ${ hours === 1 ? 'час' : 'часа' } ${ remainingMinutes } минут)`;
};

const updateValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	updateSliderProgress(value);
	emit('update:modelValue', { ...props.modelValue, cookingTime: value });
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
	background: #E5E7EB;
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
