<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTelegram } from "@/composables/useTelegram";

const { isInTelegram, authenticate } = useTelegram()

// Автоматическая аутентификация через Telegram
onMounted(async () => {
	if (isInTelegram.value) {
		// Добавляем скрипт Telegram Web App если он ещё не добавлен
		if (!document.getElementById('telegram-web-app-script')) {
			const script = document.createElement('script')
			script.id = 'telegram-web-app-script'
			script.src = 'https://telegram.org/js/telegram-web-app.js'
			document.head.appendChild(script)

			script.onload = async () => {
				// Выполняем аутентификацию после загрузки скрипта
				const authResult = await authenticate()
				if (authResult) {
					console.log('Telegram authentication successful')
				}
			}
		} else {
			// Если скрипт уже загружен, выполняем аутентификацию
			const authResult = await authenticate()
			if (authResult) {
				console.log('Telegram authentication successful')
			}
		}
	}
})
</script>

<style>
/* Стили для адаптации под Telegram UI */
:root[data-theme="dark"] {
	--bg-color: #212121;
	--text-color: #ffffff;
	--button-color: #8774e1;
	--button-text-color: #ffffff;
}

:root[data-theme="light"] {
	--bg-color: #ffffff;
	--text-color: #000000;
	--button-color: #8774e1;
	--button-text-color: #ffffff;
}

body {
	background-color: var(--bg-color);
	color: var(--text-color);
}
</style>
