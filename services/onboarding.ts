import api from './api';
import type { FormData } from '@/types/form';

export class OnboardingService {
	async save(formData: FormData) {
		try {
			const response = await api.post('/onboarding/save', formData);
			return response.data;
		} catch (error) {
			console.error('Error saving onboarding data:', error);
			throw error;
		}
	}

	async getUserData() {
		try {
			const response = await api.get('/onboarding/user-data');
			return response.data;
		} catch (error) {
			console.error('Error fetching user onboarding data:', error);
			throw error;
		}
	}

	async complete(formData: FormData) {
		try {
			const response = await api.post('/onboarding/complete', formData);
			return response.data;
		} catch (error) {
			console.error('Error completing onboarding:', error);
			throw error;
		}
	}

	async reset() {
		try {
			const response = await api.post('/onboarding/reset');
			return response.data;
		} catch (error) {
			console.error('Error resetting onboarding:', error);
			throw error;
		}
	}

	async checkStatus() {
		try {
			const response = await api.get('/onboarding/status');
			return response.data;
		} catch (error) {
			console.error('Error checking onboarding status:', error);
			throw error;
		}
	}
}

export const onboardingService = new OnboardingService();
