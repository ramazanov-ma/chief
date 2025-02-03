<template>
	<div class="flex flex-col space-y-4 p-4">
		<!-- Верхняя секция с заголовком и навигацией -->
		<div class="flex items-center justify-between sm:justify-start sm:space-x-3">
			<div class="flex justify-between items-center space-x-2 w-full">
				<!-- Заголовок и период -->
				<h2 class="text-2xl font-medium">
					<span class="block">Меню недели</span>
					<span class="block text-sm font-normal text-slate-500">
						{{ period }}
					</span>
				</h2>

				<div class="flex flex-col items-end">
					<div class="flex items-center justify-between sm:justify-end space-x-2">
						<div class="flex items-center space-x-2">
							<BaseButton
								variant="secondary"
								class="!px-4 !py-2"
								@click="handleWeekChange(-1)"
							>
								<font-awesome-icon icon="chevron-left"/>
							</BaseButton>
							<BaseButton
								variant="secondary"
								class="!px-4 !py-2"
								@click="handleWeekChange(1)"
							>
								<font-awesome-icon icon="chevron-right"/>
							</BaseButton>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BaseButton
			variant="secondary"
			class="text-md !bg-blue-50 !text-blue-600 hover:!bg-blue-100"
			@click="handleAddMenu"
		>
			Пересоздать меню
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BaseButton from '@/components/ui/BaseButton.vue';

interface Props {
	period: string;
}

interface Emits {
	(e: 'weekChange', direction: number): void;
	(e: 'addMenu'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleWeekChange = (direction: number) => {
	emit('weekChange', direction);
};

const handleAddMenu = () => {
	emit('addMenu');
};
</script>
