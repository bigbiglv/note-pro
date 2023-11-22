import { defineComponent, computed, watch } from 'vue'
import MenuItem from './components/MenuItem'
import { useAppStore } from '@/store/index.ts'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'AppMenu',
  setup() {
    const appStore = useAppStore()
    const route = useRoute()

    /** 根据路由path获取打开的菜单项 */
    function firstOpenMenu(){
      const path = decodeURIComponent(route.path)
      appStore.openMenuNames = path.split('/').slice(1, -1)
    }

    watch(() => route.path, () => {
      firstOpenMenu()
    })

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
        <ul class='list-none p-0 m-0'>
          {
            appStore.menuData.map(menu => <MenuItem data={menu} key={menu.path} />)
          }
        </ul>
      </aside>
    )
  }
})