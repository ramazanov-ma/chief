export interface FormData {
	name: string;
	age: number | null;
	cookingExperience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	cuisines: string[];
	restrictions: string[];
	caloriesPreference: {
		min: number;
		max: number;
	};
	cookingTime: number;
	shoppingFrequency: 'once' | 'twice' | 'daily';
	budget: number;
}
