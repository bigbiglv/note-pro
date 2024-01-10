import { defineComponent } from 'vue'
import { useAppStore } from '@/store/index.ts'
import AppSearch from './components/Search'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const appStore = useAppStore()
    return () => (
      <header
        class="w-full fixed top-0 left-0 z-10 bg-white"
        style={{height: `${appStore.headerHeight}px`}}
      >
        顶部
        <AppSearch />
      </header>
    )
  }
})