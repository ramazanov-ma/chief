<template>
	<button
		class="flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
		:class="[
			sizeClasses[size],
			variantClasses[variant]
			]"
		v-bind="$attrs"
	>
		<slot/>
	</button>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
}>(), {
	variant: 'primary',
	size: 'md'
});

const variantClasses = {
	primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
	secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300',
	outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100',
	ghost: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
};

const sizeClasses = {
	sm: 'text-sm px-3 py-1.5',
	md: 'text-sm px-4 py-2',
	lg: 'text-base px-6 py-3'
};
</script>
