<template>
	<div class="flex flex-col">
		<span class="text-xl font-medium capitalize">
			{{ day.name }}
		</span>
		<span
			class="text-sm"
			:class="[
				day.state === DayState.PAST ? 'text-slate-400' : 'text-slate-500',
				day.isToday ? 'text-blue-500' : ''
			]"
		>
			{{ day.formattedDate }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { DayState } from '@/types/menu';

interface DayProps {
	name: string;
	formattedDate: string;
	isToday: boolean;
	state: DayState;
}

defineProps<{
	day: DayProps;
}>();
</script>
