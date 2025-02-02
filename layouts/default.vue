<template>
	<div class="min-h-screen bg-gray-50">

		<!-- Добавляем отступ снизу на мобильных для нижнего меню -->
		<main class="flex-1 p-4 pb-20 md:pb-4">
			<slot/>
		</main>

		<!-- Нижнее мобильное меню -->
		<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden z-10">
			<div class="flex items-center justify-around h-16">
				<NuxtLink
					v-for="item in menuItems"
					:key="item.path"
					:to="item.path"
					class="flex flex-col items-center justify-center flex-1 h-full px-2 transition-colors"
					:class="[isActive(item.path) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900']">
					<font-awesome-icon
						:icon="item.icon"
						class="h-5 w-5"
					/>
					<span class="mt-1 text-xs font-medium">
						{{ item.name }}
					</span>
				</NuxtLink>
			</div>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const route = useRoute();
const menuItems = [
	{
		name: 'Главная',
		path: '/',
		icon: 'home'
	},
	{
		name: 'Меню',
		path: '/menu',
		icon: 'utensils'
	},
	{
		name: 'Список покупок',
		path: '/shopping-list',
		icon: 'book'
	},
	{
		name: 'Профиль',
		path: '/preferences',
		icon: 'user'
	}
];

const isActive = (path: string) => route.path === path;
</script>

<style scoped>
.router-link-active .h-6 {
	animation: bounce 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-3px);
	}
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
	nav {
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>
