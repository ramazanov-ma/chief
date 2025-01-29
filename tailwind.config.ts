export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {
			colors: {
				primary: '#2563eb',
				secondary: '#7c3aed'
			},
			opacity: {
				'15': '0.15',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
			},
		}
	}
};
