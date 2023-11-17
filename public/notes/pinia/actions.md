# actions

* 同步异步都能使用
* 不使用箭头函数（this指向问题）
* 使用`this`获取`store`数据
```ts
import {defineStore} from 'pinia'
export default defineStore('mainStore',{
  state:()=>({
    return {
      count:10
    })
  },
  actions:{
    actionsAdd(){
      //使用this修改数据
      this.count++
      //推荐
      this.$patch(state =>{
        state.count++
      })
    }
  }
})
```
## 使用
```ts
store.actionsAdd()
```