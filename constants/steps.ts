export const FORM_STEPS = {
	BASIC_INFO: 1,
	COOKING_EXPERIENCE: 2,
	FAVORITE_CUISINES: 3,
	DIETARY_INFO: 4,
	PLANNING: 5,
	TOTAL: 5,
	FORM_PROGRESS_KEY: 'FormProgress',
} as const;

export type FormStep = typeof FORM_STEPS[keyof typeof FORM_STEPS];
