import { defineNuxtPlugin } from "nuxt/app";

interface ToastOptions {
	duration?: number
	position?: 'top' | 'bottom'
	closable?: boolean
}

export interface Toast {
	success: (message: string, options?: ToastOptions) => void
	error: (message: string, options?: ToastOptions) => void
	info: (message: string, options?: ToastOptions) => void
	warning: (message: string, options?: ToastOptions) => void
	clear: () => void
}

export default defineNuxtPlugin(() => {
	let activeToasts: HTMLElement[] = []

	const toast: Toast = {
		success(message, options = {}) {
			showToast(message, 'success', options)
		},
		error(message, options = {}) {
			showToast(message, 'error', options)
		},
		info(message, options = {}) {
			showToast(message, 'info', options)
		},
		warning(message, options = {}) {
			showToast(message, 'warning', options)
		},
		clear() {
			activeToasts.forEach(el => {
				if (document.body.contains(el)) {
					document.body.removeChild(el)
				}
			})
			activeToasts = []
		}
	}

	function showToast(
		message: string,
		type: 'success' | 'error' | 'info' | 'warning',
		options: ToastOptions
	) {
		const {
			duration = 3000,
			position = 'top',
			closable = true
		} = options

		// Создаем контейнер для уведомления
		const toastEl = document.createElement('div')
		toastEl.className = `toast toast-${type} toast-${position}`

		// Добавляем стили
		Object.assign(toastEl.style, {
			position: 'fixed',
			left: '50%',
			transform: 'translateX(-50%)',
			backgroundColor: getBackgroundColor(type),
			color: '#fff',
			padding: '12px 20px',
			borderRadius: '6px',
			boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
			zIndex: '9999',
			minWidth: '250px',
			maxWidth: '90%',
			textAlign: 'center',
			transition: 'all 0.3s ease',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
		})

		// Выставляем позицию
		if (position === 'top') {
			toastEl.style.top = '20px'
		} else {
			toastEl.style.bottom = '20px'
		}

		// Создаем содержимое уведомления
		const messageEl = document.createElement('div')
		messageEl.textContent = message
		toastEl.appendChild(messageEl)

		// Добавляем кнопку закрытия (если нужно)
		if (closable) {
			const closeBtn = document.createElement('button')
			closeBtn.innerHTML = '&times;'
			closeBtn.style.background = 'transparent'
			closeBtn.style.border = 'none'
			closeBtn.style.color = 'white'
			closeBtn.style.fontSize = '16px'
			closeBtn.style.marginLeft = '10px'
			closeBtn.style.cursor = 'pointer'
			closeBtn.style.padding = '0 5px'

			closeBtn.addEventListener('click', () => {
				toastEl.style.opacity = '0'
				setTimeout(() => {
					if (document.body.contains(toastEl)) {
						document.body.removeChild(toastEl)
						activeToasts = activeToasts.filter(t => t !== toastEl)
					}
				}, 300)
			})

			toastEl.appendChild(closeBtn)
		}

		// Добавляем в DOM и отслеживаем
		document.body.appendChild(toastEl)
		activeToasts.push(toastEl)

		// Автоматическое скрытие через указанное время
		setTimeout(() => {
			toastEl.style.opacity = '0'
			setTimeout(() => {
				if (document.body.contains(toastEl)) {
					document.body.removeChild(toastEl)
					activeToasts = activeToasts.filter(t => t !== toastEl)
				}
			}, 300)
		}, duration)
	}

	function getBackgroundColor(type: string) {
		switch(type) {
			case 'success': return '#10b981'
			case 'error': return '#ef4444'
			case 'info': return '#3b82f6'
			case 'warning': return '#f59e0b'
			default: return '#333333'
		}
	}

	return {
		provide: {
			toast
		}
	}
})
