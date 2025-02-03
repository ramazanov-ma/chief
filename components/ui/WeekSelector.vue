<template>
	<div class="pt-4 flex justify-center items-center">
		<div
			class="flex items-center text-sm px-4 py-1 bg-blue-50 text-blue-600 font-normal rounded-full
             hover:bg-blue-100 transition-colors cursor-pointer"
		>
			<font-awesome-icon
				icon="calendar-check"
				class="mr-1.5"
			/>
			{{ label }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
	label: string;
}

defineProps<Props>();
</script>
