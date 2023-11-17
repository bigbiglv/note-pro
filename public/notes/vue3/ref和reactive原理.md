# `ref`和`reactive`的原理

## `ref`
* 还是基于 `Object.defineproperty()`
* 用来定义 `string` `number`等基础类型数据，使用时需要加上`.value` `xxx.value` `template`模板语法中不用
* 也可以定义引用类型的数据，不过内部原理依旧会走`reactive`，取值还得加`.value` `obj.value.xxx`

```js
let num = 0
let obj={}
Object.defineProperty(obj,'num',{
  // value:'值',
  // enumerable:true, //是否可以被枚举
  // writable:true,   //是否可以被修改
  // configurableL:true,  //是否能被删除
  get(){
    return num
  },
  set(newVal){
    num = newVal
  }
})
console.log(obj.num) //0 走get()的
// 走set()的 修改了num
obj.num = 10
console.log(obj.num) //10 走set()的
console.log(num)     //10 set()里面修改了num
num = 11
console.log(obj.num) //11 走get() 返回num
```

---

## `reactive`
* 基于 `proxy`
* 用来定义 `object` `array`等引用类型数据
* 解决了`vue2`引用类型的数据新增，删除属性，数组通过下标修改数据视图不会更新。(`vue2`需要使用 `this.$set()`解决)
```js
let obj = {
  num:1
}
let p = new Proxy(obj,{
  //捕获修改
  //查
  get(target, propNmae){
    //target原对象 propNmae 当前的key值
    console.log('触发p的get',target, propNmae)
    // return target[propNmae]
    return Reflect.get(target,propNmae)  // Reflect vue3底层更好的捕获错误
  },
  //增改
  set(target, propNmae, newVal){
    console.log('触发p的set')
    // target[propNmae] = newVal
    Reflect.set(target,propNmae,newVal)  // Reflect vue3底层更好的捕获错误
  },
  //删
  deleteProperty(target, propNmae){
    console.log('触发了删除')
    // return delete target[propNmae]
    //Reflect vue3底层更好的捕获错误
    return Reflect.deleteProperty(target,propNmae)  
    }
  })
// 代理
p.num = 2
console.log(obj.num) //2
obj.num = 3
console.log(p.num)   //3
```