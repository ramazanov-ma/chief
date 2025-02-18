<template>
	<div class="relative">
		<select
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
			class="w-full h-[52px] px-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors appearance-none bg-white pr-10"
		>
			<slot></slot>
		</select>
		<div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
			<font-awesome-icon icon="chevron-down" class="w-3 h-3" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps<{
	modelValue: string;
}>();

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>
