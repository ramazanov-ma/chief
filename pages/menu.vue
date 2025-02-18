<template>
	<div>
		<AppHeader />
		<WeeklySelector
			title="Меню недели"
			@week-change="handleWeekChange"
		/>
		<WeeklyMenu :week-offset="currentWeekOffset" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WeeklySelector from '@/components/weekly/WeeklySelector.vue';

const currentWeekOffset = ref(0);

const handleWeekChange = (offset: number) => {
	currentWeekOffset.value = offset;
};
</script>
