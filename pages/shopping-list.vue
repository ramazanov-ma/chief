<template>
	<div>
		<AppHeader/>
		<WeeklySelector
			title="Продукты недели"
			@week-change="handleWeekChange"
		/>

		<!-- Список продуктов -->
		<div class="relative py-4 px-4 mt-4 bg-white border rounded-2xl shadow-sm border-slate-200">
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<span class="text-xl font-medium">Прогресс покупок</span>
					<span class="text-sm text-slate-500">{{ totalItems }} продуктов</span>
				</div>
				<span class="text-xl font-medium text-blue-600">{{ Math.round(progress) }}%</span>
			</div>

			<div class="mb-6">
				<div class="h-2 bg-gray-100 rounded-full overflow-hidden">
					<div
						class="h-full bg-blue-500 transition-all duration-300 rounded-full"
						:style="{ width: `${progress}%` }"
					></div>
				</div>
			</div>

			<div class="space-y-6">
				<div
					v-for="category in categories"
					:key="category.id"
					class="space-y-4"
				>
					<h3 class="flex items-center text-xl font-medium text-gray-900">
						<span class="text-2xl mr-3">{{ category.emoji }}</span>
						{{ category.name }}
					</h3>

					<div class="space-y-3">
						<div
							v-for="item in category.items"
							:key="item.id"
							@click="toggleItem(item)"
							class="flex items-center space-x-3 group cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
						>
							<div
								class="relative w-6 h-6 rounded-lg transition-all duration-200 flex items-center justify-center"
								:class="[
              item.checked
                ? 'bg-blue-500'
                : 'border-2 border-gray-300 hover:border-blue-400'
            ]"
							>
            <span
				v-if="item.checked"
				class="text-white text-sm transform transition-transform duration-200"
			>✓</span>
							</div>
							<span
								class="text-gray-900 transition-all duration-200 flex-grow"
								:class="item.checked ? 'opacity-50 line-through' : ''"
							>
            {{ item.name }}
          </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import WeeklySelector from '@/components/weekly/WeeklySelector.vue';
import { definePageMeta } from '@/.nuxt/imports';

definePageMeta({
	middleware: ['onboarding']
});

interface ShoppingItem {
	id: number;
	name: string;
	checked: boolean;
}
interface Category {
	id: number;
	name: string;
	emoji: string;
	items: ShoppingItem[];
}

const currentWeekOffset = ref(0);
const categories = ref<Category[]>([
	{
		id: 1,
		name: 'Овощи и фрукты',
		emoji: '🥬',
		items: [
			{ id: 1, name: 'Бананы', checked: false },
			{ id: 2, name: 'Брокколи', checked: false },
			{ id: 3, name: 'Морковь', checked: false }
		]
	},
	{
		id: 2,
		name: 'Мясо и рыба',
		emoji: '🥩',
		items: [
			{ id: 4, name: 'Куриная грудка', checked: false },
			{ id: 5, name: 'Лосось', checked: false }
		]
	}
]);

const totalItems = computed(() => {
	return categories.value.reduce((acc, cat) => acc + cat.items.length, 0);
});

const progress = computed(() => {
	const checked = categories.value.reduce((acc, cat) =>
		acc + cat.items.filter(item => item.checked).length, 0
	);
	return (checked / totalItems.value) * 100;
});

const handleWeekChange = (offset: number) => {
	currentWeekOffset.value = offset;
};

const toggleItem = (item: ShoppingItem) => {
	item.checked = !item.checked;
};
</script>

<style scoped>
.cursor-pointer {
	user-select: none;
	-webkit-user-select: none;
}
</style>
