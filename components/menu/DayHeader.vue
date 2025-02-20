<template>
	<div class="flex items-center justify-between w-full">
		<div class="flex flex-col">
			<span class="text-xl font-medium capitalize">
				{{ day.name }}
			</span>
			<span
				class="text-sm"
				:class="[
					day.state === DayState.PAST ? 'text-slate-400' : 'text-slate-500',
					day.isToday ? 'text-blue-500' : ''
				]"
			>
				{{ day.formattedDate }}
			</span>
		</div>

		<!-- Кнопка для прошедших дней -->
		<BaseButton
			v-if="day.state === DayState.PAST"
			@click="$emit('toggle-collapse')"
			class="w-[42px] h-[40px] !p-0 border-slate-100 text-slate-400 hover:text-slate-600 transition-colors shadow-sm"
			:title="isCollapsed ? 'Показать' : 'Свернуть'"
			variant="secondary"
		>
			<font-awesome-icon
				:icon="isCollapsed ? 'chevron-right' : 'chevron-down'"
			/>
		</BaseButton>

		<!-- Кнопка для пересоздания меню на день -->
		<BaseButton
			v-if="day.state === DayState.FUTURE"
			@click="$emit('regenerate')"
			class="w-[42px] h-[40px] !p-0 border-slate-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
			title="Пересоздать день"
			variant="secondary"
		>
			<font-awesome-icon icon="rotate"/>
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
import { DayState } from '@/types/menu';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseButton from '@/components/ui/BaseButton.vue';

interface DayProps {
	name: string;
	formattedDate: string;
	isToday: boolean;
	state: DayState;
}

defineProps<{
	day: DayProps;
	isCollapsed?: boolean;
}>();

defineEmits<{
	(e: 'toggle-collapse'): void;
	(e: 'regenerate'): void;
}>();
</script>
