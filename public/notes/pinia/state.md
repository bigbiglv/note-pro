# state

## 数据定义
* 在`store`文件夹下定义 `mianStore.ts`作为一个仓库
* 可定义多个不同的仓库文件，每个文件都有唯一的`id`，`id`一般为仓库名
```ts
import { defineStore } from 'pinia'
export default defineStore('mainStore',{
  state:()=>({
    return {
      //自动推断类型
      count:10,
    })
  }
})
```
## 使用
* 页面中要用哪个库就引入哪个
* 直接引入对应的`store`库使用数据
```ts
import mainStore from '@/store/index'
// store就是mainStore库了
const store = mainStore()
function add(){
  //state的数据直接点出来
  store.count++
}
```
## 使用`$state`来替换整个`store`的状态
```ts
store.$state = { count : 100 }
```