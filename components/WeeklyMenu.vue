<template>
	<div>
		<!-- Адаптивный заголовок -->
		<div class="sm:flex sm:items-center sm:justify-between border border-slate-200 bg-white rounded-3xl shadow-sm">
			<div class="pt-4 flex justify-center items-center">
				<div class="flex items-center text-sm px-4 py-1 bg-blue-50 text-blue-600 font-normal rounded-full">
					<font-awesome-icon icon="calendar-check" class="mr-1.5"/>
					{{ selectedWeekLabel }}
				</div>
			</div>
			<!-- Текстовая информация -->
			<div class="flex flex-col space-y-4 p-4">
				<div
					class="flex items-center justify-between sm:justify-start sm:space-x-3"
				>
					<div class="flex justify-between items-center space-x-2 w-full">
						<h2 class="text-2xl font-medium">
							<span class="block">Меню недели</span>
							<span
								class="block text-sm font-normal text-slate-500"
							>
								{{ currentPeriod }}
							</span>
						</h2>
						<div class="flex flex-col items-end">
							<!-- Навигация и кнопки -->
							<div class="flex items-center justify-between sm:justify-end space-x-2">
								<div class="flex items-center space-x-2">
									<button
										@click="changeWeek(-1)"
										class="px-4 py-2 rounded-lg bg-slate-100 transition-colors text-slate-500 hover:bg-slate-200"
									>
										<font-awesome-icon icon="chevron-left"/>
									</button>
									<button
										@click="changeWeek(1)"
										class="px-4 py-2 rounded-lg bg-slate-100 transition-colors text-slate-500 hover:bg-slate-200"
									>
										<font-awesome-icon icon="chevron-right"/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button
					@click="addMenu"
					class="sm:hidden bg-blue-50 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors text-sm"
				>
					<font-awesome-icon icon="plus" class="mr-1.5"/>
					Пересоздать меню
				</button>
			</div>
		</div>

		<!-- Дни недели -->
		<div v-for="day in weekDays" :key="day.name"
		     class="relative py-6 px-4 mt-4 bg-white border rounded-3xl shadow-sm"
		     :class="{ 'border-blue-500': day.isToday, 'border-slate-200': !day.isToday }">
			<!-- День недели -->
			<div class="transition-colors">
				<div class="flex items-start space-x-4">
					<!-- Контент дня -->
					<div class="flex-1 min-w-0">
						<div class="flex items-center justify-between">
							<h3 :class="{ 'text-blue-600': day.isToday, 'text-gray-900': !day.isToday }">
									<span class="block">
										<span class="font-medium text-lg">{{ day.name }}</span>
										<span
											v-if="day.isToday"
											class="pl-3 pr-4 py-1 bg-blue-100 rounded-full text-blue-600 text-xs font-normal text-center ml-2"
										>
											Сегодня
										</span>
									</span>
								<span
									class="block text-sm font-normal text-gray-500"
									:class="{ 'text-blue-500': day.isToday, 'text-gray-500': !day.isToday }"
								>
										{{ day.date }}
									</span>
							</h3>

							<button
								@click="regenerateDay(day)"
								class="w-10 h-10 rounded-lg bg-white border border-gray-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
								title="Пересоздать день"
							>
								<font-awesome-icon icon="rotate"/>
							</button>
						</div>

						<!-- Список блюд -->
						<div class="space-y-4 mt-4" v-if="day.meals.length">
							<div class="relative">
								<div class="absolute left-[1.65rem] top-0 bottom-0 w-px"></div>
								<div class="space-y-4">
									<div
										v-for="meal in day.meals"
										:key="meal.id"
										class="relative group"
									>
										<div class="flex items-start space-x-3">
											<!-- ... Время и эмодзи ... -->
											<div class="flex flex-col items-center w-14">
													<span
														class="text-base font-medium text-gray-900 bg-white px-2 rounded-full border border-slate-200"
													>
														{{ meal.time }}
													</span>
												<div
													class="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center mt-1 z-10">
													<span class="text-xl">{{ meal.emoji }}</span>
												</div>
											</div>

											<!-- Карточка блюда -->
											<div class="flex-1 min-w-0">
												<div
													class="bg-white border border-slate-200 rounded-xl p-4 group-hover:bg-gray-50 transition-colors shadow-sm"
												>
													<div
														class="flex items-start justify-between space-x-2"
													>
														<h3
															class="text-base font-medium text-gray-900 truncate"
														>
															{{ meal.name }}
														</h3>
													</div>

													<p class="text-sm text-gray-600 mt-1 mb-3">
														{{ meal.description }}
													</p>

													<div class="flex items-center flex-wrap gap-4">
                              <span class="text-sm font-medium text-gray-700">
                                🔥 {{ meal.calories }} ккал
                              </span>
														<span class="text-sm font-medium text-gray-700">
                                ⏱️ {{ meal.cookingTime }} мин
                              </span>

														<div class="flex items-center gap-4 ml-auto">
															<button
																class="text-sm font-medium text-blue-600 hover:text-blue-900 rounded-lg transition-colors"
																@click="replaceMeal(day.date, meal.id)"
															>
																Заменить
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
