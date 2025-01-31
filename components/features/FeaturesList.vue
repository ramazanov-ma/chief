<template>
	<div class="grid gap-6 md:grid-cols-3">
		<FeatureCard
			icon="calculator"
			title="Точный расчёт"
			subtitle="продуктов на неделю"
			color="blue"
		/>
		<FeatureCard
			icon="coins"
			title="Экономия"
			subtitle="бюджета и времени"
			color="pink"
		/>
		<FeatureCard
			icon="cart-shopping"
			title="Удобный список"
			subtitle="для одной закупки"
			color="purple"
		/>
	</div>
</template>

<script setup lang="ts">
import FeatureCard from '@/components/ui/FeatureCard.vue';
</script>
