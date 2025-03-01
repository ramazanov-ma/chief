import { BaseService } from './base-service'
import api from './api'

// Типы данных
export interface MenuItem {
	id: number
	name: string
	description?: string
	price: number
	imageUrl?: string
	categoryId: number
	isAvailable: boolean
}

export interface Category {
	id: number
	name: string
	description?: string
	sortOrder: number
	items: MenuItem[]
}

export interface Menu {
	id: number
	name: string
	description?: string
	isActive: boolean
	categories: Category[]
}

// Сервис для работы с меню
export class MenuService extends BaseService<Menu> {
	constructor() {
		super('/menus')
	}

	// Специфические методы для меню

	/**
	 * Получает активное меню
	 */
	async getActiveMenu(): Promise<Menu> {
		const response = await api.get<Menu>(`${this.baseUrl}/active`)
		return response.data
	}

	/**
	 * Активирует указанное меню
	 */
	async activateMenu(id: number): Promise<Menu> {
		const response = await api.post<Menu>(`${this.baseUrl}/${id}/activate`)
		return response.data
	}

	/**
	 * Добавляет категорию в меню
	 */
	async addCategory(menuId: number, category: Omit<Category, 'id'>): Promise<Category> {
		const response = await api.post<Category>(`${this.baseUrl}/${menuId}/categories`, category)
		return response.data
	}

	/**
	 * Добавляет товар в категорию
	 */
	async addMenuItem(
		menuId: number,
		categoryId: number,
		item: Omit<MenuItem, 'id' | 'categoryId'>
	): Promise<MenuItem> {
		const response = await api.post<MenuItem>(
			`${this.baseUrl}/${menuId}/categories/${categoryId}/items`,
			item
		)
		return response.data
	}
}

// Экземпляр сервиса для использования в приложении
export const menuService = new MenuService()
