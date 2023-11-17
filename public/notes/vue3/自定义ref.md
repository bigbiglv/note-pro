# customRef 自定义ref()函数

```js
import { customRef } from 'vue'
function myRef(value){
  let timer
  return customRef((track, tragger)=>{
    return{
      get(){
        console.log("myRef触发get")
        track() //追踪数据变化
        return value
      },
      set(newval){
        console.log("myRef触发set",newval)
        //延迟1s更新 防抖
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newval
          tragger()  //通知vue解析模板
        }, 1000);
      },
    }
  })
}
```