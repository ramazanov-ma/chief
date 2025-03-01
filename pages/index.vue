<template>
	<div class="flex flex-col">
		<AppHeader/>
		<main class="flex-1">
			<div class="flex flex-col gap-4 pb-4">
				<NextFamilyMealSection
					:meal="nextMeal"
					:is-single-user="isSingleUser"
				/>

				<WelcomeSection
					:family="family"
					:current-menu="currentMenu"
				/>

				<!--				<ShoppingSection-->
				<!--					:shopping-list="shoppingList"-->
				<!--					:is-single-user="isSingleUser"-->
				<!--				/>-->

				<PlanningSection
					:stats="planningStats"
					:is-single-user="isSingleUser"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import WelcomeSection from '@/components/home/WelcomeSection.vue';
import NextFamilyMealSection from '@/components/home/NextFamilyMealSection.vue';
import PlanningSection from '@/components/home/PlanningSection.vue';
import { Complexity, Meal, MealType } from "@/types/menu";

definePageMeta({
	middleware: ['onboarding']
});

interface PlanningStatsType {
	budget: {
		planned: number;
		actual: number;
		currency: string;
	};
	preferences: {
		total: number;
		matched: number;
	};
	variety: {
		uniqueDishes: number;
		cuisineTypes: string[];
	};
}

// Состояние семьи
const family = ref([{
	id: 1,
	name: 'Магомед',
	preferences: {
		allergies: [],
		dislikes: []
	}
}]);

// Вычисляемое свойство для определения одиночного пользователя
const isSingleUser = computed(() => family.value.length === 1);

// Текущее меню
const currentMenu = ref({
	weekProgress: 60,
	daysPlanned: 4,
	totalDays: 7,
	nextPlanningDate: '2025-02-23'
});

// Следующий прием пищи
const nextMeal = ref({
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
} as Meal);

// Список покупок
// const shoppingList = ref({
// 	totalItems: 15,
// 	purchasedItems: 8,
// 	nearestShoppingDate: '2025-02-21',
// 	categories: [
// 		{
// 			name: 'Овощи и фрукты',
// 			items: [
// 				{ id: 1, name: 'Помидоры', quantity: 500, unit: 'г', purchased: false },
// 				{ id: 2, name: 'Огурцы', quantity: 300, unit: 'г', purchased: true },
// 				{ id: 3, name: 'Яблоки', quantity: 1, unit: 'кг', purchased: false }
// 			]
// 		},
// 		{
// 			name: 'Молочные продукты',
// 			items: [
// 				{ id: 4, name: 'Молоко', quantity: 1, unit: 'л', purchased: true },
// 				{ id: 5, name: 'Сыр', quantity: 300, unit: 'г', purchased: false }
// 			]
// 		}
// 	]
// });

// Статистика планирования
const planningStats = ref<PlanningStatsType>({
	budget: {
		planned: 5000,
		actual: 3200,
		currency: '₽'
	},
	preferences: {
		total: 5,
		matched: 4
	},
	variety: {
		uniqueDishes: 12,
		cuisineTypes: ['Итальянская', 'Русская', 'Азиатская']
	}
});
</script>

<style scoped>
.space-y-6 > * + * {
	margin-top: 1.5rem;
}

@media (min-width: 640px) {
	.space-y-6 > * + * {
		margin-top: 2rem;
	}
}
</style>
