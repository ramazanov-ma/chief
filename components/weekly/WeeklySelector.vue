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
									v-if="weekOffset !== 0"
									variant="secondary"
									class="w-[42px] h-[40px] !p-0"
									@click="resetToCurrentWeek"
									title="Вернуться к текущей неделе"
								>
									<font-awesome-icon icon="rotate-left"/>
								</BaseButton>
								<BaseButton
									variant="secondary"
									class="w-[42px] h-[40px] !p-0"
									@click="changeWeek(-1)"
									:disabled="isPastLimit"
								>
									<font-awesome-icon icon="chevron-left"/>
								</BaseButton>
								<BaseButton
									variant="secondary"
									class="w-[42px] h-[40px] !p-0"
									@click="changeWeek(1)"
									:disabled="isFutureLimit"
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
import { useWeekDates } from '@/composables/useWeekDates';

interface Props {
	title: string;
	maxPastWeeks?: number;  // Максимальное количество прошедших недель для просмотра
	maxFutureWeeks?: number; // Максимальное количество будущих недель для просмотра
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Меню недели',
	maxPastWeeks: 4,    // По умолчанию можно просматривать до 4 недель назад
	maxFutureWeeks: 4   // По умолчанию можно планировать на 4 недели вперед
});

const emit = defineEmits<{
	(e: 'week-change', offset: number): void;
}>();

const weekOffset = ref(0);
const { getWeekStartDate, isDateInPast } = useWeekDates();

// Проверка ограничений на просмотр прошлых недель
const isPastLimit = computed(() => {
	return weekOffset.value <= -props.maxPastWeeks;
});

// Проверка ограничений на просмотр будущих недель
const isFutureLimit = computed(() => {
	return weekOffset.value >= props.maxFutureWeeks;
});

const weekStatusColor = computed(() => {
	if (weekOffset.value === 0) {
		return 'text-blue-500'; // Текущая неделя
	} else if (isDateInPast(getWeekStartDate(weekOffset.value))) {
		return 'text-red-500'; // Прошедшие недели
	} else {
		return 'text-green-500'; // Будущие недели
	}
});

const selectedWeekLabel = computed(() => {
	if (weekOffset.value === 0) return 'Текущая неделя';
	if (weekOffset.value === 1) return 'Следующая неделя';
	if (weekOffset.value === -1) return 'Прошлая неделя';
	if (weekOffset.value > 1) return `Через ${weekOffset.value} ${getNumeralForm(weekOffset.value)}`;
	return `${Math.abs(weekOffset.value)} ${getNumeralForm(Math.abs(weekOffset.value))} назад`;
});

const currentPeriod = computed(() => {
	const start = getWeekStartDate(weekOffset.value);
	const end = new Date(start);
	end.setDate(end.getDate() + 6);

	return `${formatDate(start)} — ${formatDate(end)}`;
});

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
	const newOffset = weekOffset.value + direction;

	// Проверяем ограничения
	if (direction < 0 && newOffset < -props.maxPastWeeks) return;
	if (direction > 0 && newOffset > props.maxFutureWeeks) return;

	weekOffset.value = newOffset;
	emit('week-change', weekOffset.value);
};

const resetToCurrentWeek = () => {
	weekOffset.value = 0;
	emit('week-change', 0);
};
</script>
