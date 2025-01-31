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
	},
	safelist: [
		'bg-blue-50',
		'bg-pink-50',
		'bg-purple-50',
		'group-hover:bg-blue-100',
		'group-hover:bg-pink-100',
		'group-hover:bg-purple-100',
		'text-blue-500',
		'text-pink-500',
		'text-purple-500',
	],
};
