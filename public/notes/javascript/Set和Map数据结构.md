# `Set`
- `Set` 对象是值的合集 可以是任意类型的值
- `Set` 结构没有键名，只有键值 (键名就是键值)
- 传入一个可迭代对象就能直接添加到集合中
- 所有值保持唯一，也就是不会在同一集合中出现相同的值
  - 相等值校验是通过 `Same-value-zero equality` 算法来判断的
  - 类似 `===` 运算符，但是对于 `NaN` 做特殊处理
  - `Set` 认为 `NaN`等于自身 即使在 `NaN === NaN`为false 多次添加也只会添加一个 
## 一些用法

### 初始化数据
传入可迭代对象
```ts
// 类数组是可迭代对象
const set = new Set(document.querySelectorAll('div'))
// 字符串是可迭代对象
const set = new Set('123') // size 3
```

### 遍历
- `Set`实例本身就可遍历，遍历器生成函数是它的`values()`方法
- `entries()` `keys()` `values()` 返回一个迭代器对象再去遍历
- `keys()`和`values()`是一样的
- `for...of` `forEach` 可直接在实例上操作
```ts
let set = new Set(['red', 'green', 'blue']);
// 直接遍历set即可
for (let x of set) {
  console.log(x);
}

// forEach
set.forEach((value, key) => console.log(key + ' : ' + value))

// entries 键值和键名是一样的值
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 转数组
```ts
const set = new Set()
// 展开运算符
const arr = [...set]
// 
const arr = Array.form(set)
```

### 去重
```ts
  const newArr = [...new Set([1,1,2,2,3,3])] // [1,2,3]
```

# `WeakSet`
- 与 `Set` 相似
- 值只能为引用类数组
- 弱引用 垃圾回收机制不考虑 `WeakSet` 对该对象的引用
- 由于无法保证元素是否存在，有可能遍历完就被垃圾回收了所以**不可遍历** 没有 `size`

# `Map`
- 键值对的数据结构
- 赋值同一个键会覆盖上一次的值
- 这里的 `keys()` 和 `valuse()` 就会按预期返回两个对应的数组了
- 其他的遍历方法和`Set`一致

## 与 `Object` 的区别
1. `Object` 的 `key`只能为字符串或者`Symbol`, `Map`的`key`可以是任意类型
2. `Object` 有原型所以会有原型上的 `key`, 可能会导致对象注入攻击
3. `Object` 上的 `key` 可能没有顺序（不可靠）, `Map` 上按照插入顺序
4. `Object` 长度只能通过 `Object.keys().length`, `Map`直接使用`size`
5. `Object` 没有迭代协议, `Map`是可迭代对象
6. `Map` 在繁添加和删除键值对的场景中表现更好
7. `Object`能直接从`JSON`互转, `Map` 没有对序列化或解析的原生支持

## 一些用法

### 对象转`Map`
```ts
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

## 注意
```ts
const wrongMap = new Map();
// 直接赋值key
wrongMap["bla"] = "blaa";
wrongMap["bla2"] = "blaaa2";
// 能正常添加
console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
// 但是对于 has delete这些方法会失效 而且size也不会增加
```

# `WeakMap`
- 和 `Set`对`WeakSet`的关系相似
- 键名只接受引用数据
- 键名弱引用，键值正常引用, 键名引用取消了键值自然也就没了




