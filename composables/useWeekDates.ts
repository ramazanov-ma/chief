export function useWeekDates() {
	const getWeekStartDate = (offset: number = 0) => {
		const date = new Date();
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Корректировка для недели, начинающейся с понедельника
		const weekStart = new Date(date.setDate(diff));

		// Добавляем смещение недель
		weekStart.setDate(weekStart.getDate() + (offset * 7));

		return weekStart;
	};

	const getWeekEndDate = (offset: number = 0) => {
		const weekStart = getWeekStartDate(offset);
		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekEnd.getDate() + 6);
		return weekEnd;
	};

	const isDateInPast = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	return {
		getWeekStartDate,
		getWeekEndDate,
		isDateInPast,
		isToday
	};
}
