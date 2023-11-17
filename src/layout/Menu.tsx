import { defineComponent, computed } from 'vue'
import MenuItem from './components/MenuItem'
import { useAppStore } from '@/store/index.ts'

export default defineComponent({
  name: 'AppMenu',
  setup() {
    const appStore = useAppStore()
    const asideStyle = computed(() => {
      return {
        width: `${appStore.menuWidth}px`,
        paddingTop: `${appStore.headerHeight}px`,
      }
    })
    return () => (
      <aside
        class="w-3xl h-full fixed top-0 left-0 overflow-y-auto"
        style={asideStyle.value}
      >
        <ul>
          {
            appStore.menuData.map(menu => <MenuItem data={menu} key={menu.path} />)
          }
        </ul>
        侧边 {appStore.headerHeight}
      </aside>
    )
  }
})