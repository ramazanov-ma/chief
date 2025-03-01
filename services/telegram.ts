import api from './api'
import { Ref } from 'vue'
import { WebApp } from '@/types/telegram'

interface TelegramAuthData {
	initData: string
	user: {
		id: number
		firstName: string
		lastName?: string
		username?: string
		languageCode?: string
	}
}

interface AuthResponse {
	token: string
	user: {
		id: number
		telegramId: number
		firstName: string
		lastName?: string
		username?: string
		role: string
	}
}

export default class TelegramService {
	private webApp: Ref<WebApp | null>

	constructor(webApp: Ref<WebApp | null>) {
		this.webApp = webApp
	}

	/**
	 * Аутентификация через Telegram
	 */
	async authenticate(): Promise<AuthResponse | null> {
		try {
			if (!this.webApp.value) return null

			const user = this.webApp.value.initDataUnsafe?.user
			const initData = this.webApp.value.initData

			if (!user || !initData) return null

			const authData: TelegramAuthData = {
				initData,
				user: {
					id: user.id,
					firstName: user.first_name,
					lastName: user.last_name,
					username: user.username,
					languageCode: user.language_code
				}
			}

			const response = await api.post<AuthResponse>('/auth/telegram', authData)

			// Сохраняем токен в локальное хранилище
			localStorage.setItem('token', response.data.token)

			return response.data
		} catch (error) {
			console.error('Telegram auth error:', error)
			return null
		}
	}

	/**
	 * Тестовый запрос для проверки соединения
	 */
	async testConnection(): Promise<{ message: string }> {
		const response = await api.get<{ message: string }>('/telegram/test')
		return response.data
	}

	/**
	 * Настройка внешнего вида основной кнопки
	 */
	setupMainButton(text: string, color?: string, textColor?: string): void {
		if (!this.webApp.value) return

		const button = this.webApp.value.MainButton

		if (color) button.color = color
		if (textColor) button.textColor = textColor

		button.text = text
		button.show()
	}

	/**
	 * Обработчик нажатия на главную кнопку
	 */
	onMainButtonClick(callback: () => void): void {
		if (!this.webApp.value) return

		this.webApp.value.MainButton.onClick(callback)
	}
}
