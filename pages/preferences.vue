<template>
	<div>
		<AppHeader/>

		<div class="space-y-4">

			<!-- Персональные данные -->
			<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
				<h2 class="text-xl font-medium">Персональные данные</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
			<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
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
						<label class="text-sm text-gray-700 font-medium">День напоминания о составлении списка
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

			<!-- Настройки темы -->
			<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
				<h2 class="text-xl font-medium">Настройки темы</h2>

				<div class="flex flex-col space-y-2 mt-6">
					<label class="text-sm text-gray-700 font-medium">Выберите тему:</label>
					<BaseSelect v-model="preferences.theme">
						<option value="light">Светлая</option>
						<option value="dark">Тёмная</option>
					</BaseSelect>
				</div>
			</div>

			<!-- Кнопка анкеты -->
			<BaseButton
				variant="outline"
				size="lg"
				class="sm:w-auto w-full justify-center border text-slate-600 border-slate-400 transition-shadow"
				@click="goToQuestionnaire"
			>
				<font-awesome-icon icon="clipboard-list" class="text-slate-600 mr-2"/>
				Пройти анкету еще раз
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useOnboardingStore } from '@/stores/onboarding';
import { definePageMeta } from '@/.nuxt/imports';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';

definePageMeta({
	middleware: ['onboarding']
});

const router = useRouter();
const onboardingStore = useOnboardingStore();

interface Preferences {
	name: string;
	age: number;
	notificationsEnabled: boolean;
	shoppingReminderDay: string;
	theme: string;
}

const preferences = ref<Preferences>({
	name: 'Марат',
	age: 30,
	notificationsEnabled: true,
	shoppingReminderDay: 'sunday',
	theme: 'light'
});

const avatarUrl = ref('https://upload.wikimedia.org/wikipedia/tr/7/77/Aang_karakteri.png'); // URL аватара пользователя

const toggleNotifications = () => {
	preferences.value.notificationsEnabled = !preferences.value.notificationsEnabled;
};

const selectAvatar = () => {
	// Триггерим выбор файла для аватара
	// refs.avatarInput.click();
};

const onAvatarChange = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input.files && input.files[0]) {
		const reader = new FileReader();
		reader.onload = (e) => {
			avatarUrl.value = e.target?.result as string;
		};
		reader.readAsDataURL(input.files[0]);
	}
};

const goToQuestionnaire = () => {
	onboardingStore.resetOnboarding();
	router.push('/onboarding');
};
</script>
