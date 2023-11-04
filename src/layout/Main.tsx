import { defineComponent, computed } from 'vue'
import layoutConfig from './settting'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const articleStyle = computed(() => {
      return {
        paddingTop: `${layoutConfig.headerHeight}px`,
        paddingLeft: `${layoutConfig.menuWidth}px`,
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