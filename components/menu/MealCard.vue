<template>
	<template v-if="day.state !== DayState.PAST || !isCollapsed">
		<div
			v-if="day.meals.length"
			class="space-y-4 mt-4"
		>
			<div class="relative">
				<div class="absolute left-[1.65rem] top-0 bottom-0 w-px bg-slate-200"></div>
				<div class="space-y-4">
					<div
						v-for="meal in day.meals"
						:key="meal.id"
						class="relative group"
					>
						<div class="flex items-start space-x-3">
							<div class="flex flex-col items-center w-14">
								<span
									class="w-[64px] text-base font-medium text-gray-900 bg-white px-2 rounded-full border border-slate-200"
								>
									{{ meal.time }}
								</span>
								<div
									class="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mt-1 z-10">
									<span class="text-xl">{{ meal.emoji }}</span>
								</div>
							</div>

							<div class="flex-1 min-w-0">
								<div
									class="bg-white border border-slate-200 rounded-xl p-4 group-hover:bg-gray-50 transition-colors shadow-sm"
									:class="{'opacity-75': day.state === DayState.PAST}"
								>
									<div class="flex items-start justify-between space-x-2">
										<MealTitle :title="meal.name"/>
									</div>

									<MealDescription :description="meal.description"/>

									<div class="flex items-center flex-wrap gap-4">
										<CaloriesBadge :calories="meal.calories"/>
										<CookingTimeBadge :time="meal.cookingTime"/>

										<div
											v-if="day.state === DayState.FUTURE"
											class="flex items-center gap-4 ml-auto"
										>
											<button
												class="text-sm font-medium text-blue-600 hover:text-blue-900 rounded-lg transition-colors"
												@click="$emit('replace-meal')"
											>
												Заменить
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</template>
</template>

<script setup lang="ts">
import { DayMenu, DayState, Meal } from "@/types/menu";
import CaloriesBadge from "@/components/ui/CaloriesBadge.vue";
import CookingTimeBadge from "@/components/ui/CookingTimeBadge.vue";
import MealTitle from "@/components/ui/MealTitle.vue";
import MealDescription from "@/components/ui/MealDescription.vue";

interface Props {
	day: DayMenu;
	isCollapsed?: boolean;
}

defineProps<Props>();

defineEmits<{
	(e: 'replace-meal'): void;
}>();
</script>
