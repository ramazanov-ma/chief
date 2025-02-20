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
				'spin-slow': 'spin 8s linear infinite',
			},
			keyframes: {
				float: {
					'0%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
					'25%': { opacity: '1' },
					'75%': { opacity: '1' },
					'100%': { transform: 'translate(0, -100px) scale(0.5)', opacity: '0' }
				}
			}
		}
	},
	safelist: [
		'bg-blue-50',
		'bg-pink-50',
		'bg-purple-50',
		'bg-slate-100',
		'group-hover:bg-blue-100',
		'group-hover:bg-pink-100',
		'group-hover:bg-purple-100',
		'text-blue-500',
		'text-pink-500',
		'text-purple-500',
	],
};
