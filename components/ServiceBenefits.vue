<template>
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
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
