﻿<template>
	<header class="pt-2 pb-4">
		<div class="max-w-2xl">
			<!-- Приветствие -->
			<div class="flex items-center space-x-4">
				<div class="flex-shrink-0">
					<div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
						<font-awesome-icon
							icon="user"
							class="text-blue-500 text-xl"
						/>
					</div>
				</div>
				<div>
					<h1 class="text-xl font-medium text-gray-900">
						{{ greeting }}, Марат!
					</h1>
					<p class="text-sm text-slate-500 font-normal">
						{{ currentDate }}
					</p>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const greeting = computed(() => {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return 'Доброе утро';
	if (hour >= 12 && hour < 18) return 'Добрый день';
	if (hour >= 18 && hour < 23) return 'Добрый вечер';
	return 'Доброй ночи';
});

const currentDate = computed(() => {
	return new Date().toLocaleDateString('ru-RU', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
});
</script>
