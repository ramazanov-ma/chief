<template>
	<div v-if="stats" class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
		<h2 class="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
			<font-awesome-icon
				icon="chart-pie"
				class="text-purple-500 w-5 h-5"
			/>
			Аналитика
		</h2>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
			<!-- Бюджет -->
			<div class="bg-slate-50 rounded-xl p-3 sm:p-4">
				<div class="flex items-center gap-2 mb-2">
					<font-awesome-icon
						icon="wallet"
						class="text-green-500 w-4 h-4"
					/>
					<div class="text-sm text-slate-500">
						{{ isSingleUser ? 'Бюджет' : 'Семейный бюджет' }}
					</div>
				</div>
				<div class="flex items-end gap-2">
					<div class="text-lg sm:text-xl font-medium">
						{{ stats.budget.actual }}{{ stats.budget.currency }}
					</div>
					<div class="text-sm text-slate-500 mb-0.5">
						из {{ stats.budget.planned }}{{ stats.budget.currency }}
					</div>
				</div>
				<div class="w-full h-1 bg-slate-200 rounded-full mt-2">
					<div
						class="h-full bg-green-500 rounded-full transition-all duration-300"
						:style="{
              width: `${(stats.budget.actual / stats.budget.planned) * 100}%`
            }"
					></div>
				</div>
			</div>

			<!-- Предпочтения -->
			<div class="bg-slate-50 rounded-xl p-3 sm:p-4">
				<div class="flex items-center gap-2 mb-2">
					<font-awesome-icon
						icon="heart"
						class="text-red-500 w-4 h-4"
					/>
					<div class="text-sm text-slate-500">
						{{ isSingleUser ? 'Предпочтения' : 'Учтённые предпочтения' }}
					</div>
				</div>
				<div class="flex items-end gap-2">
					<div class="text-lg sm:text-xl font-medium">
						{{ stats.preferences.matched }}
					</div>
					<div class="text-sm text-slate-500 mb-0.5">
						из {{ stats.preferences.total }}
					</div>
				</div>
				<div class="flex gap-1 mt-2">
					<div
						v-for="n in stats.preferences.total"
						:key="n"
						class="flex-1 h-1 rounded-full"
						:class="[
              n <= stats.preferences.matched
                ? 'bg-red-500'
                : 'bg-slate-200'
            ]"
					></div>
				</div>
			</div>

			<!-- Разнообразие -->
			<div class="bg-slate-50 rounded-xl p-3 sm:p-4">
				<div class="flex items-center gap-2 mb-2">
					<font-awesome-icon
						icon="star"
						class="text-yellow-500 w-4 h-4"
					/>
					<div class="text-sm text-slate-500">Разнообразие блюд</div>
				</div>
				<div class="flex items-end gap-2 mb-2">
					<div class="text-lg sm:text-xl font-medium">
						{{ stats.variety.uniqueDishes }}
					</div>
					<div class="text-sm text-slate-500 mb-0.5">
						уник. блюд
					</div>
				</div>
				<div class="flex flex-wrap gap-1.5">
          <span
			  v-for="cuisine in stats.variety.cuisineTypes"
			  :key="cuisine"
			  class="px-2 py-0.5 text-xs rounded-full bg-white border border-slate-200 text-slate-600"
		  >
            {{ cuisine }}
          </span>
				</div>
			</div>
		</div>

		<div class="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
			<div class="flex items-start sm:items-center gap-2 text-sm text-slate-500">
				<font-awesome-icon
					icon="lightbulb"
					class="text-yellow-500 w-4 h-4 mt-1 sm:mt-0"
				/>
				<span>
          {{ isSingleUser
					? 'Рекомендации по улучшению меню ждут вас в разделе планирования'
					: 'Персональные рекомендации для каждого члена семьи доступны в разделе планирования'
					}}
        </span>
			</div>
			<BaseButton
				variant="outline"
				class="w-full sm:w-auto justify-center"
				@click="navigateToPlanning"
			>
				<font-awesome-icon
					icon="arrow-right"
					class="text-blue-600 mr-2"
				/>
				Подробнее
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();

interface Stats {
	budget: {
		planned: number;
		actual: number;
		currency: string;
	};
	preferences: {
		total: number;
		matched: number;
	};
	variety: {
		uniqueDishes: number;
		cuisineTypes: string[];
	};
}

const props = defineProps<{
	stats: Stats;
	isSingleUser: boolean;
}>();

const navigateToPlanning = () => {
	router.push('/planning/analytics');
};
</script>
