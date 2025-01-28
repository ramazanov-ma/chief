<template>
	<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 relative overflow-hidden">
		<!-- Декоративные элементы на заднем плане -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Левый верхний угол -->
			<span
				class="absolute top-12 left-12 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-lg"></span>
			<span
				class="absolute top-24 left-24 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
			></span>

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
					<!-- Декоративные элементы вокруг бейджа -->
					<span
						class="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
					<span
						class="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>
					<div
						class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 relative">
						<font-awesome-icon icon="utensils" class="mr-2 animate-bounce"/>
						<span class="text-sm font-medium">Умное планирование питания</span>
					</div>
				</div>

				<!-- Основной заголовок с градиентом -->
				<h1 class="relative">
					<span
						class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
						Планировщик меню
					</span>
				</h1>

				<!-- Декоративные элементы вокруг заголовка -->
				<span
					class="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
				<span
					class="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>
				<span
					class="absolute top-2 right-8 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"></span>
				<span
					class="absolute bottom-2 left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-20"></span>

				<!-- Подзаголовок -->
				<div class="space-y-4">
					<p class="text-xl text-gray-600 max-w-2xl mx-auto leading-tight">
						Давайте создадим ваше идеальное меню на неделю с учетом <br/>всех ваших предпочтений и
						особенностей
					</p>
					<p class="text-sm text-blue-600 font-medium leading-tight">
						Сервис поможет спланировать закупку продуктов наперёд и сэкономить ваш бюджет
					</p>
				</div>

				<!-- Декоративная линия перед дополнительным описанием -->
				<div class="flex justify-center">
					<div
						class="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
				</div>

				<div class="space-y-4">

					<!-- Преимущества с выравниванием по левому краю -->
					<div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6">
						<div class="flex items-start text-gray-600 group">
							<div
								class="mr-3 p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
								<font-awesome-icon icon="calculator" class="h-5 w-5 text-blue-500"/>
							</div>
							<div class="text-left">
								<span class="text-sm font-medium block">Точный расчёт</span>
								<span class="text-sm text-gray-500">продуктов на неделю</span>
							</div>
						</div>

						<div class="flex items-start text-gray-600 group">
							<div
								class="mr-3 p-2 rounded-lg bg-pink-50 group-hover:bg-pink-100 transition-colors duration-300">
								<font-awesome-icon icon="coins" class="h-5 w-5 text-pink-500"/>
							</div>
							<div class="text-left">
								<span class="text-sm font-medium block">Экономия</span>
								<span class="text-sm text-gray-500">бюджета и времени</span>
							</div>
						</div>

						<div class="flex items-start text-gray-600 group">
							<div
								class="mr-3 p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300">
								<font-awesome-icon icon="cart-shopping" class="h-5 w-5 text-purple-500"/>
							</div>
							<div class="text-left">
								<span class="text-sm font-medium block">Удобный список</span>
								<span class="text-sm text-gray-500">для одной закупки</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Декоративная линия -->
				<div class="flex justify-center relative">
<span
	class="absolute left-4 top-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></span>
					<div class="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
					<span
						class="absolute right-4 top-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></span>
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
