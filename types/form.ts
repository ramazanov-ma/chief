export interface FormData {
	name: string;
	age: number | null;

	cuisines: string[];
	cookingExperience: 'beginner' | 'intermediate' | 'advanced';

	restrictions: string[];
	caloriesPreference: {
		min: number;
		max: number;
	};

	cookingTime: number;
	shoppingFrequency: 'daily' | 'weekly' | 'biweekly';
	budget: number;
}
