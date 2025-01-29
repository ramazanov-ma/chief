<template>
	<div class="space-y-6">
		<h2 class="text-2xl font-semibold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
			<font-awesome-icon icon="apple-whole" class="mr-3 h-6 w-6 text-blue-500" />
			Диетические предпочтения
		</h2>

		<!-- Ограничения в питании -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="circle-exclamation" class="mr-3 h-6 w-6 text-blue-500" />
				Ограничения в питании
			</h3>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<label
					v-for="restriction in dietaryRestrictions"
					:key="restriction.id"
					class="relative"
				>
					<input
						type="checkbox"
						:value="restriction.id"
						v-model="formData.restrictions"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
              formData.restrictions.includes(restriction.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            ]"
					>
						<font-awesome-icon
							:icon="restriction.icon"
							class="h-8 w-8 mb-2"
							:class="formData.restrictions.includes(restriction.id) ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="font-medium font-medium text-gray-700">{{ restriction.name }}</div>
					</div>
				</label>
			</div>
		</div>

		<!-- Калорийность -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="fire-flame-curved" class="mr-3 h-6 w-6 text-blue-500" />
				Предпочтительная калорийность
			</h3>
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<label for="minCalories" class="block text-base font-medium text-gray-700">
						Минимум калорий
					</label>
					<input
						v-model="formData.caloriesPreference.min"
						type="number"
						id="minCalories"
						class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
						placeholder="1500"
					/>
				</div>

				<div class="space-y-2">
					<label for="maxCalories" class="block text-base font-medium text-gray-700">
						Максимум калорий
					</label>
					<input
						v-model="formData.caloriesPreference.max"
						type="number"
						id="maxCalories"
						class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
						placeholder="2500"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormData } from '@/types/form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const dietaryRestrictions = [
	{ id: 'vegetarian', name: 'Вегетарианство', icon: 'leaf' },
	{ id: 'vegan', name: 'Веганство', icon: 'seedling' },
	{ id: 'gluten-free', name: 'Без глютена', icon: 'wheat-awn-circle-exclamation' },
	{ id: 'lactose-free', name: 'Без лактозы', icon: 'glass-water' },
	{ id: 'nuts-free', name: 'Без орехов', icon: 'ban' },
	{ id: 'low-carb', name: 'Низкоуглеводная', icon: 'bread-slice' },
];

const props = defineProps<{
	modelValue: Partial<FormData>;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: Partial<FormData>): void;
}>();

const formData = ref({
	restrictions: props.modelValue.restrictions || [],
	caloriesPreference: props.modelValue.caloriesPreference || {
		min: 1500,
		max: 2500
	},
});

watch(formData, (newValue) => {
	emit('update:modelValue', newValue);
}, { deep: true });
</script>
