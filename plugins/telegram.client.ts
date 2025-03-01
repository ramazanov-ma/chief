import { ref, computed } from 'vue'
import { defineNuxtPlugin } from "nuxt/app";
import { WebApp, TelegramUser } from '@/types/telegram'

export default defineNuxtPlugin((nuxtApp) => {
	const telegramWebApp = ref<WebApp | null>(null)

	if (process.client && typeof window !== 'undefined') {
		// Проверяем доступность Telegram Web App
		if (window.Telegram?.WebApp) {
			telegramWebApp.value = window.Telegram.WebApp

			// Сообщаем Telegram, что приложение готово
			window.Telegram.WebApp.ready()

			// Настраиваем внешний вид в соответствии с Telegram
			const colorScheme = window.Telegram.WebApp.colorScheme
			document.documentElement.setAttribute('data-theme', colorScheme)

			// Обработка изменения темы
			window.Telegram.WebApp.onEvent('themeChanged', () => {
				document.documentElement.setAttribute('data-theme', window.Telegram.WebApp.colorScheme)
			})
		}
	}

	const telegramService = {
		isAvailable: computed(() => !!telegramWebApp.value),
		webApp: telegramWebApp,

		getUserData(): TelegramUser | null {
			if (!telegramWebApp.value) return null
			return telegramWebApp.value.initDataUnsafe?.user || null
		},

		getInitData(): string | null {
			if (!telegramWebApp.value) return null
			return telegramWebApp.value.initData || null
		},

		showBackButton(show: boolean = true): void {
			if (!telegramWebApp.value) return
			telegramWebApp.value.BackButton.isVisible = show
		},

		showMainButton(params: { text: string; onClick: () => void }): void {
			if (!telegramWebApp.value) return
			telegramWebApp.value.MainButton.text = params.text
			telegramWebApp.value.MainButton.onClick(params.onClick)
			telegramWebApp.value.MainButton.show()
		},

		hideMainButton(): void {
			if (!telegramWebApp.value) return
			telegramWebApp.value.MainButton.hide()
		},

		async authenticate(): Promise<any | null> {
			if (!telegramWebApp.value) return null

			try {
				const user = telegramWebApp.value.initDataUnsafe?.user
				const initData = telegramWebApp.value.initData

				if (!user || !initData) return null

				// Отправляем данные на сервер для аутентификации
				const response = await fetch('/api/telegram/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						initData,
						user: {
							id: user.id,
							firstName: user.first_name,
							lastName: user.last_name,
							username: user.username,
							languageCode: user.language_code
						}
					})
				})

				if (!response.ok) {
					throw new Error('Authentication failed')
				}

				const data = await response.json()

				// Сохраняем токен в localStorage
				localStorage.setItem('token', data.token)

				return data
			} catch (error) {
				console.error('Telegram auth error:', error)
				return null
			}
		}
	}

	return {
		provide: {
			telegram: telegramService
		}
	}
})
