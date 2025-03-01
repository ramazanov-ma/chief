import { defineStore } from 'pinia'
import { useNuxtApp } from "nuxt/app";
import { menuService, Menu } from '@/services/menuService'
import { Toast } from '@/plugins/toast.client'

interface MenuState {
	menus: Menu[]
	currentMenu: Menu | null
	loading: boolean
	error: string | null
	activeFilter: string | null
}

export const useMenuStore = defineStore('menu', {
	state: (): MenuState => ({
		menus: [],
		currentMenu: null,
		loading: false,
		error: null,
		activeFilter: null
	}),

	getters: {
		// Получение категорий текущего меню
		categories: (state) => state.currentMenu?.categories || [],

		// Фильтрация категорий
		filteredCategories: (state) => {
			if (!state.activeFilter) return state.currentMenu?.categories || []

			return state.currentMenu?.categories.filter(category => {
				return category.items.some(item =>
					item.name.toLowerCase().includes(state.activeFilter!.toLowerCase())
				)
			}) || []
		},
	},

	actions: {
		/**
		 * Загрузка списка меню
		 */
		async fetchMenus() {
			try {
				this.loading = true
				this.error = null

				this.menus = await menuService.getAll()
			} catch (error: any) {
				this.error = error.message || 'Не удалось загрузить список меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
			} finally {
				this.loading = false
			}
		},

		/**
		 * Загрузка конкретного меню
		 */
		async fetchMenu(id: number) {
			try {
				this.loading = true
				this.error = null

				this.currentMenu = await menuService.getById(id)
			} catch (error: any) {
				this.error = error.message || 'Не удалось загрузить меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
			} finally {
				this.loading = false
			}
		},

		/**
		 * Загрузка активного меню
		 */
		async fetchActiveMenu() {
			try {
				this.loading = true
				this.error = null

				this.currentMenu = await menuService.getActiveMenu()
			} catch (error: any) {
				this.error = error.message || 'Не удалось загрузить активное меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
			} finally {
				this.loading = false
			}
		},

		/**
		 * Создание нового меню
		 */
		async createMenu(menu: Omit<Menu, 'id'>) {
			try {
				this.loading = true
				this.error = null

				const newMenu = await menuService.create(menu)
				this.menus.push(newMenu)

				const { $toast } = useNuxtApp();
				($toast as Toast).success('Меню успешно создано')

				return newMenu
			} catch (error: any) {
				this.error = error.message || 'Не удалось создать меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
				throw error
			} finally {
				this.loading = false
			}
		},

		/**
		 * Обновление существующего меню
		 */
		async updateMenu(id: number, data: Partial<Menu>) {
			try {
				this.loading = true
				this.error = null

				const updatedMenu = await menuService.update(id, data)

				// Обновляем данные в сторе
				const index = this.menus.findIndex(m => m.id === id)
				if (index !== -1) {
					this.menus[index] = updatedMenu
				}

				if (this.currentMenu?.id === id) {
					this.currentMenu = updatedMenu
				}

				const { $toast } = useNuxtApp();
				($toast as Toast).success('Меню успешно обновлено')

				return updatedMenu
			} catch (error: any) {
				this.error = error.message || 'Не удалось обновить меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
				throw error
			} finally {
				this.loading = false
			}
		},

		/**
		 * Удаление меню
		 */
		async deleteMenu(id: number) {
			try {
				this.loading = true
				this.error = null

				await menuService.delete(id)

				// Удаляем из стора
				this.menus = this.menus.filter(menu => menu.id !== id)

				if (this.currentMenu?.id === id) {
					this.currentMenu = null
				}

				const { $toast } = useNuxtApp();
				($toast as Toast).success('Меню успешно удалено');
			} catch (error: any) {
				this.error = error.message || 'Не удалось удалить меню'
				const { $toast } = useNuxtApp();
				($toast as Toast).error(this.error ?? '')
				throw error
			} finally {
				this.loading = false
			}
		},

		/**
		 * Установка фильтра
		 */
		setFilter(filter: string | null) {
			this.activeFilter = filter
		},

		/**
		 * Сброс состояния стора
		 */
		resetState() {
			this.menus = []
			this.currentMenu = null
			this.error = null
			this.activeFilter = null
		}
	}
})
