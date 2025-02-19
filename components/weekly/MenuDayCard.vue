<template>
	<div
		class="relative py-4 px-4 bg-white border rounded-3xl shadow-sm transition-colors"
		:class="[day.isToday ? 'border-blue-500' : 'border-slate-200']"
	>
		<div class="transition-colors">
			<div class="flex items-start space-x-4">
				<div class="flex-1 min-w-0">
					<div class="flex items-center justify-between">
						<DayHeader :day="day"/>
						<BaseButton
							v-if="isEditable && state !== DayState.PAST"
							@click="$emit('regenerate')"
							class="w-10 h-10 !p-0 border-slate-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
							title="Пересоздать день"
							variant="secondary"
						>
							<font-awesome-icon icon="rotate"/>
						</BaseButton>
					</div>

					<MealCard :day="{
						date,
						meals,
						isToday: day.isToday
					}"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DayState, Meal } from '@/types/menu';
import BaseButton from '@/components/ui/BaseButton.vue';
import MealCard from '@/components/menu/MealCard.vue';
import DayHeader from '@/components/menu/DayHeader.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Props {
	date: string;
	meals: Array<Meal>;
	state: DayState;
	isEditable: boolean;
}

const props = defineProps<Props>();

defineEmits<{
	(e: 'replace-meal', meal: { id: string; name: string }): void;
	(e: 'regenerate'): void;
}>();

// Создаем вычисляемое свойство day для передачи в DayHeader
const day = computed(() => {
	const date = new Date(props.date);
	return {
		date: props.date,
		name: date.toLocaleDateString('ru-RU', { weekday: 'long' }).capitalize(),
		formattedDate: date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long'
		}),
		isToday: props.state === DayState.CURRENT,
		meals: props.meals,
		state: props.state,
		isEditable: props.isEditable
	};
});
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
