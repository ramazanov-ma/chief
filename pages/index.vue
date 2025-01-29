<template>
	<div class="min-h-screen bg-gray-50 py-12">
		<div class="container mx-auto px-4">
			<div class="text-center mb-8">
				<h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
					Умное планирование питания
				</h1>
				<p class="mt-4 text-xl text-gray-600">
					Давайте создадим ваше идеальное меню на неделю
				</p>
			</div>

			<div class="flex justify-center">
				<div
					class="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
			</div>

			<!-- Преимущества сервиса -->
			<div class="mb-8">
				<ServiceBenefits/>
			</div>

			<StepManager
				@form-completed="handleFormCompletion"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form';
import StepManager from '@/components/StepManager.vue';
import ServiceBenefits from '@/components/ServiceBenefits.vue';

const handleFormCompletion = (formData: FormData) => {
	// Здесь будет логика обработки завершенной формы
	console.log('Form completed:', formData);
	// Например, отправка данных на сервер
};
</script>
