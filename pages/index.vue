<template>
	<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 relative overflow-hidden">
		<!-- Декоративные элементы на заднем плане -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Левый верхний угол -->
			<span
				class="absolute top-12 left-12 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-lg"></span>
			<span
				class="absolute top-24 left-24 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>

			<!-- Правый верхний угол -->
			<span
				class="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-15 blur-md"></span>
			<span
				class="absolute top-36 right-36 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>

			<!-- Левый нижний угол -->
			<span
				class="absolute bottom-24 left-32 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-15"></span>
			<span
				class="absolute bottom-16 left-16 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"></span>

			<!-- Правый нижний угол -->
			<span
				class="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-10 blur-lg"></span>
			<span
				class="absolute bottom-32 right-32 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
			<!-- Заголовок -->
			<div class="text-center mb-16 space-y-6 relative z-10">
				<!-- Декоративный элемент сверху -->
				<div class="flex justify-center mb-8">
					<div
						class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 relative">
						<!-- Декоративные элементы вокруг бейджа -->
						<span
							class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
						<span
							class="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>

						<font-awesome-icon icon="utensils" class="mr-2 animate-bounce"/>
						<span class="text-sm font-medium">Умное планирование питания</span>
					</div>
				</div>

				<!-- Основной заголовок с градиентом -->
				<h1 class="relative">
					<span
						class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text inline-block">
						Планировщик меню
					</span>
					<!-- Декоративные элементы вокруг заголовка -->
					<span
						class="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
					<span
						class="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>
					<span
						class="absolute top-2 right-8 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"></span>
					<span
						class="absolute bottom-2 left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-20"></span>
				</h1>

				<!-- Подзаголовок -->
				<div class="space-y-4 relative">
					<!-- Декоративные элементы вокруг описания -->
					<span
						class="absolute -top-8 right-1/4 w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
					<span
						class="absolute -bottom-8 left-1/4 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>

					<p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Давайте создадим ваше идеальное меню на неделю, учитывая все ваши предпочтения и особенности
					</p>

					<!-- Преимущества -->
					<div class="flex justify-center gap-8 mt-8 relative">
						<!-- Декоративные элементы для секции преимуществ -->
						<span
							class="absolute -top-4 left-1/3 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
						<span
							class="absolute -bottom-4 right-1/3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>

						<div class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
							<font-awesome-icon icon="clock" class="mr-2"/>
							<span class="text-sm">Экономия времени</span>
						</div>
						<div
							class="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300">
							<font-awesome-icon icon="shield-halved" class="mr-2"/>
							<span class="text-sm">Здоровое питание</span>
						</div>
						<div class="flex items-center text-gray-600 hover:text-pink-600 transition-colors duration-300">
							<font-awesome-icon icon="globe" class="mr-2"/>
							<span class="text-sm">Разнообразные блюда</span>
						</div>
					</div>
				</div>

				<!-- Декоративная линия -->
				<div class="flex justify-center relative">
<span
	class="absolute -left-4 top-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
					<div class="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
					<span
						class="absolute -right-4 top-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>
				</div>
			</div>

			<!-- Форма -->
			<FoodPreferencesForm/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style>
/* Добавляем плавающую анимацию для декоративных элементов */
@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0px);
	}
}

.absolute {
	animation: float 6s ease-in-out infinite;
}

/* Разные задержки для создания эффекта волны */
.absolute:nth-child(odd) {
	animation-delay: 0s;
}

.absolute:nth-child(even) {
	animation-delay: 2s;
}
</style>
