<template>
	<div class="max-w-2xl mx-auto">
		<div class="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
			<div class="bg-white rounded-2xl p-8">
				<form @submit.prevent="handleSubmit" class="space-y-8">
					<!-- Базовая информация -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="user" class="mr-3 h-6 w-6 text-blue-500"/>
							Личная информация
						</h2>

						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<label for="name" class="block text-base font-medium text-gray-700">
									Как к вам обращаться?
								</label>
								<input
									v-model="formData.name"
									type="text"
									id="name"
									class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
									placeholder="Ваше имя"
								/>
							</div>

							<div class="space-y-2">
								<label for="age" class="block text-base font-medium text-gray-700">
									Возраст
								</label>
								<input
									v-model="formData.age"
									type="number"
									id="age"
									class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
									placeholder="Ваш возраст"
								/>
							</div>
						</div>
					</div>

					<!-- Диетические ограничения -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="ban" class="mr-3 h-6 w-6 text-blue-500"/>
							Диетические ограничения
						</h2>

						<!-- Обновленные стили для диетических ограничений -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<label
								v-for="restriction in dietaryRestrictions"
								:key="restriction.id"
								class="relative group h-full"
							>
								<input
									type="checkbox"
									:value="restriction.id"
									v-model="formData.restrictions"
									class="hidden"
								/>
								<div
									class="h-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-start"
									:class="[
          formData.restrictions.includes(restriction.id)
            ? 'border-blue-500 bg-blue-50 shadow-sm'
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
        ]"
								>
									<div class="mr-3 pt-1">
										<div
											class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
											:class="[
              formData.restrictions.includes(restriction.id)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300 group-hover:border-blue-300'
            ]"
										>
											<font-awesome-icon
												v-if="formData.restrictions.includes(restriction.id)"
												icon="check"
												class="h-3 w-3 text-white"
											/>
										</div>
									</div>
									<div class="flex-1">
										<span class="text-base font-medium text-gray-700 block">{{
												restriction.name
											}}</span>
										<p class="text-sm text-gray-500 mt-1 line-clamp-2">{{
												restriction.description
											}}</p>
									</div>
								</div>
							</label>
						</div>
					</div>

					<!-- Предпочтения по кухням -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="globe" class="mr-3 h-6 w-6 text-blue-500"/>
							Любимые кухни
						</h2>

						<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
							<label
								v-for="cuisine in cuisineTypes"
								:key="cuisine.id"
								class="relative group"
							>
								<input
									type="checkbox"
									:value="cuisine.id"
									v-model="formData.cuisines"
									class="hidden"
								/>
								<div
									class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex flex-col items-center text-center h-full"
									:class="[
          formData.cuisines.includes(cuisine.id)
            ? 'border-blue-500 bg-blue-50 shadow-sm'
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
        ]"
								>
									<font-awesome-icon
										:icon="cuisine.icon"
										class="h-10 w-10 mb-3"
										:class="formData.cuisines.includes(cuisine.id) ? 'text-blue-500' : 'text-gray-400'"
									/>
									<span class="text-base font-medium text-gray-700">{{ cuisine.name }}</span>
								</div>
							</label>
						</div>
					</div>

					<!-- Предпочтения по времени -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="clock" class="mr-3 h-6 w-6 text-blue-500"/>
							Время на готовку
						</h2>

						<div class="space-y-4">
							<div class="grid grid-cols-2 gap-4">
								<label
									v-for="time in cookingTimes"
									:key="time.id"
									class="relative group"
								>
									<input
										type="radio"
										:value="time.id"
										v-model="formData.cookingTime"
										class="hidden"
									/>
									<span
										class="block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
										:class="[
											formData.cookingTime === time.id
												? 'border-blue-500 bg-blue-50 shadow-sm'
												: 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
										]"
									>
		<div class="flex items-center justify-between">
  <span class="text-base font-medium text-gray-700">{{ time.name }}</span>
  <span class="text-sm text-gray-500">{{ time.duration }}</span>
