<!-- layouts/default.vue -->
<template>
	<div class="min-h-screen bg-gray-100">
		<!-- Основной контент -->
		<main class="pb-[68px]">
			<slot/>
		</main>

		<!-- Плавающая навигация -->
		<nav
			class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg shadow-black/[0.08] backdrop-blur-xl px-6 py-2 w-[240px]">
			<div class="flex justify-between">
				<!-- Меню -->
				<NuxtLink
					to="/"
					class="group flex items-center justify-center w-16"
					active-class="active-nav-link"
				>
					<div class="flex flex-col items-center">
						<div class="relative w-12 h-12 flex items-center justify-center">
							<div
								class="absolute inset-0 rounded-lg bg-blue-50 opacity-0 scale-75 group-[.active-nav-link]:opacity-100 group-[.active-nav-link]:scale-100 transition-all duration-200"></div>
							<font-awesome-icon
								icon="bars"
								class="text-xl relative transition-all duration-200 group-hover:scale-105"
							/>
						</div>
					</div>
				</NuxtLink>

				<!-- Список покупок -->
				<NuxtLink
					to="/shopping-list"
					class="group flex items-center justify-center w-16"
					active-class="active-nav-link"
				>
					<div class="flex flex-col items-center">
						<div class="relative w-12 h-12 flex items-center justify-center">
							<div
								class="absolute inset-0 rounded-lg bg-blue-50 opacity-0 scale-75 group-[.active-nav-link]:opacity-100 group-[.active-nav-link]:scale-100 transition-all duration-200"></div>
							<font-awesome-icon
								icon="list-check"
								class="text-xl relative transition-all duration-200 group-hover:scale-105"
							/>
						</div>
					</div>
				</NuxtLink>

				<!-- Настройки -->
				<NuxtLink
					to="/preferences"
					class="group flex items-center justify-center w-16"
					active-class="active-nav-link"
				>
					<div class="flex flex-col items-center">
						<div class="relative w-12 h-12 flex items-center justify-center">
							<div
								class="absolute inset-0 rounded-lg bg-blue-50 opacity-0 scale-75 group-[.active-nav-link]:opacity-100 group-[.active-nav-link]:scale-100 transition-all duration-200"></div>
							<font-awesome-icon
								icon="gear"
								class="text-xl relative transition-all duration-200 group-hover:scale-105"
							/>
						</div>
					</div>
				</NuxtLink>
			</div>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style scoped>
.active-nav-link {
	@apply text-blue-600;
}

/* Базовый цвет для неактивных элементов */
nav {
	@apply text-gray-400 border border-gray-100/50;
}

/* Hover эффект только для десктопа */
@media (hover: hover) {
	nav a:hover {
		@apply text-gray-600;
	}
}

/* Отключаем стандартные эффекты на мобильных */
nav {
	-webkit-tap-highlight-color: transparent;
	user-select: none;
}

/* Добавляем стеклянный эффект */
nav {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
}
</style>
