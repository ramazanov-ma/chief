<template>
	<h3 :class="{ 'text-blue-600': day.isToday, 'text-gray-900': !day.isToday }">
		<span class="block">
			<span class="font-medium text-lg">{{ day.name }}</span>
			<span
				v-if="day.isToday"
				class="pl-3 pr-4 py-1 bg-blue-100 rounded-full text-blue-600 text-xs font-normal text-center ml-2"
			>
				Сегодня
			</span>
		</span>
		<span
			class="block text-sm font-normal text-gray-500"
			:class="{ 'text-blue-500': day.isToday, 'text-gray-500': !day.isToday }"
		>
			{{ day.date }}
		</span>
	</h3>
</template>

<script setup lang="ts">
interface Props {
	day: {
		name: string;
		date: string;
		isToday: boolean;
	};
}

defineProps<Props>();
</script>
