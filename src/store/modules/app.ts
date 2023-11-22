import { RouteRecordRaw } from "vue-router"
import { defineStore } from 'pinia'
export interface IStore {
  /** 路由数据 */
  routeData: Array<RouteRecordRaw>,
  /** 顶部header高度 */
  headerHeight: number,
  /** 侧边栏宽度 */
  menuWidth: number,
  /** 选中的菜单集合 */
  openMenuNames: string[]
  /** 页面锚点 */
  anchorData: string[]
}

export const useAppStore = defineStore('app', {
  state: (): IStore => ({
    routeData: [],
    headerHeight: 80,
    menuWidth: 200,
    openMenuNames: [],
    anchorData: []
  }),
  getters: {
    /** 根据打开当前路径 递归获取打开的菜单 */
    menuData: (state): Array<RouteRecordRaw> => {
      /** 递归设置菜单meta的开关值 */
      function setOpenMenu(data: RouteRecordRaw[], names: Array<string>) {
        for(let i = 0; i < data.length; i++){
          const menu = data[i]
          if(!menu?.meta) menu.meta = {}
          // 每次递归只对比第一层
          menu.meta.open = menu.name === names?.[0]
          if(menu?.children?.length){
            // 对比完直接去掉 下次依旧对比第一个
            const cutNames = names.length ? names.slice(1) : []
            // 递归调用
            setOpenMenu(menu.children, cutNames)
          }
        }
        return data
      }
      return setOpenMenu(state.routeData, [...state.openMenuNames])
    }
  },
})


