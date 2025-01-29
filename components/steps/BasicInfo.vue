<template>
	<div class="space-y-6">
		<h2 class="text-2xl font-semibold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
			<font-awesome-icon icon="user" class="mr-3 h-6 w-6 text-blue-500" />
			Основная информация
		</h2>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<label for="name" class="block text-base font-medium text-gray-700">
					Как к вам обращаться?
				</label>
				<input
					v-model="formData.name"
					type="text"
					id="name"
					class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
					placeholder="Ваше имя"
				/>
			</div>

			<div class="space-y-2">
				<label for="age" class="block text-base font-medium text-gray-700">
					Возраст
				</label>
				<input
					v-model="formData.age"
					type="number"
					id="age"
					class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
					placeholder="Ваш возраст"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormData } from '@/types/form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
	modelValue: Partial<FormData>;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: Partial<FormData>): void;
}>();

const formData = ref<Partial<FormData>>({
	name: props.modelValue.name || '',
	age: props.modelValue.age || null,
});

watch(formData, (newValue) => {
	emit('update:modelValue', newValue);
}, {deep: true});
</script>
