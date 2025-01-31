<template>
	<div class="space-y-2">
		<label
			:for="id"
			class="block text-base font-medium text-gray-700"
		>
			{{ label }}
		</label>
		<input
			:id="id"
			:value="modelValue"
			@input="handleInput"
			:type="type"
			class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
			:placeholder="placeholder"
			autocomplete="off"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	modelValue: string | number | null | undefined;
	label: string;
	id: string;
	placeholder?: string;
	type: 'text' | 'number';
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string | number | null | undefined];
}>();

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const value = props.type === 'number'
		? target.value ? Number(target.value) : null
		: target.value;
	emit('update:modelValue', value);
};
</script>
