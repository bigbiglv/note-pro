# 自定义hooks

* 将独立的功能抽离出来，使代码更简单
* `hooks`导出一个函数，使用解构的方式接收数据

新建 `useXxx.js`
```js
// 某个功能的hook
import { ref } from 'vue'
export function useXxx(){
    const value = ref(0)
    function fn(){}
}
//使用setup函数
import {ref} from 'vue'
export default function(){
  //代码
  let value = ref(0)
  function fn(){
    ...
  }
  return {
    fn,
    value
  }
}
```
使用
```js
import { useXxx } from ''
const { value, fn } = useXxx()
```
