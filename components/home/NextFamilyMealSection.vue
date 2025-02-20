<template>
	<div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
		<div class="flex justify-between items-start mb-4">
			<div>
				<h2 class="text-xl font-semibold">{{ meal.name }}</h2>
				<div class="flex items-center gap-2 mt-1">
					<font-awesome-icon
						icon="clock"
						class="text-blue-500 w-4 h-4"
					/>
					<p class="text-sm text-slate-500">{{ meal.time }}</p>
				</div>
			</div>
			<div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 text-sm">
				<div class="flex items-center gap-1 text-slate-500">
					<font-awesome-icon
						icon="utensils"
						class="text-orange-500 w-4 h-4"
					/>
					<span>{{ meal.recipe.cookingTime }} мин</span>
				</div>
				<div class="flex items-center gap-1 text-slate-500" v-if="!isSingleUser">
					<font-awesome-icon
						icon="users"
						class="text-purple-500 w-4 h-4"
					/>
					<span>{{ meal.recipe.portionCount }} порц.</span>
				</div>
			</div>
		</div>

		<!-- Информация о порциях (только для семьи) -->
		<div
			v-if="!isSingleUser"
			class="bg-slate-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6"
		>
			<div class="text-sm font-medium mb-2 sm:mb-3">Порции:</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
				<div
					v-for="portion in meal.portions"
					:key="portion.memberName"
					class="flex justify-between items-center bg-white rounded-lg p-2 sm:p-3"
				>
					<span class="text-sm text-slate-600">{{ portion.memberName }}</span>
					<span class="text-sm font-medium text-slate-800">{{ portion.portion }}x</span>
				</div>
			</div>
		</div>

		<!-- Сложность рецепта -->
		<div class="flex items-center gap-2 mb-4 sm:mb-6">
			<font-awesome-icon
				icon="chart-simple"
				class="text-green-500 w-4 h-4"
			/>
			<div class="text-sm text-slate-500">Сложность:</div>
			<div class="flex gap-1">
				<div
					v-for="n in 3"
					:key="n"
					class="w-2 h-2 rounded-full"
					:class="[
            n <= getComplexityLevel(meal.recipe.complexity)
              ? 'bg-green-500'
              : 'bg-slate-200'
          ]"
				></div>
			</div>
		</div>

		<div class="flex gap-3">
			<BaseButton
				variant="secondary"
				class="flex-1 justify-center"
				@click="startCooking"
			>
				<font-awesome-icon icon="fire" class="text-slate-700 mr-2" />
				Начать готовить
			</BaseButton>
			<BaseButton
				variant="outline"
				class="flex-1 justify-center"
				@click="viewRecipe"
			>
				<font-awesome-icon icon="book-open" class="text-slate-600 mr-2" />
				Рецепт
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();

const props = defineProps<{
	meal: {
		time: string;
		name: string;
		recipe: {
			id: string;
			name: string;
			cookingTime: number;
			portionCount: number;
			complexity: 'easy' | 'medium' | 'hard';
		};
		portions: Array<{
			memberName: string;
			portion: number;
		}>;
	};
	isSingleUser: boolean;
}>();

const getComplexityLevel = (complexity: 'easy' | 'medium' | 'hard') => {
	const levels = {
		easy: 1,
		medium: 2,
		hard: 3
	};
	return levels[complexity];
};

const startCooking = () => {
	router.push(`/recipes/${props.meal.recipe.id}/cooking`);
};

const viewRecipe = () => {
	router.push(`/recipes/${props.meal.recipe.id}`);
};
</script>
