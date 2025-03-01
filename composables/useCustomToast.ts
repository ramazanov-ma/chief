import { useNuxtApp } from "nuxt/app";
import { Toast } from '@/plugins/toast.client'

export function useCustomToast() {
	const { $toast } = useNuxtApp()
	return $toast as Toast
}
