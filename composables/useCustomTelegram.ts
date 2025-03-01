import { useNuxtApp } from "nuxt/app";
import { Ref } from 'vue'
import { WebApp } from '@/types/telegram'

export interface TelegramPlugin {
	isAvailable: boolean
	webApp: Ref<WebApp | null>
	getUserData: () => any
	getInitData: () => string
	showMainButton: (params: { text: string; onClick: () => void }) => void
	hideMainButton: () => void
	showBackButton: (show?: boolean) => void
}

export function useCustomTelegram() {
	const { $telegram } = useNuxtApp()
	return $telegram as TelegramPlugin
}
