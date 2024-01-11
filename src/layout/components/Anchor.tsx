import { defineComponent, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/index.ts'

export default defineComponent({
  name: 'Anchor',
  setup() {
    const appStore = useAppStore()
    const activeId = ref<string>()

    function move(id: string, behavior: any = 'smooth') {
      const targetEl = document.getElementById(id)
      const targetTop = targetEl?.offsetTop
      const appMain = document.getElementById('appMain')
      const article = appMain?.querySelector('article')
      console.log('appMain', appMain)
      if(targetEl) {
        article?.scrollTo({
          top: targetTop,
          behavior
        })
        history.pushState(null, '', `#${id}`)
        activeId.value = id
      }
    }
    onMounted(() => {
      // 监听地址栏的 hash
      const targetId = decodeURIComponent(window.location.hash.substring(1))
      setTimeout(() => {
        move(targetId, 'instant')
      }, 200);
    })

    return () => (
      <ul
        class='w-200px max-h-600px p-0 fixed right-10 z-10 text list-none cursor-pointer overflow-y-auto'
        style={{top: `${appStore.headerHeight + 20}px`}}
      >
        {
          appStore.anchorData.map(anchor => {
            return (
              <li 
                onClick={() => move(anchor)}
                class={`text-14px py-1 ${activeId.value === anchor ? 'font-bold' : ''}`}
              >
                { anchor }
              </li>
            )
          })
        }
      </ul>
    )
  }
})