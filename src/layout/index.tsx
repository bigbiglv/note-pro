import { defineComponent } from 'vue'
import Main from './Main'
import Header from './Header'
import Menu from './Menu'

export default defineComponent({
  name: 'AppLayout',
  setup() {
    return () => (
      <div class="w-full min-h-screen relative">
        <Header />
        <Menu />
        <Main />
      </div>
    )
  },
})