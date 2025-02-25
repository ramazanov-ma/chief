import { scalarOptions } from "yaml";
import Str = scalarOptions.Str;

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

export interface Recipe {
	id: string;
	name: string;
	cookingTime: number;
	portionCount: number;
	complexity: Complexity;
}

export interface Portion {
	memberName: string;
	portion: number;
}

export enum MealType {
	BREAKFAST,
	LUNCH,
	SNACK,
	DINNER,
}

export interface Meal {
	id: number;
	type: MealType;
	time: string;
	name: string;
	description: string;
	emoji: string;
	calories: number;
	recipe: Recipe;
	portions: Array<Portion>;
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
