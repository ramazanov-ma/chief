<template>
	<div>
		<AppHeader />
		<WeeklySelector
			title="Меню недели"
			:is-past-week="isPastWeek"
			@week-change="handleWeekChange"
		/>
		<WeeklyMenu
			:week-offset="currentWeekOffset"
			:current-date="currentDate"
			@replace-meal="handleReplaceMeal"
			@regenerate-day="handleRegenerateDay"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWeekDates } from '@/composables/useWeekDates';
import WeeklySelector from '@/components/weekly/WeeklySelector.vue';

definePageMeta({
	middleware: ['onboarding']
});

const currentWeekOffset = ref(0);
const currentDate = ref(new Date());

// Получаем даты недели на основе смещения
const { getWeekStartDate } = useWeekDates();

// Определяем, является ли выбранная неделя прошедшей
const isPastWeek = computed(() => {
	const weekStartDate = getWeekStartDate(currentWeekOffset.value);
	return weekStartDate < new Date();
});

const handleWeekChange = (offset: number) => {
	currentWeekOffset.value = offset;
};

// Обработчик замены блюда
const handleReplaceMeal = async (params: {
	date: string,
	mealId: string,
	newMealId: string
}) => {
	// Здесь будет логика замены блюда
	// Можно вызвать store или API напрямую
};

// Обработчик пересоздания дня
const handleRegenerateDay = async (date: string) => {
	// Здесь будет логика пересоздания дня
	// Можно вызвать store или API напрямую
};
</script>
