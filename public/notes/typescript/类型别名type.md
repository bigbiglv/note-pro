# 类型别名 `type`

* 当一个类型比较复杂的时候可以使用 `type`关键字起一个别名
* 名字用大写`T`开头
```ts
type Ttype1 = string | boolean
type Ttype2 = number
//还可以合并其他的type
type Ttype3 = Ttype1 | Ttype2
let test : Ttype3 
test = 1
//or
test = '1'
//or
test = true
```