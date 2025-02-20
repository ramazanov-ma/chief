export enum DayState {
	PAST = 'past',
	CURRENT = 'current',
	FUTURE = 'future'
}

export interface Meal {
	id: number;
	time: string;
	name: string;
	description: string;
	emoji: string;
	calories: number;
	cookingTime: number;
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
