<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="globe">Какие кухни вам нравятся?</TitleSection>
			<p class="m-2 text-gray-600 text-sm text-center">Выберите минимум одну кухню</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="cuisine in cuisines"
				:key="cuisine.id"
				class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
				:class="[
					modelValue.cuisines.includes(cuisine.id)
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-200 hover:border-blue-300'
				]"
				@click="toggleCuisine(cuisine.id)"
			>
				<div class="flex items-center gap-3">
					<div class="text-xl">{{ cuisine.emoji }}</div>
					<div class="font-medium">{{ cuisine.name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, watch } from 'vue';
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const cuisines = [
	{ id: 'russian', name: 'Русская', emoji: '🥘' },                 // Традиционная русская кухня
	{ id: 'italian', name: 'Итальянская', emoji: '🍝' },             // Пицца, паста - очень популярны
	{ id: 'japanese', name: 'Японская', emoji: '🍱' },               // Суши, роллы - прочно вошли в культуру
	{ id: 'georgian', name: 'Грузинская', emoji: '🥟' },             // Хачапури, хинкали - одна из любимых
	{ id: 'chinese', name: 'Китайская', emoji: '🥢' },               // Лапша, димсамы
	{ id: 'uzbek', name: 'Узбекская', emoji: '🍚' },                 // Плов, самса, очень популярна
	{ id: 'korean', name: 'Корейская', emoji: '🍜' },                // Популярность растет
	{ id: 'turkish', name: 'Турецкая', emoji: '🥙' },                // Кебабы, пиде
	{ id: 'american', name: 'Американская', emoji: '🍔' },           // Бургеры, стейки
	{ id: 'vietnamese', name: 'Вьетнамская', emoji: '🍜' },          // Фо бо, немы
	{ id: 'mediterranean', name: 'Средиземноморская', emoji: '🫒' }, // Греческая, испанская
	{ id: 'caucasian', name: 'Кавказская', emoji: '🥩' },            // Шашлык, люля-кебаб
	{ id: 'indian', name: 'Индийская', emoji: '🍛' },                // Карри, тандури
	{ id: 'thai', name: 'Тайская', emoji: '🥡' },                    // Пад тай, том ям
	{ id: 'french', name: 'Французская', emoji: '🥐' },              // Круассаны, багеты
	{ id: 'mexican', name: 'Мексиканская', emoji: '🌮' }             // Тако, буррито
];

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: FormData];
	'validate': [isValid: boolean];
}>();

const isValid = computed(() => props.modelValue.cuisines.length > 0);

watch(() => props.modelValue.cuisines, () => {
	emit('validate', isValid.value);
}, { immediate: true });

const toggleCuisine = (id: string) => {
	const currentCuisines = [...props.modelValue.cuisines];
	const index = currentCuisines.indexOf(id);

	if (index === -1) {
		currentCuisines.push(id);
	} else {
		currentCuisines.splice(index, 1);
	}

	emit('update:modelValue', {
		...props.modelValue,
		cuisines: currentCuisines
	});
};
</script>
