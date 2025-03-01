<template>
    <div :class="[
        'flex flex-col items-center justify-center p-4',
        overlay ? 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50' : ''
    ]">
        <div class="w-10 h-10 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-primary animate-spin"></div>
        <div v-if="message" class="mt-3 text-gray-700 dark:text-gray-300">{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    overlay: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: ''
    }
})
</script>
