<!-- pages/index.vue -->
<template>
	<AppHeader/>
	<WeeklyMenu/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Meal {
	id: number;
	time: string;
	emoji: string;
	name: string;
	description: string;
	calories: number;
	cookingTime: number;
}

interface DayMenu {
	date: string;
	name: string;
	totalCalories: number;
	meals: Meal[];
}

// Пример данных меню на неделю
const weekMenu = ref<DayMenu[]>([
	{
		date: '1 февраля',
		name: 'Понедельник',
		totalCalories: 1850,
		meals: [
			{
				id: 1,
				time: '09:00',
				emoji: '🍳',
				name: 'Омлет с авокадо',
				description: 'Пышный омлет с авокадо и цельнозерновым тостом',
				calories: 450,
				cookingTime: 15
			},
			{
				id: 2,
				time: '13:00',
				emoji: '🥗',
				name: 'Киноа боул с тунцом',
				description: 'Боул с киноа, тунцом и свежими овощами',
				calories: 650,
				cookingTime: 20
			},
			{
				id: 3,
				time: '19:00',
				emoji: '🐟',
				name: 'Запеченный лосось',
				description: 'Филе лосося с овощами и диким рисом',
				calories: 750,
				cookingTime: 30
			}
		]
	},
	// Добавьте аналогичные объекты для остальных дней недели
]);

const currentWeekRange = computed(() => {
	// Здесь логика форматирования текущей недели
	return '1 - 7 февраля 2024';
});

const regenerateMenu = () => {
	// Здесь логика пересоздания меню
	console.log('Пересоздание меню...');
};

const replaceMeal = (date: string, mealId: number) => {
	// Здесь логика замены блюда
	console.log('Замена блюда:', date, mealId);
};

const showRecipe = (meal: Meal) => {
	// Здесь логика показа рецепта
	console.log('Показ рецепта:', meal.name);
};
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
	transition-delay: 50ms;
}

@media (hover: none) {
	.group-hover\:opacity-100 {
		opacity: 1 !important;
	}
}

/* Добавляем стили для активных состояний кнопок */
button:active {
	transform: scale(0.98);
}
</style>
