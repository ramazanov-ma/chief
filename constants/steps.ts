﻿export const FORM_STEPS = {
	BASIC_INFO: 1,
	COOKING_EXPERIENCE: 2,
	FAVORITE_CUISINES: 3,
	DIETARY_INFO: 4,
	COOKING_TIME: 5,
	BUDGET: 6,
	SHOPPING_FREQUENCY: 7,
	TOTAL: 7,
	FORM_PROGRESS_KEY: 'FormProgress',
} as const;

export type FormStep = typeof FORM_STEPS[keyof typeof FORM_STEPS];
