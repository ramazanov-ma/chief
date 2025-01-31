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
import { FORM_STEPS, type FormStep } from '@/constants/steps';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import BasicInfo from './steps/BasicInfo.vue';
import CulinaryProfile from './steps/CulinaryProfile.vue';
import DietaryInfo from './steps/DietaryInfo.vue';
import Planning from './steps/Planning.vue';
import StepButtons from '@/components/navigation/StepButtons.vue';

const currentStep = ref<number>(FORM_STEPS.BASIC_INFO);
const totalSteps = FORM_STEPS.TOTAL;

const defaultFormData: FormData = {
	name: '',
	age: null,
	cuisines: [],
	cookingExperience: 'beginner',
	restrictions: [],
	caloriesPreference: {
		min: 1500,
		max: 2500
	},
	cookingTime: 30,
	shoppingFrequency: 'weekly',
	budget: 5000
};

const formData = ref<FormData>({ ...defaultFormData });

const currentStepComponent = computed(() => {
	switch (currentStep.value) {
		case FORM_STEPS.BASIC_INFO:
			return BasicInfo;
		case FORM_STEPS.CULINARY_PROFILE:
			return CulinaryProfile;
		case FORM_STEPS.DIETARY_INFO:
			return DietaryInfo;
		case FORM_STEPS.PLANNING:
			return Planning;
		default:
			return BasicInfo;
	}
});

// Save progress to localStorage
const saveProgress = () => {
	localStorage.setItem(FORM_STEPS.FORM_PROGRESS_KEY, JSON.stringify({
		currentStep: currentStep.value,
		formData: formData.value
	}));
};

// Load progress from localStorage
const loadProgress = () => {
	const savedProgress = localStorage.getItem(FORM_STEPS.FORM_PROGRESS_KEY);

	if (savedProgress) {
		const { currentStep: savedStep, formData: savedData } = JSON.parse(savedProgress);
		currentStep.value = Number(savedStep); // Convert to number here
		formData.value = savedData;
	}
};

// Now these can remain simple
const nextStep = () => {
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

// Load progress when component mounts
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
