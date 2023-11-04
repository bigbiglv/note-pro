import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.tsx'

const routers: RouteRecordRaw[] = [
  {
    name: '',
    path: '/',
    redirect: '/home'
  },
  {
    name: '首页',
    path: '/home',
    component: Home,
  }
]

const modules = import.meta.glob('../public/notes/*/*.md')

for (const path in modules) {
  const regex = new RegExp(`/notes/(.*?).md`)
  // 获取路径中笔记的一级和二级名称
  const combineName: string[] = path.match(regex)?.[1]?.split('/') || []
  const [ firstName, secondName ] = combineName

  // 待添加的路由对象
  const addRouter = {
    name: secondName,
    path: encodeURIComponent(secondName),
    component: modules[path]
  }
  const hasRouter = routers.find(el => el.name === firstName)
  // 判断是否存在一级路由
  if (hasRouter) {
    // 存在就往他的children添加
    hasRouter.children?.push(addRouter)
  } else {
    //不存在则创建
    routers.push({
      name: firstName,
      path: `/${encodeURIComponent(firstName)}`,
      redirect: `/${firstName}/${secondName}`,
      children: [addRouter]
    })
  }
}

console.log('routers', routers)
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routers,
  ],
})