import App from './App.vue'
import axios from 'axios'
import router from './router'
import { createApp } from 'vue'
import { store } from './store'
import { useVuelidate } from '@vuelidate/core'

// Bootstrap axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(router)
app.use(useVuelidate)
app.use(store)
app.mount('#app')
