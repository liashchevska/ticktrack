import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { API } from './endpoints'

import './assets/main.css'

async function bootstrap(params) {
  await fetch(API.CSRF, { credentials: 'include' })

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

bootstrap()
