<template>
	<div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
		<div class="flex justify-between items-start mb-4">
			<div class="flex items-center gap-2">
				<font-awesome-icon
					icon="utensils"
					class="text-orange-500 w-5 h-5"
				/>
				<h2 class="text-xl font-semibold">{{ meal.name }} - {{ meal.time }}</h2>
			</div>
			<!--			<div-->
			<!--				v-if="!isSingleUser"-->
			<!--				class="flex gap-4 text-sm"-->
			<!--			>-->
			<!--				<div class="flex items-center gap-1 text-slate-500" >-->
			<!--					<font-awesome-icon-->
			<!--						icon="users"-->
			<!--						class="text-purple-500 w-4 h-4"-->
			<!--					/>-->
			<!--					<span>{{ meal.recipe.portionCount }} порц.</span>-->
			<!--				</div>-->
			<!--			</div>-->
		</div>

		<!-- Информация о порциях (только для семьи) -->
		<!--		<div-->
		<!--			v-if="!isSingleUser"-->
		<!--			class="bg-slate-50 rounded-xl p-3 mb-4"-->
		<!--		>-->
		<!--			<div class="text-sm font-medium mb-2 sm:mb-3">Порции:</div>-->
		<!--			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">-->
		<!--				<div-->
		<!--					v-for="portion in meal.portions"-->
		<!--					:key="portion.memberName"-->
		<!--					class="flex justify-between items-center bg-white rounded-lg p-2 sm:p-3"-->
		<!--				>-->
		<!--					<span class="text-sm text-slate-600">{{ portion.memberName }}</span>-->
		<!--					<span class="text-sm font-medium text-slate-800">{{ portion.portion }}x</span>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->

		<div>
			<div class="flex items-start justify-between space-x-2">
				<MealTitle title="Стейк из лосося"/>
			</div>
			<MealDescription description="С гарниром из киноа и свежих овощей"/>
		</div>

		<div class="flex gap-4 mb-4">
			<CaloriesBadge :calories="325"/>
			<CookingTimeBadge :time="meal.recipe.cookingTime"/>
			<ComplexityIndicator
				text-class="font-medium text-gray-700"
				:complexity="Complexity.MEDIUM"
			/>
		</div>

		<div class="flex gap-3">
			<BaseButton
				variant="secondary"
				class="flex-1 justify-center"
				@click="startCooking"
			>
				<font-awesome-icon icon="fire" class="text-slate-700 mr-2"/>
				Начать готовить
			</BaseButton>
			<BaseButton
				variant="outline"
				class="flex-1 justify-center"
				@click="viewRecipe"
			>
				<font-awesome-icon icon="book-open" class="text-slate-600 mr-2"/>
				Рецепт
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ComplexityIndicator from "@/components/ui/ComplexityIndicator.vue";
import { Complexity, Meal } from "@/types/menu";
import CookingTimeBadge from "@/components/ui/CookingTimeBadge.vue";
import CaloriesBadge from "@/components/ui/CaloriesBadge.vue";
import MealTitle from "@/components/ui/MealTitle.vue";
import MealDescription from "@/components/ui/MealDescription.vue";

const router = useRouter();

const props = defineProps<{
	meal: Meal;
	isSingleUser: boolean;
}>();

const startCooking = () => {
	router.push(`/recipes/${props.meal.recipe.id}/cooking`);
};

const viewRecipe = () => {
	router.push(`/recipes/${props.meal.recipe.id}`);
};
</script>
