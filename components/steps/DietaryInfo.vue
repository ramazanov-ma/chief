<template>
	<div class="space-y-8">
		<!-- Dietary Restrictions -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="circle-exclamation" class="mr-3 h-6 w-6 text-blue-500"/>
				Ограничения в питании
			</h3>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<label
					v-for="restriction in dietaryRestrictions"
					:key="restriction.id"
					class="relative"
				>
					<input
						type="checkbox"
						:value="restriction.id"
						v-model="formData.restrictions"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
                            formData.restrictions.includes(restriction.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                        ]"
					>
						<font-awesome-icon
							:icon="restriction.icon"
							class="h-8 w-8 mb-2"
							:class="formData.restrictions.includes(restriction.id) ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="text-sm font-medium text-gray-700">{{ restriction.name }}</div>
					</div>
				</label>
			</div>
		</div>

		<!-- Calorie Range -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="fire-flame-curved" class="mr-3 h-6 w-6 text-blue-500"/>
				Предпочтительная калорийность
			</h3>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
				<label
					v-for="range in calorieRanges"
					:key="range.id"
					class="relative h-full"
				>
					<input
						type="radio"
						:value="range.id"
						v-model="selectedCalorieRange"
						class="hidden"
						@change="updateCalories(range.value)"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 h-full flex"
						:class="[
                            selectedCalorieRange === range.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                        ]"
					>
						<div class="flex items-start w-full">
							<font-awesome-icon
								:icon="range.icon"
								class="h-8 w-8 mr-4 mt-1 flex-shrink-0"
								:class="selectedCalorieRange === range.id ? 'text-blue-500' : 'text-gray-400'"
							/>
							<div class="flex flex-col justify-between flex-grow">
								<div>
									<div class="font-medium text-gray-700">{{ range.label }}</div>
									<div v-if="range.description" class="text-sm text-gray-500">{{
											range.description
										}}
									</div>
								</div>
								<div class="text-sm text-blue-600 mt-2">{{ range.value.min }} - {{ range.value.max }}
									ккал
								</div>
							</div>
						</div>
					</div>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormData } from '@/types/form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Dietary restrictions
const dietaryRestrictions = [
	{ id: 'vegetarian', name: 'Вегетарианство', icon: 'leaf' },
	{ id: 'vegan', name: 'Веганство', icon: 'seedling' },
	{ id: 'gluten-free', name: 'Без глютена', icon: 'wheat-awn-circle-exclamation' },
	{ id: 'lactose-free', name: 'Без лактозы', icon: 'glass-water' },
	{ id: 'nuts-free', name: 'Без орехов', icon: 'ban' },
	{ id: 'low-carb', name: 'Низкоуглеводная', icon: 'bread-slice' },
];

// Calorie ranges
// Обновим диапазоны в скрипте
const calorieRanges = [
	{
		id: 'weight-loss',
		label: 'Снижение веса',
		description: 'Подходит для плавного снижения веса',
		value: { min: 1200, max: 1500 },
		icon: 'weight-scale'
	},
	{
		id: 'balanced',
		label: 'Поддержание веса',
		description: 'Достаточно сбалансированное питание',
		value: { min: 1500, max: 2000 },
		icon: 'balance-scale'
	},
	{
		id: 'active',
		label: 'Активный образ жизни',
		description: 'Для людей с регулярными физическими нагрузками',
		value: { min: 2000, max: 2500 },
		icon: 'person-running'
	},
	{
		id: 'athletic',
		label: 'Набор массы',
		description: 'Для интенсивных тренировок и набора массы',
		value: { min: 2500, max: 3500 }, // Увеличили максимум до 3500
		icon: 'dumbbell'
	},
	{
		id: 'custom-high',
		label: 'Высококалорийный',
		description: 'Для специальных программ питания',
		value: { min: 3500, max: 5000 }, // Добавили новый диапазон
		icon: 'fire'
	}
];

const props = defineProps<{
	modelValue: Partial<FormData>;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: Partial<FormData>): void;
}>();

const formData = ref({
	restrictions: props.modelValue.restrictions || [],
	caloriesPreference: props.modelValue.caloriesPreference || {
		min: 1500,
		max: 2000
	},
});

// Находим начальный выбранный диапазон калорий
const findInitialCalorieRange = () => {
	const current = formData.value.caloriesPreference;
	return calorieRanges.find(range =>
		range.value.min === current.min &&
		range.value.max === current.max
	)?.id || 'balanced';
};

const selectedCalorieRange = ref<string>(findInitialCalorieRange());

const updateCalories = (range: { min: number; max: number }) => {
	formData.value.caloriesPreference = range;
};

watch(formData, (newValue) => {
	emit('update:modelValue', newValue);
}, { deep: true });
</script>
