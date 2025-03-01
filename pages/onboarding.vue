<template>
	<div class="min-h-screen bg-gray-50">
		<div class="page-container">
			<div v-if="isInTelegram" class="telegram-info">
				<h1>Chief в Telegram</h1>
				<div class="user-info" v-if="userData">
					<p>Привет, {{ userData.first_name }} {{ userData.last_name }}!</p>
				</div>
			</div>

			<!-- Основной контент вашего приложения -->
			<div class="main-content">
				<h2>Главная страница Chief</h2>
				<!-- Содержимое приложения -->
			</div>

			<!-- Использование кастомной кнопки Telegram -->
<!--			<TelegramMainButton-->
<!--				text="Создать новое меню"-->
<!--			/>-->
<!--			@click="createNewMenu"-->
		</div>

		<pre>****</pre>

		<DecorativeElements>
			<div class="container mx-auto px-4 py-12 min-h-screen">
				<div class="flex justify-center mb-8">
					<TitleBadge icon="utensils">Умное планирование питания</TitleBadge>
				</div>

				<div class="text-center mb-8">
					<TitleGradient>Составим меню вашей мечты вместе</TitleGradient>
				</div>

				<div class="flex justify-center mb-8">
					<GradientDivider/>
				</div>

				<StepManager @form-completed="handleFormCompletion"/>

				<ServiceBenefits/>
			</div>
		</DecorativeElements>
	</div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form';
import TitleGradient from '@/components/ui/TitleGradient.vue';
import TitleBadge from '@/components/ui/TitleBadge.vue';
import GradientDivider from '@/components/ui/GradientDivider.vue';
import StepManager from '@/components/StepManager.vue';
import ServiceBenefits from '@/components/ServiceBenefits.vue';
import { useTelegram } from "@/composables/useTelegram";

definePageMeta({
	layout: 'onboarding',
	middleware: ['onboarding']
});

const handleFormCompletion = (formData: FormData) => {
	console.log('Form completed:', formData);
};

const { isInTelegram, userData } = useTelegram()
</script>
