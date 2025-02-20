<template>
	<div class="flex flex-col">
		<AppHeader/>
		<main class="flex-1">
			<div class="flex flex-col gap-4">
				<WelcomeSection
					:family="family"
					:current-menu="currentMenu"
				/>

				<NextFamilyMealSection
					:meal="nextMeal"
					:is-single-user="isSingleUser"
				/>

				<ShoppingSection
					:shopping-list="shoppingList"
					:is-single-user="isSingleUser"
				/>

				<PlanningSection
					:stats="planningStats"
					:is-single-user="isSingleUser"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WelcomeSection from '@/components/home/WelcomeSection.vue';
import NextFamilyMealSection from '@/components/home/NextFamilyMealSection.vue';
import ShoppingSection from '@/components/home/ShoppingSection.vue';
import PlanningSection from '@/components/home/PlanningSection.vue';

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
	time: '19:00',
	name: 'Ужин',
	recipe: {
		id: '1',
		name: 'Паста Карбонара',
		cookingTime: 30,
		portionCount: 1,
		complexity: 'medium'
	},
	portions: [
		{ memberName: 'Магомед', portion: 1 }
	]
});

// Список покупок
const shoppingList = ref({
	totalItems: 15,
	purchasedItems: 8,
	nearestShoppingDate: '2025-02-21',
	categories: [
		{
			name: 'Овощи и фрукты',
			items: [
				{ id: 1, name: 'Помидоры', quantity: 500, unit: 'г', purchased: false },
				{ id: 2, name: 'Огурцы', quantity: 300, unit: 'г', purchased: true },
				{ id: 3, name: 'Яблоки', quantity: 1, unit: 'кг', purchased: false }
			]
		},
		{
			name: 'Молочные продукты',
			items: [
				{ id: 4, name: 'Молоко', quantity: 1, unit: 'л', purchased: true },
				{ id: 5, name: 'Сыр', quantity: 300, unit: 'г', purchased: false }
			]
		}
	]
});

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