</div>
									</span>
								</label>
							</div>
						</div>
					</div>

					<!-- Количество приемов пищи -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="utensils" class="mr-3 h-6 w-6 text-blue-500"/>
							Приемы пищи
						</h2>

						<div class="space-y-2">
							<label class="block text-base font-medium text-gray-700">
								Количество приемов пищи в день
							</label>
							<div class="flex gap-4">
								<button
									type="button"
									v-for="number in [2,3,4,5]"
									:key="number"
									@click="formData.mealsPerDay = number"
									class="flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200"
									:class="[
										formData.mealsPerDay === number
											? 'border-blue-500 bg-blue-50 text-blue-600'
											: 'border-gray-200 hover:border-blue-300 text-gray-600'
									]"
								>
									{{ number }}
								</button>
							</div>
						</div>
					</div>

					<!-- Количество членов семьи -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="users" class="mr-3 h-6 w-6 text-blue-500"/>
							Члены семьи
						</h2>

						<div class="space-y-2">
							<label class="block text-base font-medium text-gray-700">
								Количество человек в семье
							</label>
							<div class="flex gap-4">
								<button
									type="button"
									v-for="number in [1,2,3,4,5,6]"
									:key="number"
									@click="formData.familyMembers = number"
									class="flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200"
									:class="[
            formData.familyMembers === number
              ? 'border-blue-500 bg-blue-50 text-blue-600'
              : 'border-gray-200 hover:border-blue-300 text-gray-600'
          ]"
								>
									{{ number }}
								</button>
							</div>
							<p class="text-sm text-gray-500 mt-1">
								Это поможет рассчитать правильные порции
							</p>
						</div>
					</div>

					<!-- Кнопка отправки -->
					<button
						type="submit"
						class="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center group"
					>
						<span>Сохранить предпочтения</span>
						<font-awesome-icon
							icon="arrow-right"
							class="ml-2 group-hover:translate-x-1 transition-transform duration-200"
						/>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface FormData {
	name: string;
	age: number | null;
	restrictions: string[];
	cuisines: string[];
	cookingTime: string;
	mealsPerDay: number;
	familyMembers: number;
}

const formData = ref<FormData>({
	name: '',
	age: null,
	restrictions: [],
	cuisines: [],
	cookingTime: '',
	mealsPerDay: 3,
	familyMembers: 1
});

const dietaryRestrictions = [
	{
		id: 'vegetarian',
		name: 'Вегетарианское',
		description: 'Без мяса и рыбы'
	},
	{
		id: 'vegan',
		name: 'Веганское',
		description: 'Без продуктов животного происхождения'
	},
	{
		id: 'gluten-free',
		name: 'Без глютена',
		description: 'Без пшеницы, ржи и ячменя'
	},
	{
		id: 'lactose-free',
		name: 'Без лактозы',
		description: 'Без молочных продуктов'
	},
	{
		id: 'low-carb',
		name: 'Низкоуглеводное',
		description: 'Минимум углеводов'
	},
	{
		id: 'keto',
		name: 'Кето',
		description: 'Много жиров, мало углеводов'
	},
	{
		id: 'diabetes',
		name: 'Диабетическое',
		description: 'Контроль сахара'
	},
	{
		id: 'low-fat',
		name: 'Низкожировое',
		description: 'Минимум жиров'
	},
	{
		id: 'egg-free',
		name: 'Без яиц',
		description: 'Исключены яйца'
	},
	{
		id: 'nut-free',
		name: 'Без орехов',
		description: 'Исключены орехи'
	},
	{
		id: 'kosher',
		name: 'Кошерное',
		description: 'Соответствует кашруту'
	},
	{
		id: 'halal',
		name: 'Халяльное',
		description: 'Соответствует халялю'
	}
];

const cuisineTypes = [
	{
		id: 'russian',
		name: 'Русская',
		icon: 'bowl-food'
	},
	{
		id: 'japanese',
		name: 'Японская',
		icon: 'fish'
	},
	{
		id: 'georgian',
		name: 'Грузинская',
		icon: 'utensils'
	},
	{
		id: 'italian',
		name: 'Итальянская',
		icon: 'pizza-slice'
	},
	{
		id: 'asian',
		name: 'Азиатская',
		icon: 'bowl-rice'
	},
	{
		id: 'uzbek',
		name: 'Узбекская',
		icon: 'fire'
	},
	{
		id: 'mediterranean',
		name: 'Средиземноморская',
		icon: 'leaf'
	},
	{
		id: 'mexican',
		name: 'Мексиканская',
		icon: 'pepper-hot'
	},
	{
		id: 'european',
		name: 'Европейская',
		icon: 'wheat-awn'
	}
];

const cookingTimes = [
	{
		id: 'quick',
		name: 'Быстрые рецепты',
		duration: 'до 30 минут'
	},
	{
		id: 'medium',
		name: 'Среднее время',
		duration: '30-60 минут'
	},
	{
		id: 'long',
		name: 'Особые блюда',
		duration: 'более 60 минут'
	},
	{
		id: 'any',
		name: 'Любое время',
		duration: 'без ограничений'
	}
];

const handleSubmit = () => {
	console.log('Отправка данных:', formData.value);
// Здесь будет логика отправки данных
};
</script>
