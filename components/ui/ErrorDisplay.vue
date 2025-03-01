<template>
	<div :class="[
    'flex items-start p-4 rounded-lg my-3',
    typeClasses
  ]">
		<div v-if="showIcon" class="flex-shrink-0 mr-3">
			<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
				<path v-if="type === 'error'"
					  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
				<path v-else-if="type === 'warning'"
					  d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
				<path v-else
					  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
			</svg>
		</div>

		<div class="flex-1">
			<h4 v-if="title" class="m-0 mb-2 font-semibold">{{ title }}</h4>
			<p class="m-0 text-sm">{{ message }}</p>
			<button v-if="retry"
					@click="$emit('retry')"
					class="mt-2 px-3 py-1.5 text-xs rounded border bg-transparent hover:bg-opacity-5 transition-colors duration-200"
					:class="buttonClasses">
				Попробовать снова
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	type: {
		type: String,
		default: 'error',
		validator: (value: string) => ['error', 'warning', 'info'].includes(value)
	},
	title: {
		type: String,
		default: ''
	},
	message: {
		type: String,
		required: true
	},
	showIcon: {
		type: Boolean,
		default: true
	},
	retry: {
		type: Boolean,
		default: false
	}
})

// Классы для типа ошибки
const typeClasses = computed(() => {
	switch (props.type) {
		case 'error':
			return 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
		case 'warning':
			return 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400';
		case 'info':
			return 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400';
		default:
			return 'bg-gray-50 border border-gray-200 text-gray-700 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-300';
	}
})

// Классы для кнопки "Попробовать снова"
const buttonClasses = computed(() => {
	switch (props.type) {
		case 'error':
			return 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400';
		case 'warning':
			return 'border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400';
		case 'info':
			return 'border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400';
		default:
			return 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300';
	}
})

defineEmits(['retry'])
</script>
