import { RouteRecordName, RouteMeta } from "vue-router"
import { defineStore } from 'pinia'
console.log('store')
export interface IStore {
  /** 菜单数据 */
  menuData: Array<IMenuData>,
  /** 顶部header高度 */
  headerHeight: number,
  /** 侧边栏宽度 */
  menuWidth: number,
  /** 选中的菜单name */
  selectedMenuName: RouteRecordName | undefined
}

export interface IMenuData {
  name?: RouteRecordName,
  path?: string,
  meta?: RouteMeta,
  children?: Array<IMenuData>
}

export const useAppStore = defineStore('app', {
  state: (): IStore => ({
    menuData: [],
    headerHeight: 80,
    menuWidth: 200,
    selectedMenuName: '',
  }),
  getters: {
    // list: (state) => {
     
    //   setTimeout(() => {
    //     console.log('routes',routes)
    //   }, 2000);
    //   return routes.map(router => {
    //     return {
    //       name: router.name,
    //       path: router.path,
    //       meta: router.meta,
    //       children: router.children?.map(child => ({
    //         name: child.name,
    //         path: child.path,
    //         meta: child.meta,
    //         children: [],
    //       }))
    //     }
    //   })
    // }
  }
})


