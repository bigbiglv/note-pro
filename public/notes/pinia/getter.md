# getter

## 使用
* 数据装饰等同于`computed`
* 可以使用this访问整个`store`实例，但在`ts`中要指明数据类型
```ts
import { defineStore } from 'pinia'
export default defineStore('mainStore',{
  state:()=>({
    return {
      count:10
    })
  },
  getters:{
    // 箭头函数传入state参数 类型自动推断
    doubleCount:(state)=>{
      return state.count * 2
    }
    //使用this 指明返回类型
    doubleCount() : number {
      return state.count * 2
    }
  }
})
```
## 将数据传递给`getter`
* 在`getter`中返回一个函数来接收参数
* 此时`getter`不再具备缓存
```ts
//mainStore.ts
getter:{
  isId: (state)=>{
    return (id)=>{ 
      return id === state.id 
    }
  }
}
//页面中使用
const store = mainStore()
const isId = store.isId()
//使用
isId(10)
```
## 使用其他`store`的`getter`
* 引入其他的store直接使用
```ts
import mian2Store from './mian2Store'
...
getter{
  count : ()=>{
    return mian2Store.count * 2
  }
}
```