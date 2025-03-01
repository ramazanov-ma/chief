export interface TelegramUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	language_code?: string
	is_premium?: boolean
	photo_url?: string
}

export interface WebApp {
	initData: string
	initDataUnsafe: {
		query_id?: string
		user?: TelegramUser
		auth_date?: number
		hash?: string
		start_param?: string
	}
	version: string
	platform: string
	colorScheme: 'light' | 'dark'
	themeParams: {
		bg_color: string
		text_color: string
		hint_color: string
		link_color: string
		button_color: string
		button_text_color: string
	}
	isExpanded: boolean
	viewportHeight: number
	viewportStableHeight: number
	headerColor: string
	backgroundColor: string

	ready: () => void
	expand: () => void
	close: () => void

	onEvent: (eventType: string, eventHandler: () => void) => void
	offEvent: (eventType: string, eventHandler: () => void) => void

	MainButton: {
		text: string
		color: string
		textColor: string
		isVisible: boolean
		isActive: boolean
		isProgressVisible: boolean
		show: () => void
		hide: () => void
		onClick: (callback: () => void) => void
		offClick: (callback: () => void) => void
		showProgress: (leaveActive: boolean) => void
		hideProgress: () => void
	}
	BackButton: {
		isVisible: boolean
		onClick: (callback: () => void) => void
		offClick: (callback: () => void) => void
		show: () => void
		hide: () => void
	}
	HapticFeedback: {
		impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
		notificationOccurred: (type: 'error' | 'success' | 'warning') => void
		selectionChanged: () => void
	}
}

// Основной интерфейс Telegram
export interface Telegram {
	WebApp: WebApp
}
