# 双向绑定
## 表单元素
* 在可编辑的表单元素上使用
* `<input>` `<select>` `<textarea>`
* 修饰符
   * `.lazy` : 监听 `change` 事件而不是 `input`
   * `.number` : 将输入的合法符串转为数字
   * `.trim` : 移除输入内容两端空格
```html
<input v-model="inputValue">
<!-- 实际上等于 -->
<input :value="inputValue" @input="event => inputValue = event.target.value">
```

## 自定义组件
* 组件内部新增一个名为 `modelValue` 的 `props`
   * 可以使用 `v-model:xxx` 来改变这个`props`的名字
   * 通过不同的名字来实现绑定多个数据
* 组件内部数据改变时触发`update:modelValue` 的 `emit` 事件
### 默认方式
```html
<!-- 组件内 -->
<input
  :modelValue="inputValue"
  @input="$emit('update:modelValue', $event.target.value)"
/>
```
```js
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
```
### 也可以使用 `computed` 的 `get`和`set`
```html
<input :modelValue="value" > 
```
```js
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
```
### 修饰符的传递
* `v-model`的修饰符可以通过 `modelModifiers`的`props`接收
   * 自定义名字的参数可以通过 `xxx`+`Modifiers` 的 `props` 获取

```js
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
  // 名为title的参数
  title: String,
  titleModifiers: { default: () => ({}) },
})
```