<template>
	<div class="space-y-6">
		<h2 class="text-2xl font-semibold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
			<font-awesome-icon icon="calendar" class="mr-3 h-6 w-6 text-blue-500"/>
			Планирование
		</h2>

		<!-- Время на готовку -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="clock" class="mr-3 h-6 w-6 text-blue-500"/>
				Время на готовку
			</h3>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<label
					v-for="time in cookingTimes"
					:key="time.value"
					class="relative"
				>
					<input
						type="radio"
						:value="time.value"
						v-model="formData.cookingTime"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
							formData.cookingTime === time.value
								? 'border-blue-500 bg-blue-50'
								: 'border-gray-200 hover:border-blue-300'
						]"
					>
						<font-awesome-icon
							:icon="time.icon"
							class="h-8 w-8 mb-2"
							:class="formData.cookingTime === time.value ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="text-base font-medium text-gray-700">{{ time.label }}</div>
					</div>
				</label>
			</div>
		</div>

		<!-- Частота покупок -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="cart-shopping" class="mr-3 h-6 w-6 text-blue-500"/>
				Частота покупок
			</h3>
			<div class="grid grid-cols-3 gap-4">
				<label
					v-for="frequency in shoppingFrequencies"
					:key="frequency.id"
					class="relative"
				>
					<input
						type="radio"
						:value="frequency.id"
						v-model="formData.shoppingFrequency"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
              formData.shoppingFrequency === frequency.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            ]"
					>
						<font-awesome-icon
							:icon="frequency.icon"
							class="h-8 w-8 mb-2"
							:class="formData.shoppingFrequency === frequency.id ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="text-base font-medium text-gray-700">{{ frequency.name }}</div>
					</div>
				</label>
			</div>
		</div>

		<!-- Бюджет -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="wallet" class="mr-3 h-6 w-6 text-blue-500"/>
				Бюджет на продукты
			</h3>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<label
					v-for="budget in budgetRanges"
					:key="budget.value"
					class="relative"
				>
					<input
						type="radio"
						:value="budget.value"
						v-model="formData.budget"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
          formData.budget === budget.value
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300'
        ]"
					>
						<font-awesome-icon
							:icon="budget.icon"
							class="h-8 w-8 mb-2"
							:class="formData.budget === budget.value ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="text-base font-medium text-gray-700">{{ budget.label }}</div>
					</div>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormData } from '@/types/form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const shoppingFrequencies = [
	{ id: 'daily', name: 'Ежедневно', icon: 'calendar-day' },
	{ id: 'weekly', name: 'Раз в неделю', icon: 'calendar-week' },
	{ id: 'biweekly', name: 'Раз в 2 недели', icon: 'calendar' },
];

const cookingTimes = [
	{ value: 15, label: 'До 15 минут', icon: 'bolt' },
	{ value: 30, label: 'До 30 минут', icon: 'clock' },
	{ value: 45, label: 'До 45 минут', icon: 'hourglass-half' },
	{ value: 60, label: 'До 60 минут', icon: 'hourglass' },
	{ value: 61, label: 'Более 60 минут', icon: 'hourglass-end' }
];

const budgetRanges = [
	{ value: 3000, label: 'До 3 000 ₽', icon: 'coins' },
	{ value: 5000, label: 'До 5 000 ₽', icon: 'wallet' },
	{ value: 7000, label: 'До 7 000 ₽', icon: 'sack-dollar' },
	{ value: 10000, label: 'До 10 000 ₽', icon: 'money-bill-wave' },
	{ value: 15000, label: 'До 15 000 ₽', icon: 'money-bills' },
	{ value: 15001, label: 'Более 15 000 ₽', icon: 'vault' }
];

const props = defineProps<{
	modelValue: Partial<FormData>;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: Partial<FormData>): void;
}>();

const formData = ref({
	cookingTime: props.modelValue.cookingTime || 30,
	shoppingFrequency: props.modelValue.shoppingFrequency || 'weekly',
	budget: props.modelValue.budget || 5000,
});

watch(formData, (newValue) => {
	emit('update:modelValue', newValue);
}, { deep: true });
</script>
