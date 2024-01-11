import { defineComponent } from 'vue'
import Main from '../Main'
import Header from '../Header'
import Menu from '../Menu'
import './index.less'
export default defineComponent({
  name: 'AppLayout',
  setup() {
    return () => (
      <div class="w-screen min-screen overflow-hidden relative bg">
        <Header />
        <Menu />
        <Main />
      </div>
    )
  },
})