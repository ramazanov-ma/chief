<template>
	<button
		:class="
		['px-6 py-3 rounded-xl transition-all duration-200',
			variant === 'primary'
				? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity'
				: 'text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors'
		]"
		v-bind="$attrs"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
interface Props {
	variant?: 'primary' | 'secondary';
}

withDefaults(defineProps<Props>(), {
	variant: 'primary',
});
</script>
