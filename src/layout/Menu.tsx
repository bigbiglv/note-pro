import { defineComponent, computed } from 'vue'
import store from '@/store'


export default defineComponent({
  name: 'AppMenu',
  setup() {

    const asideStyle = computed(() => {
      return {
        width: `${store.menuWidth}px`,
        paddingTop: `${store.headerHeight}px`,
      }
    })

    return () => (
      <aside
        class="w-3xl h-full fixed top-0 left-0 overflow-y-auto"
        style={asideStyle.value}
      >
        侧边
      </aside>
    )
  }
})