<template>
	<div class="max-w-2xl mx-auto">
		<!-- Карточка формы с градиентной рамкой -->
		<div class="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
			<div class="bg-white rounded-2xl p-8">
				<form @submit.prevent="handleSubmit" class="space-y-8">
					<!-- Базовая информация -->
					<div class="space-y-4">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="user" class="mr-3 h-6 w-6 text-blue-500"/>
							Личная информация
						</h2>

						<div class="space-y-2">
							<label for="name" class="block text-sm font-medium text-gray-700">
								Как к вам обращаться?
							</label>
							<div class="relative">
								<input
									v-model="formData.name"
									type="text"
									id="name"
									class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
									placeholder="Введите ваше имя"
								/>
								<div class="absolute inset-y-0 right-0 flex items-center pr-3">
									<font-awesome-icon
										v-if="formData.name"
										icon="check"
										class="h-5 w-5 text-green-500"
									/>
								</div>
							</div>
						</div>
					</div>

					<!-- Предпочтения в еде -->
					<div class="space-y-6">
						<h2 class="text-2xl font-semibold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							<font-awesome-icon icon="utensils" class="mr-3 h-6 w-6 text-blue-500"/>
							Предпочтения в еде
						</h2>

						<div class="grid grid-cols-2 gap-4">
							<label
								v-for="preference in foodPreferences"
								:key="preference"
								class="relative group"
							>
								<input
									type="checkbox"
									:value="preference"
									v-model="selectedPreferences"
									class="hidden"
								/>
								<div
									class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center"
									:class="[
                    selectedPreferences.includes(preference)
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  ]"
								>
									<div class="mr-3">
										<div
											class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
											:class="[
                        selectedPreferences.includes(preference)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 group-hover:border-blue-300'
                      ]"
										>
											<font-awesome-icon
												v-if="selectedPreferences.includes(preference)"
												icon="check"
												class="h-3 w-3 text-white"
											/>
										</div>
									</div>
									<span class="text-sm font-medium text-gray-700">{{ preference }}</span>
								</div>
							</label>
						</div>
					</div>

					<!-- Кнопка отправки -->
					<button
						type="submit"
						class="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center group"
					>
						<span>Сохранить предпочтения</span>
						<font-awesome-icon
							icon="arrow-right"
							class="ml-2 group-hover:translate-x-1 transition-transform duration-200"
						/>
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface FormData {
	name: string;
	preferences: string[];
}

const formData = ref<FormData>({
	name: '',
	preferences: []
});

const foodPreferences = [
	'Вегетарианское',
	'Веганское',
	'Без глютена',
	'Низкокалорийное',
	'Белковое',
	'Острое',
	'Сладкое',
	'Традиционное'
];

const selectedPreferences = ref<string[]>([]);

const handleSubmit = () => {
	formData.value.preferences = selectedPreferences.value;
	console.log('Отправка данных:', formData.value);
};
</script>
