import { defineNuxtPlugin } from 'nuxt/app';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faUser,
	faUsers,
	faUtensils,
	faShieldHalved,
	faGlobe,
	faClock,
	faArrowRight,
	faCheck,
	faBan,
	faPizzaSlice,
	faBowlRice,
	faBowlFood,
	faPepperHot,
	faFish,
	faLeaf,
	faFire,
	faWheatAwn
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faUser,
	faUsers,
	faUtensils,
	faShieldHalved,
	faGlobe,
	faClock,
	faArrowRight,
	faCheck,
	faBan,
	faPizzaSlice,
	faBowlRice,
	faBowlFood,
	faPepperHot,
	faFish,
	faLeaf,
	faFire,
	faWheatAwn
)

export default defineNuxtPlugin((app) => {
	app.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
