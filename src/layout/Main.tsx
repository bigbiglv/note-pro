import { defineComponent, computed, ref, watch, nextTick } from 'vue'
import { useAppStore } from '@/store/index.ts'
import { useRoute } from 'vue-router'
import Anchor from './components/Anchor'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const appStore = useAppStore()
    const route = useRoute()

    const mainStyle = computed(() => {
      return {
        paddingTop: `${appStore.headerHeight + 20}px`,
        paddingLeft: `${appStore.menuWidth + 20}px`,
      }
    })


    // 监听路由改变 更新锚点数据
    watch(() => route.path, () => {
      nextTick(() => {
        getIdEl()
      })
    })

    const noteRef = ref<HTMLElement | null>(null)

    /** 获取文档中的 标题锚点 */
    function getIdEl() {
      const idNodes = noteRef.value?.querySelectorAll('[id]') || []
      const titleEl = ['H1','H2','H3','H4','H5','H6']
      const titleNodes = [...idNodes].filter(el => titleEl.includes(el.nodeName.toUpperCase()))
      appStore.anchorData = titleNodes.map(el => {
        return el.id
      })
    }

    return () => (
      <main style={mainStyle.value} class='h-screen overflow-hidden' id='appMain'>
        <article ref={noteRef} class='h-full overflow-auto pt-20px pr-250px pb-50px pl-20px relative bg-red-50  rounded-md'>
          <router-view />
        </article>
        <Anchor />
      </main>
    )
  }
})