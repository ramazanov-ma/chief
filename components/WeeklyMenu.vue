<template>
	<div>
		<div v-for="day in weekDays" :key="day.name"
		     class="relative py-6 px-4 mt-4 bg-white border rounded-3xl shadow-sm"
		     :class="{ 'border-blue-500': day.isToday, 'border-slate-200': !day.isToday }">

			<div class="transition-colors">
				<div class="flex items-start space-x-4">
					<div class="flex-1 min-w-0">
						<div class="flex items-center justify-between">
							<DayHeader :day="day" />
							<BaseButton
								@click="regenerateDay(day)"
								class="w-10 h-10 !p-0 border-slate-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
								title="Пересоздать день"
								variant="secondary"
							>
								<font-awesome-icon icon="rotate"/>
							</BaseButton>
						</div>

						<MealCard :day="day" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import WeekSelector from '@/components/ui/WeekSelector.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import WeeklyMenuHeader from '@/components/menu/WeeklyMenuHeader.vue';
import DayHeader from '@/components/menu/DayHeader.vue';
import MealCard from '@/components/menu/MealCard.vue';

interface Meal {
	id: number;
	time: string;
	name: string;
	description: string;
	emoji: string;
	calories: number;
	cookingTime: number;
}

interface Day {
	name: string;
	date: string;
	isToday: boolean;
	isLast: boolean;
	meals: Meal[];
}

// Пример данных для одного дня
const exampleMeals: Meal[] = [
	{
		id: 1,
		time: '09:00',
		name: 'Овсяная каша с ягодами',
		description: 'Питательная каша с черникой, медом и грецкими орехами',
		emoji: '🥣',
		calories: 320,
		cookingTime: 15
	},
	{
		id: 2,
		time: '13:30',
		name: 'Куриный суп с лапшой',
		description: 'Легкий суп на курином бульоне с домашней лапшой и овощами',
		emoji: '🍜',
		calories: 450,
		cookingTime: 45
	},
	{
		id: 3,
		time: '16:00',
		name: 'Творожная запеканка',
		description: 'С изюмом и ванильным соусом',
		emoji: '🧁',
		calories: 280,
		cookingTime: 30
	},
	{
		id: 4,
		time: '19:00',
		name: 'Стейк из лосося',
		description: 'С гарниром из киноа и свежих овощей',
		emoji: '🐟',
		calories: 520,
		cookingTime: 25
	}
];

// Текущая неделя (0 - текущая, 1 - следующая, -1 - предыдущая и т.д.)
const weekOffset = ref(0);

// Получаем дни недели с учетом смещения
const weekDays = computed(() => {
	const days = [
		{ name: 'Понедельник' },
		{ name: 'Вторник' },
		{ name: 'Среда' },
		{ name: 'Четверг' },
		{ name: 'Пятница' },
		{ name: 'Суббота' },
		{ name: 'Воскресенье' }
	];

	const today = new Date();
	const monday = new Date(today);
	// Получаем понедельник текущей недели
	monday.setDate(today.getDate() - (today.getDay() || 7) + 1);

	return days.map((day, index) => {
		const date = new Date(monday);
		date.setDate(monday.getDate() + index);

		const isToday = date.toDateString() === today.toDateString();

		return {
			...day,
			date: formatDate(date), // Например: "1 февраля"
			isToday: isToday,
			isLast: index === days.length - 1,
			meals: exampleMeals
		};
	});
});

// Вычисляем метку для текущей недели
const selectedWeekLabel = computed(() => {
	if (weekOffset.value === 0) return 'Текущая неделя';
	if (weekOffset.value === 1) return 'Следующая неделя';
	if (weekOffset.value === -1) return 'Прошлая неделя';
	if (weekOffset.value > 1) return `Через ${ weekOffset.value } ${ getNumeralForm(weekOffset.value) }`;
	return `${ Math.abs(weekOffset.value) } ${ getNumeralForm(Math.abs(weekOffset.value)) } назад`;
});

// Вычисляем период текущей недели
const currentPeriod = computed(() => {
	const start = getWeekStart(weekOffset.value);
	const end = new Date(start);
	end.setDate(end.getDate() + 6);

	return `${ formatDate(start) } — ${ formatDate(end) }`;
});

const isCurrentWeek = computed(() => weekOffset.value === 0);

// Вспомогательные функции
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

function changeWeek(direction: number) {
	weekOffset.value += direction;
}

// Получение дней недели
onMounted(() => {
	const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const today = new Date();

	weekDays.value = days.map((name, index) => {
		const date = new Date(today);
		date.setDate(today.getDate() - today.getDay() + index + 1);

		return {
			name,
			date: date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }),
			meals: []
		};
	});
});

// Получение иконки в зависимости от типа приема пищи
const getMealIcon = (type: string) => {
	switch (type) {
		case 'breakfast':
			return 'coffee';
		case 'lunch':
			return 'utensils';
		case 'dinner':
			return 'moon';
		default:
			return 'utensils';
	}
};

// Методы для работы с меню
const addMenu = () => {
	// TODO: Добавить модальное окно для создания блюда
};

const editDay = (dayIndex: number) => {
	// TODO: Добавить модальное окно для редактирования дня
};

const addMealToDay = (dayIndex: number) => {
	// TODO: Добавить модальное окно для добавления блюда в конкретный день
};

const replaceMeal = (date: string, mealId: number) => {
	// Здесь логика замены блюда
	console.log('Замена блюда:', date, mealId);
};

const regenerateDay = (day: Day) => {
	// day.meals = generateMealsForDay(); // Функция генерации блюд
};
</script>
