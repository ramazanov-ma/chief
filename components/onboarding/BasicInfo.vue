<template>
	<div class="space-y-6">
		<TitleSection icon="user">Основная информация</TitleSection>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<BaseInput
				id="name"
				type="text"
				label="Как к вам обращаться?"
				placeholder="Ваше имя"
				v-model="name"
			/>

			<BaseInput
				id="age"
				type="number"
				label="Возраст"
				placeholder="Ваш возраст"
				v-model="age"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import type {FormData} from '@/types/form';
import TitleSection from '@/components/ui/TitleSection.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const props = defineProps<{
	modelValue: FormData;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: FormData): void;
}>();

const name = computed({
	get: () => props.modelValue.name,
	set: (value) => emit('update:modelValue', {...props.modelValue, name: value})
});

const age = computed({
	get: () => props.modelValue.age,
	set: (value) => emit('update:modelValue', {...props.modelValue, age: value})
});
</script>
