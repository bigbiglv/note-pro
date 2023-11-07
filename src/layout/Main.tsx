import { defineComponent, computed } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const articleStyle = computed(() => {
      return {
        paddingTop: `${store.headerHeight}px`,
        paddingLeft: `${store.menuWidth}px`,
      }
    })

    return () => (
      <article style={articleStyle.value}>
        内容
        <router-view />
      </article>
    )
  }
})