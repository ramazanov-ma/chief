import api from './api'
import { BaseService } from "@/services/baseService";

export interface OnboardingStep {
	id: string;
	completed: boolean;
	data?: any;
}

export interface OnboardingState {
	completed: boolean;
	currentStep: string;
	steps: OnboardingStep[];
}

export class OnboardingService extends BaseService<OnboardingState> {
	constructor() {
		super('/onboarding');
	}

	// Получить текущий статус onboarding пользователя
	async getStatus(): Promise<OnboardingState> {
		const response = await api.get<OnboardingState>(`${this.baseUrl}/status`);
		return response.data;
	}

	// Обновить шаг onboarding
	async updateStep(stepId: string, data: any): Promise<OnboardingStep> {
		const response = await api.post<OnboardingStep>(`${this.baseUrl}/steps/${stepId}`, { data });
		return response.data;
	}

	// Завершить onboarding
	async complete(): Promise<{ success: boolean }> {
		const response = await api.post<{ success: boolean }>(`${this.baseUrl}/complete`);
		return response.data;
	}
}

export const onboardingService = new OnboardingService();
