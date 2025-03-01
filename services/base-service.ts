import api from './api'
import { AxiosRequestConfig } from 'axios'

export interface PaginationParams {
	page: number
	limit: number
}

export interface PaginatedResponse<T> {
	items: T[]
	total: number
	page: number
	pageSize: number
	totalPages: number
}

export abstract class BaseService<T> {
	protected baseUrl: string

	constructor(endpoint: string) {
		this.baseUrl = endpoint
	}

	// Получение всех записей
	async getAll(config?: AxiosRequestConfig): Promise<T[]> {
		const response = await api.get<T[]>(this.baseUrl, config)
		return response.data
	}

	// Получение с пагинацией
	async getPaginated(params: PaginationParams): Promise<PaginatedResponse<T>> {
		const response = await api.get<PaginatedResponse<T>>(this.baseUrl, { params })
		return response.data
	}

	// Получение по ID
	async getById(id: number | string): Promise<T> {
		const response = await api.get<T>(`${this.baseUrl}/${id}`)
		return response.data
	}

	// Создание записи
	async create(data: Partial<T>): Promise<T> {
		const response = await api.post<T>(this.baseUrl, data)
		return response.data
	}

	// Обновление записи
	async update(id: number | string, data: Partial<T>): Promise<T> {
		const response = await api.put<T>(`${this.baseUrl}/${id}`, data)
		return response.data
	}

	// Удаление записи
	async delete(id: number | string): Promise<void> {
		await api.delete(`${this.baseUrl}/${id}`)
	}
}
