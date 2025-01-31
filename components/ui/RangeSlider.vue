<!-- components/ui/RangeSlider.vue -->
<template>
	<div class="relative">
		<input
			type="range"
			:value="modelValue"
			@input="handleInput"
			:min="min"
			:max="max"
			:step="step"
			class="relative z-10 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
		/>
		<div class="absolute inset-0 h-2 bg-gray-200 rounded-lg"></div>
		<div
			class="absolute left-0 h-2 bg-blue-500 rounded-lg transition-all"
			:style="{ width: progressWidth }"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	modelValue: number;
	min: number;
	max: number;
	step: number;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void;
}>();

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', Number(target.value));
};

const progressWidth = computed(() => {
	const progress = ((props.modelValue - props.min) / (props.max - props.min)) * 100;
	return `${progress}%`;
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
	@apply appearance-none w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow
	cursor-pointer transition-transform hover:scale-110;
}

input[type="range"]::-moz-range-thumb {
	@apply w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow
	cursor-pointer transition-transform hover:scale-110;
}

input[type="range"]::-webkit-slider-runnable-track {
	@apply appearance-none bg-transparent;
}

input[type="range"]::-moz-range-track {
	@apply bg-transparent;
}
</style>
