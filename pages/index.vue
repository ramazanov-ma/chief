<!-- pages/index.vue -->
<template>
	<div>
		<!-- Заголовок с приветствием -->
		<div class="px-4 py-6 bg-white sticky top-0 z-10">
			<div class="flex items-center justify-between mb-1">
				<h1 class="text-2xl font-semibold text-gray-900">
					Меню на неделю
				</h1>
				<button
					class="px-6 py-3 rounded-xl transition-all duration-200 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 ml-auto"
					@click="regenerateMenu"
				>
					Пересоздать меню
				</button>
			</div>
			<p class="text-gray-500 text-sm">{{ currentWeekRange }}</p>
		</div>

		<!-- Меню на неделю -->
		<div class="p-4 space-y-6">
			<div
				v-for="day in weekMenu"
				:key="day.date"
				class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
			>
				<!-- Заголовок дня -->
				<div class="flex items-center justify-between mb-4">
					<div>
						<h2 class="text-lg font-medium text-gray-900">{{ day.name }}</h2>
						<p class="text-sm text-gray-500">{{ day.date }}</p>
					</div>
					<div class="text-sm text-gray-500">
						{{ day.totalCalories }} ккал
					</div>
				</div>

				<!-- Приемы пищи -->
				<div class="space-y-4">
					<div
						v-for="meal in day.meals"
						:key="meal.id"
						class="relative group"
					>
						<!-- Линия времени -->
						<div class="absolute left-[1.65rem] top-0 bottom-0 w-px bg-gray-100 -z-10"></div>

						<div class="flex items-start space-x-3">
							<!-- Время и иконка -->
							<div class="flex flex-col items-center w-14">
								<span class="text-base font-medium text-gray-900">{{ meal.time }}</span>
								<div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mt-1">
									<span class="text-xl">{{ meal.emoji }}</span>
								</div>
							</div>

							<!-- Информация о блюде -->
							<div class="flex-1 min-w-0">
								<div class="bg-gray-50 rounded-xl p-3 group-hover:bg-gray-100 transition-colors">
									<div class="flex items-start justify-between space-x-2">
										<h3 class="text-base font-medium text-gray-900 truncate">{{ meal.name }}</h3>
									</div>

									<p class="text-sm text-gray-600 mt-0.5 mb-2">{{ meal.description }}</p>

									<div class="flex items-center flex-wrap gap-4">
    <span class="text-sm font-medium text-gray-700">
      🔥 {{ meal.calories }} ккал
    </span>
										<span class="text-sm font-medium text-gray-700">
      ⏱️ {{ meal.cookingTime }} мин
    </span>

										<div class="flex items-center gap-4 ml-auto">
											<button
												class="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
												@click="replaceMeal(day.date, meal.id)"
											>
												Заменить
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
