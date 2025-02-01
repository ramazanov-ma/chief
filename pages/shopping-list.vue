<!-- pages/shopping-list.vue -->
<template>
	<div class="p-4">
		<!-- Заголовок -->
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-gray-900 mb-2">Список покупок</h1>
			<p class="text-gray-600">{{ totalItems }} продуктов</p>
		</div>

		<!-- Прогресс -->
		<div class="mb-6">
			<div class="h-2 bg-gray-100 rounded-full overflow-hidden">
				<div
					class="h-full bg-purple-600 transition-all duration-300 rounded-full"
					:style="{ width: `${progress}%` }"
				></div>
			</div>
		</div>

		<!-- Категории продуктов -->
		<div class="space-y-6">
			<div
				v-for="category in categories"
				:key="category.id"
				class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
			>
				<h3 class="text-gray-900 font-medium mb-4 flex items-center">
					<span class="text-xl mr-2">{{ category.emoji }}</span>
					{{ category.name }}
				</h3>

				<div class="space-y-2">
					<div
						v-for="item in category.items"
						:key="item.id"
						class="flex items-center space-x-3"
					>
						<button
							@click="toggleItem(item)"
							:class="[
                'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
                item.checked
                  ? 'bg-purple-600 border-purple-600'
                  : 'border-gray-300 hover:border-purple-600'
              ]"
						>
							<span v-if="item.checked" class="text-white text-sm">✓</span>
						</button>
						<span
							class="text-gray-900 transition-all"
							:class="item.checked ? 'opacity-50 line-through' : ''"
						>
              {{ item.name }}
            </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface ShoppingItem {
	id: number
	name: string
	checked: boolean
}

interface Category {
	id: number
	name: string
	emoji: string
	items: ShoppingItem[]
}

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
	},
	// Добавьте другие категории
])

const totalItems = computed(() => {
	return categories.value.reduce((acc, cat) => acc + cat.items.length, 0)
})

const progress = computed(() => {
	const checked = categories.value.reduce((acc, cat) =>
		acc + cat.items.filter(item => item.checked).length, 0
	)
	return (checked / totalItems.value) * 100
})

const toggleItem = (item: ShoppingItem) => {
	item.checked = !item.checked
}
</script>
