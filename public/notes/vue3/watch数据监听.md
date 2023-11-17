# `watch`和`watchEffect`数据监听

* 绑定在当前组件实例上的，会随着组件的卸载而销毁
* 组件更新之前被调用，侦听器回调中访问的 `DOM` 将是被 `Vue` 更新之前的状态
* **在异步回调中创建一个侦听器的话是不会随着组件的卸载而销毁的，需要手动停止**
```ts
import { ref,watch } from 'vue'
let test = ref(0)
setInterval(() => {
  test.value++
}, 1000);
setTimeout(() => {
  //不会销毁
  const unwatch = watch(test,()=>{
    console.log('test',test)
  })
}, 2000);
//调用侦听器返回的函数就能停止
unwatch()
```
## `watch`
* 参数1：监听的数据，可以是箭头函数，数组和单个参数
* 参数2：回调函数
* 参数3：属性设置 
   * `immediate`: 
   * `deep`: 深度监听
   * `flush`: `post` 侦听器回调中能访问被 Vue 更新之后的 DOM

### `ref` 定义的数据
* 分为基本类型和引用类型
  * 监听基本数据类型不需要加`.value`
  * 监听引用数据类型需要加`.value`
```js
 // 1.监听ref定义的1个数据
 //基本数据类型 不需要 .value
watch(num,(newVal,oldVal)=>{
   console.log('num改变了',newVal,oldVal)
})

 //引用数据类型 需要 .value
watch(obj.value,(newVal,oldVal)=>{
   console.log('obj改变了',newVal,oldVal) 
})
 /* 或者使用deep */
 //监听具体某个属性的时候会失效
watch(obj,(newVal,oldVal)=>{
   console.log('obj改变了',newVal,oldVal)
},{deep:true})

 // 2.监听ref定义的2个数据
watch([num,num2],(newVal,oldVal)=>{
   // newVal,oldVal也变成数组的形式
   console.log('num或num2改变了',newVal,oldVal)
})



```

### `reactive`定义的数据
* 内部属性值是基本数据类型的时候不需要`deep`属性也能监听到但`deep`不能手动关闭
* 内部属性值是引用数据类型的时候就需要添加`deep`，因为监听的是内存地址
```js
 // 1.监听reactive定义的数据 
 watch(obj, (newVal,oldVal) => {
   // ! oldVal有问题
   console.log('obj改变了',newVal,oldVal)
 })

 // 2.监听reactive定义的数据的某一个属性 箭头函数
 watch(() => obj.obj2.idd, (newVal,oldVal) => {
   console.log('obj.obj2.idd改变了',newVal,oldVal)
 })

 // 3.监听reactive定义的数据的多个属性 箭头函数返回数组
 watch(() => {return [obj.obj2.idd, obj.id]}, (newVal,oldVal) => {
   console.log('obj.obj2.idd或obj.id改变了',newVal,oldVal)
 })
 // 或 数组里每个都用箭头函数返回
 watch([() => obj.obj2.idd, ()=>obj.id],(newVal,oldVal) => {
   console.log('obj.obj2.idd或obj.id改变了',newVal,oldVal)
 })

 // 4.监听reactive定义的数据的属性也是一个对象 obj2为对象
 // ! 这个时候需要加deep:true
 watch(() => obj.obj2, (newVal,oldVal) => {
   console.log('obj.obj2改变了',newVal,oldVal)
 }, {deep:true})
```

---
## `watchEffect`
* `watchEffect`函数体内使用的那个参数就监听哪个参数
* 有点像`computed`，但是`computed`更注重`return`的值，`watchEffect`更注重过程，不用`return`
* `watchPostEffect`： 相当于使用了 `{ flush: post}`, 能访问被 Vue 更新之后的 DOM

```js
watchEffect(()=>{
   //用到了obj.id就只监听obj.id
   console.log('watchEffect',obj.id)
})
watchPostEffect(() => {
  // 能访问被更新之后的组件
})
```