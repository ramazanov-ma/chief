<!-- components/steps/DietaryInfo.vue -->
<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="clipboard-check">Есть ли у вас ограничения в питании?</TitleSection>
			<p class="m-2 text-gray-600 text-sm text-center">Выберите подходящие варианты</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div
				v-for="restriction in dietaryRestrictions"
				:key="restriction.id"
				class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
				:class="[
          modelValue?.restrictions?.includes(restriction.id)
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
				@click="toggleRestriction(restriction.id)"
			>
				<div class="flex items-center gap-4">
					<div class="text-xl">{{ restriction.emoji }}</div>
					<div>
						<h3 class="font-medium">{{ restriction.name }}</h3>
						<p class="text-gray-600 text-sm">{{ restriction.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: FormData];
}>();

const dietaryRestrictions = [
	{
		id: 'vegetarian',
		name: 'Вегетарианство',
		emoji: '🥗',
		description: 'Не употребляю мясо и рыбу'
	},
	{
		id: 'vegan',
		name: 'Веганство',
		emoji: '🌱',
		description: 'Не употребляю продукты животного происхождения'
	},
	{
		id: 'gluten_free',
		name: 'Без глютена',
		emoji: '🌾',
		description: 'Исключаю продукты, содержащие глютен'
	},
	{
		id: 'lactose_free',
		name: 'Без лактозы',
		emoji: '🥛',
		description: 'Не употребляю молочные продукты'
	},
	{
		id: 'low_carb',
		name: 'Низкоуглеводное',
		emoji: '🥩',
		description: 'Ограничиваю потребление углеводов'
	},
	{
		id: 'halal',
		name: 'Халяль',
		emoji: '🌙',
		description: 'Соблюдаю правила халяльного питания'
	},
	{
		id: 'kosher',
		name: 'Кошерное',
		emoji: '✡️',
		description: 'Соблюдаю правила кошерного питания'
	},
	{
		id: 'no_restrictions',
		name: 'Нет ограничений',
		emoji: '✨',
		description: 'Не имею особых ограничений в питании'
	}
];

const toggleRestriction = (id: string) => {
	const currentRestrictions = [...(props.modelValue?.restrictions || [])];

	if (id === 'no_restrictions') {
		emit('update:modelValue', {
			...props.modelValue,
			restrictions: ['no_restrictions']
		});
		return;
	}

	const index = currentRestrictions.indexOf(id);

	const noRestrictionsIndex = currentRestrictions.indexOf('no_restrictions');
	if (noRestrictionsIndex !== -1) {
		currentRestrictions.splice(noRestrictionsIndex, 1);
	}

	if (index === -1) {
		currentRestrictions.push(id);
	} else {
		currentRestrictions.splice(index, 1);
	}

	emit('update:modelValue', {
		...props.modelValue,
		restrictions: currentRestrictions
	});
};
</script>
