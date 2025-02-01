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
				{ rel: 'apple-touch-icon', href: '/icon-192x192.png' }
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

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['@fortawesome/vue-fontawesome']
	},

	compatibilityDate: '2025-01-28'
};
