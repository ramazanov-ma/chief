import { defineStore } from 'pinia';
import { DayMenu, Meal } from '@/types/menu';

export const useMenuStore = defineStore('menu', {
	state: () => ({
		weekMenu: [] as DayMenu[],
		isLoading: false,
		error: null as string | null,
	}),

	actions: {
		async fetchWeekMenu(offset: number) {
			this.isLoading = true;
			try {
				// Здесь логика загрузки меню с сервера
			} catch (err) {
				this.error = err instanceof Error ? err.message : 'Ошибка загрузки меню';
			} finally {
				this.isLoading = false;
			}
		},

		getMealsForDay(date: Date): Meal[] {
			const dayMenu = this.weekMenu.find(
				day => day.date === date.toISOString().split('T')[0]
			);
			return dayMenu?.meals || [];
		},
	},
});
