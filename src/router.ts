import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.tsx'
import { useAppStore } from '@/store/index.ts'
export const routes: RouteRecordRaw[] = [
  {
    name: '哈哈',
    path: '/',
    redirect: '/home'
  },
  {
    name: '首页',
    path: '/home',
    meta: {
      hideMenu: true,
    },
    component: Home,
  }
]

/**
 * 通过文件的路径层级创建路由表
 * @param names 路径层级数组
 * @param component 组件
 * @param routes 当前路由
 * @param isFirst 是否为一级路由
 */
function createdRoute(names: string[], component: any, routes: RouteRecordRaw[], prePath = '/') {
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    const nextName = names?.[i + 1]
    const isLast = i === names.length - 1
    // 路由是否存在
    const hasRouter = routes.find(el => el.name === name)

    if(!hasRouter && i === 0) {
      // 创建首个路由
      const newRoute: RouteRecordRaw = {
        name,
        children: [],
        // 路由路径 从第一级开始拼接 /
        path: `${prePath}${encodeURIComponent(name)}`,
        // 有下级路由时重定向到首个
        redirect: nextName ? `/${encodeURIComponent(name)}/${encodeURIComponent(nextName)}` : undefined,
        // 当前为最后一级节点时赋值组件
        component: isLast ? component : null,
      }
      routes.push(newRoute)
    }
    // 非最后一个路径时则递归查找添加
    if(!isLast) {
      // 移除首个 name
      names.splice(0, 1)
      // 获取当前添加的新创建的路由
      const addRoute = routes[routes.length - 1] || {}
      const addRouteChildren = addRoute?.children || []
      // 递归查找下一级
      createdRoute(names, component, addRouteChildren, addRoute.path + '/')
    }
  }
}
const modules = import.meta.glob('../public/notes/**/*.md')
/** 根据导入的文件创建路由 */
for (const path in modules) {
  const regex = new RegExp(`/notes/(.*?).md`)
  // 文件路径
  const filePath = path.match(regex)?.[1]
  const fileNames = filePath?.split('/') ?? []
  // 文件层级
  const component = modules[path]
  createdRoute(fileNames, component, routes)
  setTimeout(() => {
    useAppStore().menuData = routes
  }, 500);

}
console.log('routes', routes)
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
