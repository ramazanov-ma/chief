<template>
	<div class="space-y-6">
		<TitleSection icon="utensils">Расскажите о своем опыте готовки</TitleSection>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div
				v-for="level in experienceLevels"
				:key="level.id"
				class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
				:class="[
					modelValue.cookingExperience === level.id
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-200 hover:border-blue-300'
				]"
				@click="updateExperience(level.id)"
			>
				<div class="flex items-center gap-4">
					<div class="text-xl">{{ level.emoji }}</div>
					<div>
						<h3 class="font-medium">{{ level.title }}</h3>
						<p class="text-gray-600">{{ level.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: FormData];
}>();

const experienceLevels = [
	{
		id: 'beginner',
		emoji: '🌱',
		title: 'Начинающий',
		description: 'Только начинаю свой путь в кулинарии'
	},
	{
		id: 'intermediate',
		emoji: '👨‍🍳',
		title: 'Любитель',
		description: 'Готовлю время от времени, знаю базовые техники'
	},
	{
		id: 'advanced',
		emoji: '🎯',
		title: 'Продвинутый',
		description: 'Уверенно готовлю сложные блюда'
	},
	{
		id: 'expert',
		emoji: '⭐',
		title: 'Эксперт',
		description: 'Профессионально занимаюсь кулинарией'
	}
];

const updateExperience = (experience: string) => {
	emit('update:modelValue', {
		...props.modelValue,
		cookingExperience: experience as FormData['cookingExperience']
	});
};
</script>
