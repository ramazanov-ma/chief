<template>
	<div class="mb-6">
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm text-gray-600">Шаг {{ currentStep }} из {{ totalSteps }}</span>
			<span class="text-sm text-gray-600">{{ progressPercentage }}%</span>
		</div>
		<div class="h-2 bg-gray-200 rounded-full">
			<div
				class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
				:style="{ width: `${progressPercentage}%` }"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Props {
	currentStep: number;
	totalSteps: number;
}

const props = defineProps<Props>();

const progressPercentage = computed(() =>
	Math.round((props.currentStep / props.totalSteps) * 100)
);
</script>
