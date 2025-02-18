<template>
	<button
		:class="['px-6 py-3 rounded-xl transition-all duration-200 ' + classList,
			variant === 'primary'
				? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity'
				: 'text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors',
		]"
		v-bind="$attrs"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
interface Props {
	variant?: 'primary' | 'secondary';
	classList?: string;
}

withDefaults(defineProps<Props>(), {
	variant: 'primary',
});
</script>
