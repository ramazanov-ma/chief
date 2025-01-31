<template>
	<div class="space-y-6">
		<TitleSection icon="utensils">Кулинарные предпочтения</TitleSection>

		<!-- Любимые кухни -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="globe" class="mr-3 h-6 w-6 text-blue-500"/>
				Любимые кухни
			</h3>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
				<label
					v-for="cuisine in cuisineTypes"
					:key="cuisine.id"
					class="relative group"
				>
					<input
						type="checkbox"
						:value="cuisine.id"
						v-model="formData.cuisines"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex flex-col items-center text-center h-full"
						:class="[
              formData.cuisines.includes(cuisine.id)
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            ]"
					>
						<font-awesome-icon
							:icon="cuisine.icon"
							class="h-10 w-10 mb-3"
							:class="formData.cuisines.includes(cuisine.id) ? 'text-blue-500' : 'text-gray-400'"
						/>
						<span class="text-base font-medium text-gray-700">{{ cuisine.name }}</span>
					</div>
				</label>
			</div>
		</div>

		<!-- Опыт готовки -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				<font-awesome-icon icon="kitchen-set" class="mr-3 h-6 w-6 text-blue-500"/>
				Опыт готовки
			</h3>

			<div class="grid grid-cols-3 gap-4">
				<label
					v-for="level in experienceLevels"
					:key="level.id"
					class="relative"
				>
					<input
						type="radio"
						:value="level.id"
						v-model="formData.cookingExperience"
						class="hidden"
					/>
					<div
						class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center"
						:class="[
              formData.cookingExperience === level.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            ]"
					>
						<font-awesome-icon
							:icon="level.icon"
							class="h-8 w-8 mb-2"
							:class="formData.cookingExperience === level.id ? 'text-blue-500' : 'text-gray-400'"
						/>
						<div class="text-base font-medium text-gray-700">{{ level.name }}</div>
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
import TitleSection from '@/components/ui/TitleSection.vue';

const cuisineTypes = [
	{ id: 'italian', name: 'Итальянская', icon: 'pizza-slice' },
	{ id: 'asian', name: 'Азиатская', icon: 'bowl-rice' },
	{ id: 'russian', name: 'Русская', icon: 'utensils' },
	{ id: 'mexican', name: 'Мексиканская', icon: 'pepper-hot' },
	{ id: 'mediterranean', name: 'Средиземноморская', icon: 'fish' },
	{ id: 'american', name: 'Американская', icon: 'burger' },
];

const experienceLevels = [
	{ id: 'beginner', name: 'Начинающий', icon: 'seedling' },
	{ id: 'intermediate', name: 'Средний', icon: 'kitchen-set' },
	{ id: 'advanced', name: 'Продвинутый', icon: 'medal' },
];

const props = defineProps<{
	modelValue: Partial<FormData>;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: Partial<FormData>): void;
}>();

// Инициализируем formData с дефолтными значениями
const formData = ref({
	cuisines: Array.isArray(props.modelValue?.cuisines) ? props.modelValue.cuisines : [],
	cookingExperience: props.modelValue?.cookingExperience || 'beginner',
});

watch(formData, (newValue) => {
	emit('update:modelValue', newValue);
}, { deep: true });
</script>
