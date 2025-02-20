<template>
	<span class="inline-flex items-center space-x-1 text-sm font-medium text-gray-700">
		<span class="text-lg">🔥</span>
		<span>{{ formattedCalories }} ккал</span>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	calories: number;
	formatOptions?: Intl.NumberFormatOptions;
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	formatOptions: () => ({
		maximumFractionDigits: 0,
		minimumFractionDigits: 0
	})
});

const formattedCalories = computed(() => {
	return new Intl.NumberFormat('ru-RU', props.formatOptions).format(props.calories);
});
</script>
