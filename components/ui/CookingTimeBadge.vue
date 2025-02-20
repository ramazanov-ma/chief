<template>
	<span class="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
		<span class="text-lg">⏱️</span>
		<span>{{ formattedTime }}</span>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	time: number;
}

const props = defineProps<Props>();

const formattedTime = computed(() => {
	return `${props.time} мин`;
});
</script>
