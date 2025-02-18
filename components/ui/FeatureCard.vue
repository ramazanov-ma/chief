<template>
	<div class="flex items-start text-gray-600 group">
		<div
			class="mr-3 p-2.5 rounded-lg transition-colors duration-300"
			:class="[`bg-${color}-50`, `group-hover:bg-${color}-100`]"
		>
			<font-awesome-icon
				:icon="icon"
				class="h-5 w-5"
				:class="`text-${color}-500`"
			/>
		</div>
		<div class="text-left">
			<span class="text-sm font-medium block">{{ title }}</span>
			<span class="text-sm text-gray-500">{{ subtitle }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
	icon: string;
	title: string;
	subtitle: string;
	color: 'blue' | 'pink' | 'purple';
}

defineProps<Props>();
</script>
