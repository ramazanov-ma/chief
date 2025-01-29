﻿import { defineNuxtPlugin } from 'nuxt/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faUser,
	faGlobe,
	faPizzaSlice,
	faBowlRice,
	faUtensils,
	faPepperHot,
	faFish,
	faBurger,
	faSeedling,
	faKitchenSet,
	faAppleWhole,
	faLeaf,
	faWheatAwnCircleExclamation,
	faGlassWater,
	faBan,
	faBreadSlice,
	faCalendar,
	faClock,
	faBolt,
	faHourglassHalf,
	faHourglass,
	faHourglassEnd,
	faCalendarDay,
	faCalendarWeek,
	faMedal,
	faCoins,
	faWallet,
	faSackDollar,
	faMoneyBillWave,
	faMoneyBills,
	faVault,
	faCircleExclamation,
	faFireFlameCurved,
	faCartShopping
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faUser,
	faGlobe,
	faPizzaSlice,
	faBowlRice,
	faUtensils,
	faPepperHot,
	faFish,
	faBurger,
	faSeedling,
	faKitchenSet,
	faAppleWhole,
	faLeaf,
	faWheatAwnCircleExclamation,
	faGlassWater,
	faBan,
	faBreadSlice,
	faCalendar,
	faClock,
	faBolt,
	faHourglassHalf,
	faHourglass,
	faHourglassEnd,
	faCalendarDay,
	faCalendarWeek,
	faMedal,
	faCoins,
	faWallet,
	faSackDollar,
	faMoneyBillWave,
	faMoneyBills,
	faVault,
	faCircleExclamation,
	faFireFlameCurved,
	faCartShopping
);

export default defineNuxtPlugin((app) => {
	app.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
