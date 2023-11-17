# 组合式`api`和选项式`api`

## 组合式`api`
* 数据和方法不需要`return`出去
* 组件只需要引入不需要声明
* `defineProps`和`defineEmits`不需要手动引入

---
## 选项式`api`
* 代码都写在`setup()`函数里面
* 最后把数据和方法`return`出去
* `setup()`函数中不能使用`async`语法糖 因为最后要返回一个对象（异步组件和`suspense`可以返回`promise`）
* 没有`this`
```js
//按需引入方法
import { ref, reactive } from 'vue'
export default {
  compontents:{...},
  props:{...},
  emits:{...},
  ...
  setup(props,contetext){
    //ref定义基础数据
    let num = ref(0)
    //reactive定义obj array 引用类型数据
    let obj = reactive({
      id:1
    })

    //定义方法
    function add(){
      num.value++
    }

    // 抛出
    return {
      num,
      add,
      obj
    }
  }
}
```