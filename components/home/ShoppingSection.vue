<template>
	<div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
		<!-- Заголовок и статистика -->
		<div class="flex justify-between items-start mb-4 sm:mb-6">
			<div>
				<h2 class="text-xl font-semibold flex items-center gap-2">
					<font-awesome-icon
						icon="shopping-basket"
						class="text-yellow-500 w-5 h-5"
					/>
					{{ isSingleUser ? 'Мой список покупок' : 'Список покупок для семьи' }}
				</h2>
				<p class="text-sm text-slate-500 mt-1">
					{{ shoppingList.purchasedItems }} из {{ shoppingList.totalItems }} продуктов куплено
				</p>
			</div>
			<BaseButton
				variant="outline"
				size="sm"
				class="!px-3 !py-2"
				@click="navigateToShopping"
			>
				<div class="flex items-center gap-2">
					<span class="hidden sm:inline">Все покупки</span>
					<font-awesome-icon icon="chevron-right" class="text-blue-600 w-4 h-4" />
				</div>
			</BaseButton>
		</div>

		<!-- Прогресс бар -->
		<div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4 sm:mb-6">
			<div
				class="h-full bg-yellow-500 rounded-full transition-all duration-300"
				:style="{
          width: `${(shoppingList.purchasedItems / shoppingList.totalItems) * 100}%`
        }"
			></div>
		</div>

		<!-- Список категорий -->
		<div class="space-y-3 sm:space-y-4">
			<div
				v-for="category in shoppingList.categories.slice(0, 2)"
				:key="category.name"
				class="bg-slate-50 rounded-xl p-3 sm:p-4"
			>
				<div class="font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
					<CategoryIcon :category="category.name" />
					{{ category.name }}
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
					<div
						v-for="item in category.items.slice(0, 3)"
						:key="item.id"
						class="flex items-center justify-between bg-white rounded-lg p-2 sm:p-3"
					>
						<div class="flex items-center gap-2">
							<BaseCheckbox
								:model-value="item.purchased"
								@update:model-value="(value) => togglePurchased(item, value)"
								class="rounded border-slate-300 text-yellow-500 focus:ring-yellow-500"
							/>
							<span
								:class="[
                  'text-sm transition-all duration-200',
                  item.purchased ? 'text-slate-400 line-through' : 'text-slate-700'
                ]"
							>
                {{ item.name }}
              </span>
						</div>
						<span class="text-sm text-slate-500">
              {{ item.quantity }}{{ item.unit }}
            </span>
					</div>
				</div>
			</div>
		</div>

		<!-- Нижняя информация -->
		<div class="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
			<font-awesome-icon
				icon="calendar-day"
				class="text-blue-500 w-4 h-4"
			/>
			<span>Ближайшая закупка: {{ formatDate(shoppingList.nearestShoppingDate) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
import CategoryIcon from '@/components/shopping/CategoryIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface ShoppingItem {
	id: number;
	name: string;
	quantity: number;
	unit: string;
	purchased: boolean;
}

interface Category {
	name: string;
	items: ShoppingItem[];
}

interface ShoppingListData {
	totalItems: number;
	purchasedItems: number;
	nearestShoppingDate: string;
	categories: Category[];
}

const props = defineProps<{
	shoppingList: ShoppingListData;
	isSingleUser: boolean;
}>();

const emit = defineEmits<{
	(e: 'updateItem', item: ShoppingItem): void;
}>();

const router = useRouter();

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long'
	});
};

const togglePurchased = (item: ShoppingItem, value: boolean) => {
	emit('updateItem', { ...item, purchased: value });
};

const navigateToShopping = () => {
	router.push('/shopping');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
