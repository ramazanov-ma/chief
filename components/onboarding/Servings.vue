<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="users">Количество человек</TitleSection>
			<p class="mt-2 text-gray-600 text-sm text-center">На сколько человек будем составлять меню?</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<button
				v-for="option in servingOptions"
				:key="option.value"
				type="button"
				class="relative flex items-start p-4 border rounded-xl transition-all text-left"
				:class="[
                    modelValue.servings === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                ]"
				@click="updateValue(option.value)"
			>
				<div class="flex items-start gap-3">
					<span class="text-2xl">{{ option.emoji }}</span>
					<div>
						<p
							class="font-medium"
							:class="modelValue.servings === option.value ? 'text-blue-600' : 'text-gray-900'"
						>
							{{ option.label }}
						</p>
						<p
							class="text-sm mt-1"
							:class="modelValue.servings === option.value ? 'text-blue-600' : 'text-gray-500'"
						>
							{{ option.description }}
						</p>
					</div>
				</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const servingOptions = [
	{
		value: 1,
		label: '1 человек',
		emoji: '🙋',
		description: 'Готовлю только для себя'
	},
	{
		value: 2,
		label: '2 человека',
		emoji: '🧑‍🤝‍🧑',
		description: 'Готовлю на двоих'
	},
	{
		value: 4,
		label: '3-4 человека',
		emoji: '👨‍👩‍👦',
		description: 'Готовлю для небольшой семьи'
	},
	{
		value: 6,
		label: '5-6 человек',
		emoji: '👨‍👩‍👧‍👦',
		description: 'Готовлю для большой семьи'
	}
] as const;

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: FormData): void;
}>();

const updateValue = (value: typeof servingOptions[number]['value']) => {
	emit('update:modelValue', { ...props.modelValue, servings: value });
};
</script>
