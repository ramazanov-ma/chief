<template>
	<p class="text-sm text-gray-600 mt-1 mb-3">{{ description }}</p>
</template>

<script setup lang="ts">
interface Props {
	description: string;
}

defineProps<Props>();
</script>
