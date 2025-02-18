<template>
	<div class="border border-slate-200 bg-white rounded-3xl shadow-sm">
		<WeekSelector :label="selectedWeekLabel"/>
		<div class="flex flex-col space-y-4 p-4">
			<div class="flex items-center justify-between sm:justify-start sm:space-x-3">
				<div class="flex justify-between items-center space-x-2 w-full">
					<h2 class="text-2xl font-medium">
						<span class="block">{{ title }}</span>
						<span
							class="block text-sm font-normal transition-colors duration-200"
							:class="weekStatusColor"
						>
							{{ currentPeriod }}
						</span>
					</h2>

					<div class="flex flex-col items-end">
						<div class="flex items-center justify-between sm:justify-end space-x-2">
							<div class="flex items-center space-x-2">
								<BaseButton
									variant="secondary"
									class="!px-4 !py-2"
									@click="changeWeek(-1)"
								>
									<font-awesome-icon icon="chevron-left"/>
								</BaseButton>
								<BaseButton
									variant="secondary"
									class="!px-4 !py-2"
									@click="changeWeek(1)"
								>
									<font-awesome-icon icon="chevron-right"/>
								</BaseButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseButton from '@/components/ui/BaseButton.vue';
import WeekSelector from '@/components/ui/WeekSelector.vue';

interface Props {
	title: string;
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Меню недели'
});

const emit = defineEmits<{
	(e: 'week-change', offset: number): void;
}>();

const weekOffset = ref(0);

const weekStatusColor = computed(() => {
	if (weekOffset.value < 0) {
		return 'text-red-500';
	} else if (weekOffset.value > 0) {
		return 'text-green-500';
	}
	return 'text-blue-500';
});

const weekStatusBadge = computed(() => {
	if (weekOffset.value < 0) {
		return '!bg-red-50 !text-red-600 hover:!bg-red-100';
	} else if (weekOffset.value > 0) {
		return '!bg-green-50 !text-green-600 hover:!bg-green-100';
	}
	return '!bg-blue-50 !text-blue-600 hover:!bg-blue-100';
});

const selectedWeekLabel = computed(() => {
	if (weekOffset.value === 0) return 'Текущая неделя';
	if (weekOffset.value === 1) return 'Следующая неделя';
	if (weekOffset.value === -1) return 'Прошлая неделя';
	if (weekOffset.value > 1) return `Через ${weekOffset.value} ${getNumeralForm(weekOffset.value)}`;
	return `${Math.abs(weekOffset.value)} ${getNumeralForm(Math.abs(weekOffset.value))} назад`;
});

const currentPeriod = computed(() => {
	const start = getWeekStart(weekOffset.value);
	const end = new Date(start);
	end.setDate(end.getDate() + 6);

	return `${formatDate(start)} — ${formatDate(end)}`;
});

function getWeekStart(offset: number): Date {
	const today = new Date();
	const dayOfWeek = today.getDay() || 7;
	const diff = today.getDate() - dayOfWeek + 1 + (offset * 7);

	const weekStart = new Date(today);
	weekStart.setDate(diff);
	return weekStart;
}

const formatDate = (date: Date): string => {
	return date.toLocaleString('ru', {
		day: 'numeric',
		month: 'long'
	});
};

function getNumeralForm(number: number): string {
	if (number === 1) return 'неделю';
	if (number >= 2 && number <= 4) return 'недели';
	return 'недель';
}

const changeWeek = (direction: number) => {
	weekOffset.value += direction;
	emit('week-change', weekOffset.value);
};
</script>
