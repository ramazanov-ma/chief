import { ComputedRef, Ref, computed } from 'vue'
import { useNuxtApp } from "nuxt/app";
import { WebApp, TelegramUser } from "@/types/telegram";

export const useTelegram = () => {
	type NuxtAppWithTelegram = ReturnType<typeof useNuxtApp> & {
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

	const app = useNuxtApp() as NuxtAppWithTelegram
	const { $telegram } = app

	const isInTelegram = computed(() => $telegram.isAvailable)
	const userData = computed(() => $telegram.getUserData())

	const authenticate = async () => {
		return await $telegram.authenticate()
	}

	return {
		isInTelegram,
		userData,
		authenticate,
		showMainButton: $telegram.showMainButton,
		hideMainButton: $telegram.hideMainButton,
		showBackButton: $telegram.showBackButton
	}
}
