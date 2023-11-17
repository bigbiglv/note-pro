# 接口

* 所有的属性只考虑结构，不能有实际值
* 可继承
```ts
interface test{
  name:string
}
//可重复声明 会合并
interface test{
  age:number
}
//变量声明的类型
let obj:test = {
  name: 'name',
  age:10
}
```