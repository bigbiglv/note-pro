# vue-router@4

## 安装
```
npm i vue-router@4
```

## 引入
* 路由模式
  * `hash` 模式：`createWebHashHistory`
  * `history`模式：`createWebHistory`

新建路由表 `src/router/index.ts`
```ts
//引入依赖
import { createRouter, createWebHashHistory,RouteRecordRaw } from 'vue-router'
//引入页面组件
import Home from '../views/Home/index.vue'
import User from '../views/User/index.vue'
const routes : Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'home',
    meta:{
      keepAlive:true,
      tabbar:true
    },
    component:Home
  },
  {
    path:'/user',
    name:'user',
    meta:{
      keepAlive:true,
      tabbar:true
    },
    component:User
  }
]
export default createRouter({
  //在此处配置路由模式
  history: createWebHashHistory(),
  routes
})
```
在`main.ts`中引入路由
```ts
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
```

## 编程式跳转
* `push`，`replace`，`go`
* 对应`window.history.pushState`,`window.history.replaceState` 和 `window.history.go`

页面中引入对应的路由`hooks`: `useRoute useRouter`
```ts
import { useRouter } from 'vue-router'
const router = useRouter()

// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

#### 错误捕获(404页面)
```ts
 {
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component: NotFound
 }
 //匹配特定字符开头的路由
  {
    path:'/user-:afterUser(.*)'
  }
```

# 路由守卫

## 全局前置守卫`beforeEach`
* 路由跳转前触发
* `to`：即将要去的路由
* `from`：去之前的路由
* `return false`表示停止路由跳转
```ts
router.beforeEach(async (to, from) => {
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
 })
```
## 全局解析守卫`beforeResolve`
* 路由跳转的时候触发
```ts
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```

## 单个路由守卫
* 只有进入路由的时候触发
* `params`、`query` 或 `hash` 改变时不触发
* 组合式`api`可以通过`onBeforeRouteUpdate` 和 `onBeforeRouteLeave` 分别添加 `update` 和 `leave` 守卫
```ts
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  }
]
```

```ts
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  }
}
```

# 组合式`api`
* 模板中可以直接访问 `$router` 和 `$route`

引入
```ts
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
//监听
watch(
  () => route.params.id,
    async newId => {
      userData.value = await fetchUser(newId)
    }
)
```


# 滚动条`createRouter`
```ts
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 }
     
    //始终在元素 #main 上方滚动 10px
    return {
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
      behavior: 'smooth', //动画
    }
    
    //返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
    
    //锚点
    if (to.hash) {
      return {
        el: to.hash,
      }
    }
    
    //延迟滚动
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  }
})
```

# 动态路由
* `router.addRoute()`：添加
* `router.removeRoute()`：删除

## 删除路由(所有的别名和子路由也会被同时删除)
* 添加一个`name`相同的路由，会删除原来的
```ts
router.addRoute({ path: '/about', name: 'about', component: About })// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```
* `router.addRoute()` 返回的回调删除
```ts
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话
```
* `router.removeRoute()` 按`name`删除路由
```ts
router.addRoute({ path: '/about', name: 'about', component: About })// 删除路由
router.removeRoute('about')
```

## 查看路由
* `router.hasRoute()`：检查路由是否存在。
* `router.getRoutes()`：获取一个包含所有路由记录的数组