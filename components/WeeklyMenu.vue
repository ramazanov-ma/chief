<template>
	<div class="flex flex-col gap-4 py-4">
		<MenuDayCard
			v-for="day in weekDays"
			:key="day.date"
			:date="day.date"
			:meals="day.meals"
			:state="day.state"
			:is-editable="canEditDay(day)"
			@replace-meal="(params) => handleReplaceMeal(day.date, params)"
			@regenerate="() => handleRegenerateDay(day.date)"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useWeekDates } from '@/composables/useWeekDates';
import { Complexity, DayState, Meal, MealType } from '@/types/menu';
import { useMenuStore } from '@/stores/menu';
import MenuDayCard from '@/components/weekly/MenuDayCard.vue';

interface Props {
	weekOffset: number;
	currentDate: Date;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: 'replace-meal', params: { date: string; mealId: number; newMealId: string }): void;
	(e: 'regenerate-day', date: string): void;
}>();

const menuStore = useMenuStore();
const { getWeekStartDate, isDateInPast, isToday } = useWeekDates();

const exampleMeals: Meal[] = [
	{
		id: 1,
		time: '09:00',
		type: MealType.BREAKFAST,
		name: 'Овсяная каша с ягодами',
		description: 'Питательная каша с черникой, медом и грецкими орехами',
		emoji: '🥣',
		calories: 320,
		recipe: {
			id: '1',
			name: 'Овсяная каша с ягодами',
			cookingTime: 15,
			portionCount: 1,
			complexity: Complexity.EASY,
		},
		portions: [
			{ memberName: 'Магомед', portion: 1 }
		]
	},
	{
		id: 2,
		time: '13:30',
		type: MealType.LUNCH,
		name: 'Куриный суп с лапшой',
		description: 'Легкий суп на курином бульоне с домашней лапшой и овощами',
		emoji: '🍜',
		calories: 450,
		recipe: {
			id: '2',
			name: 'Куриный суп с лапшой',
			cookingTime: 45,
			portionCount: 1,
			complexity: Complexity.HARD,
		},
		portions: [
			{ memberName: 'Магомед', portion: 1 }
		]
	},
	{
		id: 3,
		time: '16:00',
		type: MealType.SNACK,
		name: 'Творожная запеканка',
		description: 'С изюмом и ванильным соусом',
		emoji: '🧁',
		calories: 280,
		recipe: {
			id: '3',
			name: 'Творожная запеканка',
			cookingTime: 30,
			portionCount: 1,
			complexity: Complexity.HARD,
		},
		portions: [
			{ memberName: 'Магомед', portion: 1 }
		]
	},
	{
		id: 4,
		time: '19:00',
		type: MealType.DINNER,
		name: 'Стейк из лосося',
		description: 'С гарниром из киноа и свежих овощей',
		emoji: '🐟',
		calories: 520,
		recipe: {
			id: '4',
			name: 'Стейк из лосося',
			cookingTime: 25,
			portionCount: 1,
			complexity: Complexity.MEDIUM
		},
		portions: [
			{ memberName: 'Магомед', portion: 1 }
		]
	}
];

// Состояние дней недели
const weekDays = computed(() => {
	const weekStart = getWeekStartDate(props.weekOffset);
	const days = [];

	for (let i = 0; i < 7; i++) {
		const currentDay = new Date(weekStart);
		currentDay.setDate(currentDay.getDate() + i);

		// Определяем состояние дня
		let state: DayState;
		if (isDateInPast(currentDay)) {
			state = DayState.PAST;
		} else if (isToday(currentDay)) {
			state = DayState.CURRENT;
		} else {
			state = DayState.FUTURE;
		}

		days.push({
			date: currentDay.toISOString().split('T')[0],
			meals: [...exampleMeals],
			state,
		});
	}

	return days;
});

// Проверка возможности редактирования дня
const canEditDay = (day: { date: string; state: DayState }) => {
	return day.state !== DayState.PAST;
};

// Обработчик замены блюда
const handleReplaceMeal = async (date: string, params: { id: number; name: string }) => {
	const day = weekDays.value.find(d => d.date === date);
	if (!day || !canEditDay(day)) return;

	emit('replace-meal', {
		date,
		mealId: params.id,
		newMealId: '' // ID нового блюда будет определено в родительском компоненте
	});
};

// Обработчик пересоздания дня
const handleRegenerateDay = async (date: string) => {
	const day = weekDays.value.find(d => d.date === date);
	if (!day || !canEditDay(day)) return;

	emit('regenerate-day', date);
};

// Следим за изменением смещения недели или текущей даты
watch(
	[() => props.weekOffset, () => props.currentDate],
	() => {
		menuStore.fetchWeekMenu(props.weekOffset);
	},
	{ immediate: true }
);
</script>
