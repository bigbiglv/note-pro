import { createApp } from 'vue'
import './style.css'
import App from './App.tsx'
import 'virtual:uno.css'
import router from './router.ts'

const app = createApp(App)
app.use(router)
app.mount('#app')
