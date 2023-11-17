# css
## 作用域
* 使用`scoped`属性可以使样式只作用于当前文件内
* 一个单文件组件可以写一个带`scoped`和不带的`<style>`
  ```vue
    <style>
      /* 全局 */
    </style>
    <style scoped>
      /* 当前文件 */
    </style>
  ```

## 样式穿透
* 带有`scoped`的样式不会渗透到子组件和`v-html`的内容
* 使用`:deep(.box)`可以让样式作用到子组件和`v-html`的内容
  ```vue
    <style scoped>
      :deep(.box){
        /* box是子组件的样式 */
      }
    </style>
  ```

## `css modules`
* 带有`module`属性的`<style>`可以将`class`作为`$style`暴露给组件
* 为`module`传入具体的值还可以自定义属性名
* 也可以使用`useCssModule`拿到`class`
  ```vue
    <script setup lang="ts">
      import { useCssModule } from 'vue'
      // 使用 useCssModule 获取class
      useCssModule()
      useCssModule('myClass')
    </script>
    <template>
      <!-- 使用$style获取class -->
      <p :class="$style.text">css modules</p>
      
      <!-- 使用具体名称 -->
      <p :class="myClass.text">css modules</p>
    </template>
    <style module>
      .text{
        color: red;
      }
    </style>
    <!-- 使用具体名称 -->
    <style module="myClass">
      .my-text{
        color: yellow;
      }
    </style>
  ```

## `css`使用`v-bind`
* `v-bind`的值修改页面也会响应式的改变
```vue
<script setup lang="ts">
const myColor = {
  color: 'red';
}
</script>

<style scoped>
  .box{
    color: v-bind('myColor.color')
  }
</style>
```
