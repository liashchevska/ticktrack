import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { API } from './endpoints'

import './assets/styles/main.css'
import { request } from './utils/request'

async function bootstrap(params) {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)

  await request(API.CSRF)
  app.mount('#app')
}

bootstrap()
