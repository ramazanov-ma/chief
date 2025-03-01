import axios from 'axios'
import { useNuxtApp } from "nuxt/app";
import { Toast } from '@/plugins/toast.client'

// Конфигурация API клиента
const api = axios.create({
	baseURL: process.env.NODE_ENV === 'production'
		? 'https://api.your-production-domain.com/api'
		: 'http://localhost:5258/api',
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Перехватчик запросов для добавления авторизационного токена
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')

	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

// Перехватчик ответов для обработки ошибок
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const { $toast } = useNuxtApp()

		if (error.response) {
			const { status, data } = error.response

			// Обработка ошибок авторизации
			if (status === 401) {
				localStorage.removeItem('token');

				// Явное приведение типа для устранения ошибки
				($toast as Toast).error('Сессия истекла. Пожалуйста, авторизуйтесь снова.')

				// Если не в Telegram, перенаправляем на страницу логина
				if (!window.Telegram?.WebApp) {
					window.location.href = '/login'
				}
			}
			// Обработка ошибок доступа
			else if (status === 403) {
				($toast as Toast).error('У вас нет прав для выполнения этого действия')
			}
			// Обработка отсутствия ресурса
			else if (status === 404) {
				($toast as Toast).error('Запрашиваемый ресурс не найден')
			}
			// Ошибки валидации
			else if (status === 422) {
				if (data.errors) {
					// Объединяем множественные ошибки валидации в одно сообщение
					const messages = Object.values(data.errors).flat().join(', ');
					($toast as Toast).error(messages || 'Ошибка валидации данных')
				} else {
					($toast as Toast).error(data.message || 'Ошибка валидации данных')
				}
			}
			// Серверные ошибки
			else if (status >= 500) {
				($toast as Toast).error('Произошла ошибка на сервере. Попробуйте позже.')
			}
			// Прочие ошибки
			else {
				const message = data?.message || 'Произошла ошибка при выполнении запроса';
				($toast as Toast).error(message)
			}
		}
		// Ошибки сети
		else if (error.request) {
			($toast as Toast).error('Не удалось подключиться к серверу. Проверьте подключение к интернету.')
		}
		// Другие ошибки
		else {
			($toast as Toast).error('Произошла непредвиденная ошибка.')
		}

		return Promise.reject(error)
	}
)

export default api
