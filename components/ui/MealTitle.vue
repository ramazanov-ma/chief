<template>
	<h3 class="text-base font-medium text-gray-900 truncate">{{ title }}</h3>
</template>

<script setup lang="ts">
interface Props {
	title: string;
}

defineProps<Props>();
</script>
