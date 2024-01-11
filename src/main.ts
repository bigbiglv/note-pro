import { createApp } from 'vue'
import store from '@/store/index.ts'
import './style.css'
import './highlight/theme/github-dark.css'
import './less/color.less'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import App from './App.tsx'
import 'virtual:uno.css'
import router from './router.ts'


const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
