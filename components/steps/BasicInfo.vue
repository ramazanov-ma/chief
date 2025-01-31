<template>
	<div class="space-y-6">
		<TitleSection icon="user">Основная информация</TitleSection>

		<div class="grid grid-cols-2 gap-4">
			<BaseInput
				id="name"
				type="text"
				label="Как к вам обращаться?"
				placeholder="Ваше имя"
				v-model="formData.name"
			/>

			<BaseInput
				id="age"
				type="number"
				label="Возраст"
				placeholder="Ваш возраст"
				v-model="formData.age"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormData } from '@/types/form';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TitleSection from '@/components/ui/TitleSection.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

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
