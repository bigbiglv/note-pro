# computed 计算属性

* 只有依赖的响应式数据变化才会更新，有缓存
* 通过`hooks`的形式引入，函数直接返回响应式数据的值
* 注意：不要在计算属性中使用**异步**或者**操作`dom`**
```js
import {ref,computed} from 'vue'
let num2=ref(0)
let num1=ref(0)
let sum = computed(()=>{
  return num1.value+num2.value
})
let sum=computed({
  get(){
    return xxx
  },
  set(value){
    ...
  }
})
```

## `ts`支持
* 会根据返回的值自动推断类型
* 也可以指定类型
```ts
import { ref, computed } from 'vue'
const num = ref(1)
let sum = computed(()=>{
  return num.value * 2  //number
})
//指定类型
let sum = computed<number>(()=>{
  return num.value * 2  //number
})
```
