<template>
	<div class="min-h-screen bg-gray-50">
		<DecorativeElements>
			<div class="container mx-auto px-4 py-12 min-h-screen">

				<div class="flex justify-center mb-8">
					<div
						class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100 relative">
						<font-awesome-icon icon="utensils" class="mr-2 animate-bounce"/>
						<span class="text-sm font-medium">Умное планирование питания</span>
					</div>
				</div>

				<div class="text-center mb-8">
					<h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
						Составим меню вашей мечты вместе
					</h1>
					<p class="mt-4 text-lg text-gray-600">
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
		</DecorativeElements>
	</div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form';
import StepManager from '@/components/StepManager.vue';
import ServiceBenefits from '@/components/ServiceBenefits.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const handleFormCompletion = (formData: FormData) => {
	// Здесь будет логика обработки завершенной формы
	console.log('Form completed:', formData);
	// Например, отправка данных на сервер
};
</script>
