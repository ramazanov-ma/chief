<template>
	<h2 class="text-2xl font-semibold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
		<font-awesome-icon
			:icon="icon"
			class="mr-3 h-6 w-6 text-blue-500"
		/>
		<slot></slot>
	</h2>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
	icon: string;
}

defineProps<Props>();
</script>
