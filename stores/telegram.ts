import { defineStore } from 'pinia'
import { useNuxtApp } from "nuxt/app";
import TelegramService from "@/services/telegram";

interface TelegramState {
	isAuthenticated: boolean
	user: {
		id: number
		telegramId: number
		firstName: string
		lastName?: string
		username?: string
		role: string
	} | null
	loading: boolean
	error: string | null
	connectionStatus: 'success' | 'error' | null
}

export const useTelegramStore = defineStore('telegram', {
	state: (): TelegramState => ({
		isAuthenticated: false,
		user: null,
		loading: false,
		error: null,
		connectionStatus: null
	}),

	getters: {
		isAdmin: (state) => state.user?.role === 'admin',
		isManager: (state) => state.user?.role === 'manager' || state.user?.role === 'admin',
	},

	actions: {
		/**
		 * Инициализация данных Telegram
		 */
		async init() {
			// Проверка наличия сохраненного токена
			const token = localStorage.getItem('token')
			if (token) {
				this.isAuthenticated = true
				// TODO: Сделать запрос для получения данных по токену
			}
		},

		/**
		 * Аутентификация через Telegram
		 */
		async authenticate() {
			try {
				this.loading = true
				this.error = null

				const nuxtApp = useNuxtApp();
				const $telegram = nuxtApp.$telegram as { webApp: any };
				const telegramService = new TelegramService($telegram.webApp)

				const result = await telegramService.authenticate()

				if (result) {
					this.isAuthenticated = true
					this.user = result.user
				} else {
					this.error = 'Не удалось авторизоваться через Telegram'
				}
			} catch (error: any) {
				this.error = error.message || 'Произошла ошибка при авторизации'
			} finally {
				this.loading = false
			}
		},

		/**
		 * Тестовое соединение с API
		 */
		async testConnection() {
			try {
				this.loading = true
				this.connectionStatus = null
				this.error = null

				const nuxtApp = useNuxtApp();
				const $telegram = nuxtApp.$telegram as { webApp: any };
				const telegramService = new TelegramService($telegram.webApp)

				await telegramService.testConnection()

				this.connectionStatus = 'success'
			} catch (error: any) {
				this.connectionStatus = 'error'
				this.error = error.message || 'Не удалось проверить соединение с сервером'
			} finally {
				this.loading = false
			}
		},

		/**
		 * Выход из системы
		 */
		logout() {
			this.isAuthenticated = false
			this.user = null
			localStorage.removeItem('token')
		}
	}
})
