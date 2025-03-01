export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	app: {
		head: {
			title: 'Chief - Планирование питания',
			viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
			meta: [
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				{ name: 'theme-color', content: '#ffffff' }
			],
			// Добавим иконку для PWA
			link: [
				{ rel: 'manifest', href: '/manifest.json' },
				{ rel: 'apple-touch-icon', href: '/icon-192x192.png' },
				{ rel: 'icon', type: 'image/png', href: '/icon-192x192.png' }
			],
			script: [
				{ src: 'https://telegram.org/js/telegram-web-app.js', defer: true }
			]
		}
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/css/main.css'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],

	imports: {
		dirs: ['stores']
	},

	nitro: {
		devProxy: {
			'/api': {
				target: 'http://localhost:5258/api',
				changeOrigin: true,
				prependPath: true
			}
		}
	},

	// Настройка Vite внутри Nuxt
	vite: {
		server: {
			host: '0.0.0.0',
			// Разрешаем ngrok домен
			allowedHosts: [
				'localhost',
				'a327-176-233-29-194.ngrok-free.app'
			],
		}
	},

	// Настройки сервера Nuxt
	server: {
		host: '0.0.0.0', // Слушаем на всех интерфейсах
		port: 3000 // Nuxt обычно использует порт 3000 по умолчанию
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['@fortawesome/vue-fontawesome']
	},

	typescript: {
		strict: true,
		typeCheck: true
	},

	compatibilityDate: '2025-01-28'
};
