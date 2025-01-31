<template>
	<div class="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
		<div class="max-w-md w-full mx-auto px-4">
			<div class="relative w-56 h-56 mx-auto mb-8">
				<div class="absolute inset-0 rounded-full border-4 border-white/10 animate-spin-slow"></div>
				<div class="absolute inset-0 rounded-full border-2 border-white/20"
				     style="animation: spin-slow 12s linear infinite reverse"></div>

				<div class="absolute inset-8">
					<div class="absolute inset-0 rounded-full border-2 border-white/10"></div>
					<div class="absolute inset-0" style="animation: spin 10s linear infinite">
						<div class="absolute -top-4 left-1/2 -translate-x-1/2">
							<div
								class="w-8 h-8 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-xl">🥗</span>
							</div>
						</div>
						<div class="absolute -bottom-4 left-1/2 -translate-x-1/2">
							<div
								class="w-8 h-8 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-xl">🥘</span>
							</div>
						</div>
						<div class="absolute top-1/2 -left-4 -translate-y-1/2">
							<div
								class="w-8 h-8 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-xl">🍳</span>
							</div>
						</div>
						<div class="absolute top-1/2 -right-4 -translate-y-1/2">
							<div
								class="w-8 h-8 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-xl">🥪</span>
							</div>
						</div>
					</div>
				</div>

				<div class="absolute inset-0">
					<div class="absolute inset-0" style="animation: spin 15s linear infinite">
						<div class="absolute -top-5 left-1/2 -translate-x-1/2">
							<div
								class="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-2xl">📝</span>
							</div>
						</div>
						<div class="absolute -bottom-5 left-1/2 -translate-x-1/2">
							<div
								class="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-2xl">🛒</span>
							</div>
						</div>
						<div class="absolute top-1/2 -left-5 -translate-y-1/2">
							<div
								class="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-2xl">📋</span>
							</div>
						</div>
						<div class="absolute top-1/2 -right-5 -translate-y-1/2">
							<div
								class="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
								<span class="text-2xl">📊</span>
							</div>
						</div>
					</div>
				</div>

				<div class="absolute inset-0 flex items-center justify-center">
					<div class="relative">
						<div class="absolute inset-0 bg-white/5 rounded-full blur-xl"></div>
						<span class="text-5xl filter drop-shadow-lg animate-bounce-slow">⭐</span>
					</div>
				</div>
			</div>

			<div class="text-center text-white space-y-6">
				<div class="space-y-2">
					<h2 class="text-2xl font-medium">{{ currentStep.title }}</h2>
					<p class="text-white/80">{{ currentStep.description }}</p>
				</div>

				<div class="h-2 bg-white/10 rounded-full overflow-hidden">
					<div
						class="h-full bg-white transition-all ease-linear duration-100 rounded-full"
						:style="{ width: `${progress}%` }"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const steps = [
	{
		title: 'Изучаем ваши предпочтения',
		description: 'Подбираем идеальные рецепты для вас'
	},
	{
		title: 'Создаём меню на неделю',
		description: 'Учитываем все ваши пожелания'
	},
	{
		title: 'Оптимизируем список покупок',
		description: 'Составляем удобный список продуктов'
	},
	{
		title: 'Завершаем настройку',
		description: 'Всё готово!'
	}
];

const currentStep = ref(steps[0]);
const progress = ref(0);

onMounted(() => {
	const totalDuration = 15000;
	const progressUpdateInterval = 50;

	const progressInterval = setInterval(() => {
		if (progress.value < 100) {
			progress.value += (progressUpdateInterval / totalDuration) * 100;
		}
	}, progressUpdateInterval);

	steps.forEach((step, index) => {
		setTimeout(() => {
			currentStep.value = step;
		}, (totalDuration / steps.length) * index);
	});

	setTimeout(() => {
		clearInterval(progressInterval);
		progress.value = 100;
		emit('complete');
	}, totalDuration);
});

const emit = defineEmits<{
	(e: 'complete'): void
}>();
</script>

<style scoped>
.drop-shadow-lg {
	filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}
</style>
