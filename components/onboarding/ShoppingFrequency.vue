<template>
	<div class="space-y-6">
		<div>
			<TitleSection icon="shopping-cart">Частота покупок</TitleSection>
			<p class="mt-2 text-gray-600 text-sm text-center">Как часто вы планируете закупать продукты?</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
			<div
				v-for="option in shoppingOptions"
				:key="option.value"
				class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
				:class="[
                    modelValue.shoppingFrequency === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                ]"
				@click="updateFrequency(option.value)"
			>
				<div class="flex flex-col items-center gap-2 text-center">
					<div class="text-2xl">{{ option.emoji }}</div>
					<div class="font-medium">{{ option.label }}</div>
					<div class="text-sm text-gray-600">{{ option.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';

const shoppingOptions = [
	{
		value: 'once',
		label: '1 раз в неделю',
		emoji: '🛒',
		description: 'Делаю большую закупку раз в неделю'
	},
	{
		value: 'twice',
		label: '2-3 раза в неделю',
		emoji: '🏪',
		description: 'Покупаю продукты несколько раз в неделю'
	},
	{
		value: 'daily',
		label: 'Каждый день',
		emoji: '🛍️',
		description: 'Предпочитаю покупать свежие продукты ежедневно'
	}
];

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: FormData): void;
}>();

const updateFrequency = (value: string) => {
	emit('update:modelValue', { ...props.modelValue, shoppingFrequency: value });
};
</script>
