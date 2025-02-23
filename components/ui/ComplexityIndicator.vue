<template>
	<div class="flex items-center gap-2">
		<font-awesome-icon
			icon="chart-simple"
			class="text-green-500 w-4 h-4"
		/>
		<div class="text-sm text-gray-700">
			<span :class="textClass">Сложность:</span>
		</div>
		<div class="flex gap-1">
			<div
				v-for="n in 3"
				:key="n"
				class="w-2 h-2 rounded-full"
				:class="n <= complexity ? 'bg-green-500' : 'bg-slate-200'"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Complexity } from '@/types/menu';

interface ComplexityProps {
	complexity: Complexity;
	textClass?: string;
}

defineProps<ComplexityProps>();
</script>
