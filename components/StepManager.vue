<template>
	<div class="max-w-2xl mx-auto">
		<div class="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
			<div class="relative z-10 bg-white rounded-2xl p-8">
				<!-- Прогресс бар -->
				<div class="mb-6">
					<div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">
              Шаг {{ currentStep }} из {{ totalSteps }}
            </span>
						<span class="text-sm text-gray-600">
              {{ Math.round((currentStep / totalSteps) * 100) }}%
            </span>
					</div>
					<div class="h-2 bg-gray-200 rounded-full">
						<div
							class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
							:style="{ width: `${(currentStep / totalSteps) * 100}%` }"
						></div>
					</div>
				</div>

				<!-- Контент текущего шага -->
				<component
					:is="currentStepComponent"
					v-model="formData"
				/>

				<!-- Кнопки навигации -->
				<div class="flex justify-between mt-8">
					<button
						v-if="currentStep > 1"
						@click="prevStep"
						class="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
					>
						Назад
					</button>
					<button
						@click="nextStep"
						class="ml-auto px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-opacity duration-200"
					>
						{{ currentStep === totalSteps ? 'Завершить' : 'Далее' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { FormData, FormProgress } from '@/types/form';
import { FORM_STEPS, type FormStep } from '@/constants/steps';

// Импорт компонентов для каждого шага
import BasicInfo from './steps/BasicInfo.vue';
import CulinaryProfile from './steps/CulinaryProfile.vue';
import DietaryInfo from './steps/DietaryInfo.vue';
import Planning from './steps/Planning.vue';

const STORAGE_KEY = 'meal-planner-progress';
const currentStep = ref<FormStep>(FORM_STEPS.BASIC_INFO);
const totalSteps = FORM_STEPS.TOTAL;

// Инициализируем formData с дефолтными значениями
const defaultFormData: FormData = {
	// Базовая информация
	name: '',
	age: null,
	// Кулинарный профиль
	cuisines: [],
	cookingExperience: 'beginner',
	// Диетические особенности
	restrictions: [],
	caloriesPreference: {
		min: 1500,
		max: 2500
	},
	// Планирование
	cookingTime: 30,
	shoppingFrequency: 'weekly',
	budget: 5000
};

const formData = ref<FormData>({ ...defaultFormData });

// Сохранение в localStorage
const saveProgress = () => {
	const progress: FormProgress = {
		currentStep: currentStep.value,
		totalSteps,
		lastSaved: new Date().toISOString(),
		isCompleted: currentStep.value === totalSteps
	};

	localStorage.setItem(STORAGE_KEY, JSON.stringify({
		progress,
		formData: formData.value
	}));
};

// Загрузка сохраненного прогресса
const loadProgress = () => {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved) {
		try {
			const { progress, formData: savedData } = JSON.parse(saved);
			currentStep.value = progress.currentStep;
			// Объединяем сохраненные данные с дефолтными, чтобы избежать undefined
			formData.value = {
				...defaultFormData,
				...savedData
			};
		} catch (e) {
			console.error('Error loading saved progress:', e);
		}
	}
};

// Сохраняем данные при изменении шага или данных формы
watch([currentStep, formData], () => {
	saveProgress();
}, { deep: true });

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

const nextStep = () => {
	if (currentStep.value < totalSteps) {
		currentStep.value++;
		saveProgress();
	} else {
		handleFormCompletion();
	}
};

const prevStep = () => {
	if (currentStep.value > 1) {
		currentStep.value--;
		saveProgress();
	}
};

const handleFormCompletion = () => {
	saveProgress();
	emit('form-completed', formData.value);
};

const emit = defineEmits<{
	(e: 'form-completed', data: FormData): void;
}>();
</script>
