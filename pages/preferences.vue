<template>
	<div>
		<AppHeader/>

		<div class="space-y-4">

			<!-- Персональные данные -->
			<div class="bg-white rounded-3xl shadow-sm border border-slate-200 py-6 px-4">
				<h2 class="text-lg font-medium mb-6">Персональные данные</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="flex flex-col space-y-2">
						<BaseInput
							v-model="preferences.name"
							type="text"
							placeholder="Ваше имя"
							id="name"
							label="Имя"
						/>
					</div>

					<div class="flex flex-col space-y-2">
						<BaseInput
							v-model="preferences.age"
							type="number"
							placeholder="30"
							id="age"
							label="Возраст"
						/>
					</div>
				</div>
			</div>

			<!-- Уведомления -->
			<div class="bg-white rounded-3xl shadow-sm border border-slate-200 py-6 px-4">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-medium">Уведомления</h2>
					<!-- Переключатель уведомлений -->
					<div class="relative w-12 h-6">
						<input
							type="checkbox"
							v-model="preferences.notificationsEnabled"
							class="sr-only"
						/>
						<div
							@click="toggleNotifications"
							class="cursor-pointer absolute inset-0 rounded-full transition-colors duration-200"
							:class="preferences.notificationsEnabled ? 'bg-blue-500' : 'bg-slate-200'"
						>
							<div
								class="absolute inset-y-1 start-1 w-4 h-4 rounded-full bg-white transition-all duration-200"
								:class="preferences.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'"
							></div>
						</div>
					</div>
				</div>

				<div class="space-y-4 mt-6" v-if="preferences.notificationsEnabled">
					<div class="flex flex-col space-y-2">
						<label class="text-sm text-gray-700 font-medium">Время напоминания о составлении списка
							покупок</label>
						<BaseSelect v-model="preferences.shoppingReminderDay">
							<option value="monday">Понедельник</option>
							<option value="tuesday">Вторник</option>
							<option value="wednesday">Среда</option>
							<option value="thursday">Четверг</option>
							<option value="friday">Пятница</option>
							<option value="saturday">Суббота</option>
							<option value="sunday">Воскресенье</option>
						</BaseSelect>
					</div>
				</div>
			</div>

			<!-- Кнопка анкеты -->
			<BaseButton
				@click="goToQuestionnaire"
				class-list="w-full"
			>
				<font-awesome-icon icon="clipboard-list" class="text-sm"/>
				Пройти анкету еще раз
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useOnboardingStore } from "@/stores/onboarding";
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';

const router = useRouter();
const onboardingStore = useOnboardingStore();

interface Preferences {
	name: string;
	age: number;
	notificationsEnabled: boolean;
	shoppingReminderDay: string;
}

const preferences = ref<Preferences>({
	name: 'Марат',
	age: 30,
	notificationsEnabled: true,
	shoppingReminderDay: 'sunday'
});

const toggleNotifications = () => {
	preferences.value.notificationsEnabled = !preferences.value.notificationsEnabled;
};

const goToQuestionnaire = () => {
	onboardingStore.resetOnboarding();
	router.push('/onboarding');
};
</script>
