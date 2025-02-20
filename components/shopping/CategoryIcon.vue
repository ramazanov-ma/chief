<template>
	<font-awesome-icon
		:icon="getCategoryIcon"
		:class="getCategoryColor"
		class="w-4 h-4"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
	category: string;
}>();

const getCategoryIcon = computed(() => {
	const icons: Record<string, string> = {
		'Овощи и фрукты': 'carrot',
		'Молочные продукты': 'cheese',
		'Мясо и рыба': 'drumstick-bite',
		'Бакалея': 'wheat-awn',
		'Напитки': 'bottle-water',
		'Сладости': 'cookie',
		// Добавьте другие категории по необходимости
	};
	return icons[props.category] || 'shopping-basket';
});

const getCategoryColor = computed(() => {
	const colors: Record<string, string> = {
		'Овощи и фрукты': 'text-green-500',
		'Молочные продукты': 'text-blue-400',
		'Мясо и рыба': 'text-red-500',
		'Бакалея': 'text-amber-600',
		'Напитки': 'text-cyan-500',
		'Сладости': 'text-pink-500',
		// Добавьте другие категории по необходимости
	};
	return colors[props.category] || 'text-slate-400';
});
</script>
