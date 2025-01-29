export interface FormData {
	// Базовая информация
	name: string;
	age: number | null;

	// Кулинарный профиль
	cuisines: string[];
	cookingExperience: 'beginner' | 'intermediate' | 'advanced';

	// Диетические особенности
	restrictions: string[];
	caloriesPreference: {
		min: number;
		max: number;
	};

	// Планирование
	cookingTime: number;
	shoppingFrequency: 'daily' | 'weekly' | 'biweekly';
	budget: number;
}

export interface FormProgress {
	currentStep: number;
	totalSteps: number;
	lastSaved: string;
	isCompleted: boolean;
}
