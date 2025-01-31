<template>
	<div class="max-w-2xl mx-auto">
		<div class="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
			<div class="relative z-10 bg-white rounded-2xl p-8">
				<!-- Progress bar -->
				<ProgressBar
					:current-step="currentStep"
					:total-steps="totalSteps"
				/>

				<!-- Content current step -->
				<component
					:is="currentStepComponent"
					v-model="formData"
				/>

				<!-- Navigation buttons -->
				<StepButtons
					:current-step="currentStep"
					:total-steps="totalSteps"
					:is-step-valid="isCurrentStepValid"
					@next="nextStep"
					@prev="prevStep"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { FormData } from '@/types/form';
import { FORM_STEPS } from '@/constants/steps';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import StepButtons from '@/components/navigation/StepButtons.vue';

import BasicInfo from '@/components/onboarding/BasicInfo.vue';
import Servings from '@/components/onboarding/Servings.vue';
import CookingExperience from '@/components/onboarding/CookingExperience.vue';
import FavoriteCuisines from '@/components/onboarding/FavoriteCuisines.vue';
import DietaryInfo from '@/components/onboarding/DietaryInfo.vue';
import CookingTime from '@/components/onboarding/CookingTime.vue';
import ShoppingFrequency from '@/components/onboarding/ShoppingFrequency.vue';
import Budget from '@/components/onboarding/Budget.vue';

const currentStep = ref<number>(FORM_STEPS.BASIC_INFO);
const totalSteps = FORM_STEPS.TOTAL;

const defaultFormData: FormData = {
	name: '',
	age: null,
	servings: 1,
	cuisines: [],
	cookingExperience: 'beginner',
	restrictions: ['no_restrictions'],
	caloriesPreference: {
		min: 1500,
		max: 2500
	},
	cookingTime: 30,
	shoppingFrequency: 'once',
	budget: 5000
};

const formData = ref<FormData>(structuredClone(defaultFormData));

const currentStepComponent = computed(() => {
	switch (currentStep.value) {
		case FORM_STEPS.BASIC_INFO:
			return BasicInfo;
		case FORM_STEPS.COOKING_EXPERIENCE:
			return CookingExperience;
		case FORM_STEPS.FAVORITE_CUISINES:
			return FavoriteCuisines;
		case FORM_STEPS.SERVINGS:
			return Servings;
		case FORM_STEPS.DIETARY_INFO:
			return DietaryInfo;
		case FORM_STEPS.COOKING_TIME:
			return CookingTime;
		case FORM_STEPS.BUDGET:
			return Budget;
		case FORM_STEPS.SHOPPING_FREQUENCY:
			return ShoppingFrequency;
		default:
			return BasicInfo;
	}
});

const isCurrentStepValid = computed(() => {
	if (currentStep.value === FORM_STEPS.BASIC_INFO) {
		return formData.value.name?.length > 0 && formData.value.age !== null;
	}

	if (currentStep.value === FORM_STEPS.COOKING_EXPERIENCE) {
		return formData.value.cookingExperience?.length > 0;
	}

	if (currentStep.value === FORM_STEPS.FAVORITE_CUISINES) {
		return formData.value.cuisines.length > 0;
	}

	return true;
});

const saveProgress = () => {
	localStorage.setItem(FORM_STEPS.FORM_PROGRESS_KEY, JSON.stringify({
		currentStep: currentStep.value,
		formData: formData.value
	}));
};

const loadProgress = () => {
	const savedProgress = localStorage.getItem(FORM_STEPS.FORM_PROGRESS_KEY);

	if (savedProgress) {
		const { currentStep: savedStep, formData: savedData } = JSON.parse(savedProgress);
		currentStep.value = Number(savedStep);
		formData.value = savedData;
	}
};

const nextStep = () => {
	if (!isCurrentStepValid.value) return;

	if (currentStep.value < totalSteps) {
		currentStep.value++;
		saveProgress();
	}
};

const prevStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
		saveProgress();
	}
};

onMounted(() => {
	loadProgress();
});

watch([currentStep, formData], () => {
	saveProgress();
}, { deep: true });

const handleFormCompletion = () => {
	saveProgress();
	emit('form-completed', formData.value);
};

const emit = defineEmits<{
	(e: 'form-completed', data: FormData): void;
}>();
</script>
