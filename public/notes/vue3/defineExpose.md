# `defineExpose`暴露子组件属性

* 父组件通过`ref`获取的子组件实例中默认是拿不到子组件的属性
* 子组件里通过`defineExpose`宏来暴露属性、方法
* `ts`通过`typeof`拿到组件的类型，再使用`InstanceType`获取实例类型
```html
<!-- 子组件 MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

//将打开弹窗的方法暴露出去
defineExpose({
  open
})
</script>
```
```html
<!-- 父组件 -->

<script setup lang="ts">
import MyModal from './MyModal.vue'
import { ref } from 'vue'
const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
<template>
  <MyModal ref="modal" />
</template>
```

