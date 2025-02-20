<template>
	<div
		class="relative py-4 px-4 bg-white border rounded-3xl shadow-sm transition-colors"
		:class="[day.isToday ? 'border-blue-500' : 'border-slate-200']"
	>
		<div class="transition-colors">
			<div class="flex items-start space-x-4">
				<div class="flex-1 min-w-0">
					<div class="flex items-center justify-between">
						<DayHeader
							:day="day"
							:is-collapsed="isCollapsed"
							@toggle-collapse="toggleCollapse"
							@regenerate="regenerate"
						/>
					</div>

					<MealCard
						:day="day"
						:is-collapsed="isCollapsed"
						@replace-meal="(meal) => $emit('replace-meal', meal)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { DayState, Meal } from '@/types/menu';
import MealCard from '@/components/menu/MealCard.vue';
import DayHeader from '@/components/menu/DayHeader.vue';

interface Props {
	date: string;
	meals: Meal[];
	state: DayState;
}

const props = defineProps<Props>();
const isCollapsed = ref(true);

const toggleCollapse = () => {
	isCollapsed.value = !isCollapsed.value;
};

defineEmits<{
	(e: 'replace-meal', meal: { date: string; mealId: string }): void;
	(e: 'regenerate'): void;
}>();

const day = computed(() => ({
	date: props.date,
	name: new Date(props.date).toLocaleDateString('ru-RU', { weekday: 'long' }).capitalize(),
	formattedDate: new Date(props.date).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long'
	}),
	isToday: props.state === DayState.CURRENT,
	meals: props.meals,
	state: props.state,
}));

const regenerate = () => {
	$emit('regenerate');
};
</script>

<script lang="ts">
declare global {
	interface String {
		capitalize(): string;
	}
}

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
</script>
