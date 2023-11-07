import { defineComponent, toRefs } from 'vue'
import store from '@/store'

const { headerHeight } = toRefs(store)

export default defineComponent({
  name: 'AppHeader',
  setup() {
    return () => (
      <header
        class="w-full fixed top-0 left-0 z-10"
        style={{height: `${headerHeight.value}px`}}
      >
        顶部
      </header>
    )
  }
})