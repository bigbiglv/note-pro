import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/store/index.ts'


export default defineComponent({
  name: 'AppMain',
  setup() {
    const appStore = useAppStore()
    const articleStyle = computed(() => {
      return {
        paddingTop: `${appStore.headerHeight}px`,
        paddingLeft: `${appStore.menuWidth}px`,
      }
    })

    return () => (
      <article style={articleStyle.value}>
        <router-view />
      </article>
    )
  }
})