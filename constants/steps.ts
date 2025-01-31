export const FORM_STEPS = {
	BASIC_INFO: 1,
	CULINARY_PROFILE: 2,
	DIETARY_INFO: 3,
	PLANNING: 4,
	TOTAL: 4,
	FORM_PROGRESS_KEY: 'FormProgress',
} as const;

export type FormStep = typeof FORM_STEPS[keyof typeof FORM_STEPS];
