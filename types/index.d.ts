import { ComputedRef, Ref } from 'vue'
import { WebApp, Telegram } from './telegram'

// Определяем тип TelegramUser, если он не определен в ./telegram
export interface TelegramUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	language_code?: string
	is_premium?: boolean
	photo_url?: string
}

// Расширяем NuxtApp для добавления $telegram
declare module '#app' {
	interface NuxtApp {
		$telegram: {
			isAvailable: ComputedRef<boolean>
			webApp: Ref<WebApp | null>
			getUserData(): TelegramUser | null
			getInitData(): string | null
			showBackButton(show?: boolean): void
			showMainButton(params: { text: string; onClick: () => void }): void
			hideMainButton(): void
			authenticate(): Promise<any | null>
		}
	}
}

// Расширяем Vue компонентные свойства для $telegram
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$telegram: {
			isAvailable: ComputedRef<boolean>
			webApp: Ref<WebApp | null>
			getUserData(): TelegramUser | null
			getInitData(): string | null
			showBackButton(show?: boolean): void
			showMainButton(params: { text: string; onClick: () => void }): void
			hideMainButton(): void
			authenticate(): Promise<any | null>
		}
	}
}

// Определяем глобальный объект window для Telegram
declare global {
	interface Window {
		Telegram: Telegram
	}
}

export {}
