import { defineComponent, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'AppSearch',
  setup() {
    const router = useRouter()
    /** 关键字 */
    const keyword = ref<string>('')
    /** 搜索结果 */
    const result = ref<Array<{name: string, path: string, text: string}>>([]) 
    /** 所有文件内容 */
    const files = import.meta.glob('/public/notes/**/*.md', { as: 'raw' });
    /** 关键字提示弹窗 ref */
    const modalRef = ref<null | HTMLElement>(null)
    /** 关键字提示弹窗开关 */
    const isModal = ref(false)

    /** 点击弹窗外部 */
    onClickOutside(modalRef, () => {
      isModal.value = false
    })

    /** 搜索 */
    function search(e: Event) {
      e.preventDefault()
      result.value = []
      isModal.value = true
      const regex = {
        path: new RegExp(`/notes(.*?).md`),
        name: new RegExp(`/notes/(.*?).md`),
      }
      for (const path in files) {
        files[path]().then((str) => {
          const index = str.indexOf(keyword.value)
          if(index !== -1) {
            const routePath = encodeURIComponent(path.match(regex.path)?.[1] || '/').replace(/%2F/g, '/')
            const name = path.match(regex.name)?.[1].replace(/\//, ' - ') || '--'
            const text = str.slice(index > 10  ? index - 10 : 0, index + 1000)
            result.value.push({
              name,
              path: routePath,
              text
            })
          }
        })
      }
    }

    /** 跳转结果页面 */
    function goPage(path: string) {
      router.push(path)
      isModal.value = false
    }

    return () => (
      <form onSubmit={e => search(e)}>
        <div>
          <input type="text" v-model={keyword.value} />
          <button onClick={e => search(e)}>搜索</button>

          <ul 
            class='w-500px max-h-200px bg-white p-2 overflow-y-auto rounded-md'
            ref={modalRef}
            v-show={isModal.value}
          >
            {
              result.value.map(({path, name, text}) => {
                return (
                  <li
                    class='p-2 cursor-pointer hover:bg-gray-100'
                    key={path}
                    onClick={() => goPage(path)}
                  >
                    <p>{name}</p>
                    <p class=' truncate'>{text}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </form>
    )
  }
})