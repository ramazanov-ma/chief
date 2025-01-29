<template>
	<div class="relative overflow-hidden">
		<!-- Верхние элементы -->
		<span
			class="absolute -top-2 right-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></span>
		<span
			class="absolute top-8 -right-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15"></span>

		<!-- Левые элементы -->
		<span
			class="absolute top-1/4 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-20"></span>
		<span
			class="absolute top-1/3 left-12 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-25 animate-bounce-slow"></span>

		<!-- Правые элементы -->
		<span
			class="absolute top-1/2 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-15"></span>
		<span
			class="absolute bottom-1/4 right-8 w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"></span>

		<!-- Нижние элементы -->
		<span
			class="absolute -bottom-4 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 animate-float"></span>
		<span
			class="absolute -bottom-2 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"></span>

		<!-- Основной контент -->
		<div class="relative z-10">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
@keyframes float {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

@keyframes bounce-slow {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-5px);
	}
}

.animate-float {
	animation: float 6s ease-in-out infinite;
}

.animate-bounce-slow {
	animation: bounce-slow 4s ease-in-out infinite;
}
</style>
