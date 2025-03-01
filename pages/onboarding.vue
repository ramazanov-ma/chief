<template>
	<div class="min-h-screen bg-gray-50">
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

definePageMeta({
	layout: 'onboarding',
	middleware: ['onboarding']
});

const handleFormCompletion = (formData: FormData) => {
	console.log('Form completed:', formData);
};
</script>
