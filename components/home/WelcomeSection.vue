<template>
    <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div class="flex justify-between items-start mb-4">
            <div>
                <h2 class="text-xl font-semibold mb-1">
                    {{ family.length === 1 ? 'Ваше меню' : 'Семейное меню' }}
                    {{ family.length === 1 ? '🍽️' : '👨‍👩‍👧‍👦' }}
                </h2>
                <p class="text-sm text-slate-500">
                    {{ currentMenu.daysPlanned }} из {{ currentMenu.totalDays }} дней спланировано
                </p>
            </div>
        </div>

        <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
                class="h-full bg-blue-500 transition-all duration-300"
                :style="{
          width: `${currentMenu.weekProgress}%`
        }"
            ></div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
      <span class="text-sm text-slate-500">
        Следующее планирование: {{ formatDate(currentMenu.nextPlanningDate) }}
      </span>
            <BaseButton
                variant="secondary"
                class="sm:w-auto w-full justify-center"
                @click="startPlanning"
            >
                <font-awesome-icon icon="calendar-plus" class="text-slate-700 mr-2" />
                Спланировать меню
            </BaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();

const props = defineProps<{
    family: Array<{
        id: number;
        name: string;
    }>;
    currentMenu: {
        weekProgress: number;
        daysPlanned: number;
        totalDays: number;
        nextPlanningDate: string;
    };
}>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
    });
};

const startPlanning = () => {
    router.push('/menu/plan');
};
</script>
