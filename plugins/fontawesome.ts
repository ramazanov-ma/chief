import { defineNuxtPlugin } from 'nuxt/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faUser,
	faUtensils,
	faShieldHalved,
	faGlobe,
	faClock,
	faArrowRight,
	faCheck
} from '@fortawesome/free-solid-svg-icons';

export default defineNuxtPlugin((nuxtApp) => {
	library.add(
		faUser,
		faUtensils,
		faShieldHalved,
		faGlobe,
		faClock,
		faArrowRight,
		faCheck
	);

	nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
