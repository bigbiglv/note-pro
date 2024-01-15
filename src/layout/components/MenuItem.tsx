import { RouteRecordRaw } from "vue-router"
import { defineComponent, TransitionGroup } from 'vue'
import { useAppStore } from '@/store/index.ts'

interface Props {
  data: RouteRecordRaw
}

const MenuItem = defineComponent({
  name: 'MenuItem',
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  setup(props) {
    const appStore = useAppStore()

    const { data } = props as Props

    /** 点击展开菜单项 */
    function switchMenu(name?: string) {
      // 判断当前点击的菜单项是否为打开的菜单项并记录下标
      const index = appStore.openMenuNames.findIndex(el => el === name)
      if(index === -1) {
        // 当前菜单为关闭状态 打开
        // 查找出需要打开的父级菜单 路由name转为数组 ['a', 'b']
        const namesToArr = name?.split('-') || []
        // 拼接为多层级name的集合 ['a', 'a-b']
        appStore.openMenuNames = namesToArr.reduce((acc, cur) => {
          acc.push(acc.length === 0 ? cur : `${acc[acc.length - 1]}-${cur}`)
          return acc
        }, [] as string[])
      } else {
        // 当前菜单为打开状态 关闭
        appStore.openMenuNames = appStore.openMenuNames.slice(0, index)
      }
    }

    /** 单个菜单的按钮 */
    const singleItemRender = () => (
      <li class='h-40px px-4 pl-8 flex items-center'>
        <router-link to={data.path} class='no-underline'>
          {data?.meta?.name ?? data.name}
        </router-link>
      </li>
    )
    /** 有多个菜单的按钮 */
    const partnerItemRender = () => (
      <>
        <li class='h-40px px-4 flex items-center' onClick={() => switchMenu(data.name as string)}>
          <span class="select-none cursor-pointer">
            {data?.meta?.name ?? data.name}
          </span>
        </li>
        {
          data.meta?.open && 
          <TransitionGroup
            name="list"
            tag="ul"
            appear
          >
            {
              data.children?.map(child => {
                return <MenuItem data={child} key={child.path} />
              })
            }
          </TransitionGroup>
        }
      </>
    )

    const menuItemRender = () => (data.children?.length ? partnerItemRender() : singleItemRender())
    return () => !data.meta?.hideMenu && menuItemRender()
  }
})

export default MenuItem
