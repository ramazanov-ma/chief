<template>
	<div
		class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 relative"
	>
		<font-awesome-icon :icon="icon" class="mr-2 animate-bounce"/>
		<span class="text-sm font-medium">
			<slot/>
		</span>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
	icon: string;
}

defineProps<Props>();
</script>
