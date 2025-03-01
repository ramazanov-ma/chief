<template>
	<div class="relative inline-block">
<!--		@change="$emit('update:modelValue', $event.target.checked)"-->
		<input
			type="checkbox"
			:checked="modelValue"
			class=" peer absolute w-5 h-5 opacity-0 cursor-pointer"
		/>
		<div
			class="w-5 h-5 border-2 rounded-md border-slate-300 bg-white peer-checked:border-yellow-500 peer-checked:bg-yellow-500 transition-all duration-200 flex items-center justify-center peer-hover:border-yellow-400"
		>
			<font-awesome-icon
				icon="check"
				class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps<{
	modelValue: boolean;
}>();

defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();
</script>
