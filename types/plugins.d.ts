import { Toast } from '@/plugins/toast.client'
import { WebApp } from '@/types/telegram'
import { Ref } from 'vue'

declare module '#app' {
	interface NuxtApp {
		$toast: Toast
		$telegram: {
			isAvailable: boolean
			webApp: Ref<WebApp | null>
			getUserData: () => any
			getInitData: () => string
			showMainButton: (params: { text: string; onClick: () => void }) => void
			hideMainButton: () => void
			showBackButton: (show?: boolean) => void
		}
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$toast: Toast
		$telegram: {
			isAvailable: boolean
			webApp: Ref<WebApp | null>
			getUserData: () => any
			getInitData: () => string
			showMainButton: (params: { text: string; onClick: () => void }) => void
			hideMainButton: () => void
			showBackButton: (show?: boolean) => void
		}
	}
}
