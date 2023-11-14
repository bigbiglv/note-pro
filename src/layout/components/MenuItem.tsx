import { defineComponent } from 'vue'
import type { IMenuData } from '@/store/modules/app.ts'
import { RouteRecordName } from 'vue-router'
import { useAppStore } from '@/store/index.ts'


interface Props {
  data: IMenuData
}

const MenuItem = defineComponent({
  name: 'MenuItem',
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  setup(props: Props) {
    const appStore = useAppStore()
    const { data } = props


    function switchMenu(name?: RouteRecordName) {
      appStore.selectedMenuName = name
    }

    /** 单个菜单的按钮 */
    const singleItemRender = (
      <li>
        <router-link to={data.path}>
          {data?.meta?.name ?? data.name}
        </router-link>
      </li>
    )

    /** 有多个菜单的按钮 */
    const partnerItemRender = (
      <li>
        <span class="select-none" onClick={() => switchMenu(data.name)}>
          {data?.meta?.name ?? data.name}
        </span>
        {
          data.name === appStore.selectedMenuName &&
          <ul>
            {
              data.children?.map(child => {
                return <MenuItem data={child} key={child.path} />
              })
            }
          </ul>
        }
      </li>
    )

    const menuItemRender = data.children?.length ? partnerItemRender : singleItemRender

    return () => !data.meta?.hideMenu && menuItemRender
  }
})

export default MenuItem
