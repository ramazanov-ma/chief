<template>
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
					Умное планирование питания
				</h1>
				<p class="mt-4 text-xl text-gray-600">
					Давайте создадим ваше идеальное меню на неделю
				</p>
			</div>

			<StepManager
				@form-completed="handleFormCompletion"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import StepManager from '@/components/StepManager.vue';
import type { FormData } from '@/types/form';

const handleFormCompletion = (formData: FormData) => {
	// Здесь будет логика обработки завершенной формы
	console.log('Form completed:', formData);
	// Например, отправка данных на сервер
};
</script>
