export enum DayState {
	PAST = 'past',
	CURRENT = 'current',
	FUTURE = 'future'
}

export enum Complexity {
	EASY = 1,
	MEDIUM = 2,
	HARD = 3
}

export interface Meal {
	id: number;
	time: string;
	name: string;
	description: string;
	emoji: string;
	calories: number;
	cookingTime: number;
	complexity: Complexity;
}

export interface Day {
	date: string;
	meals: Meal[];
	isToday: boolean;
}

export interface DayMenu {
	date: string;
	meals: Meal[];
	state: DayState;
}
