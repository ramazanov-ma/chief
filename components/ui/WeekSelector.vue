<template>
	<div class="pt-4 flex justify-center items-center">
		<div
			class="flex items-center text-sm px-4 py-1 font-normal rounded-full transition-colors cursor-pointer"
			:class="weekStatusClass"
		>
			{{ label }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	label: string;
}>();

const weekStatusClass = computed(() => {
	if (props.label.includes('назад') || props.label.includes('Прошлая')) {
		return 'bg-red-50 text-red-600 hover:bg-red-100';
	} else if (props.label.includes('Через') || props.label.includes('Следующая')) {
		return 'bg-green-50 text-green-600 hover:bg-green-100';
	}
	return 'bg-blue-50 text-blue-600 hover:bg-blue-100';
});
</script>
