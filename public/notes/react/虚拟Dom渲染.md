## 虚拟DOM渲染到页面 
---
* 虚拟DOM是一个obj对象，最终会转成真实dom
### 引入`react`
```html
<script src="https://unpkg.com/react@16/umd/react.development.js" ></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" ></script>
```
### 创建容器
```html
<div id="app"></div>
```
### 使用`js`创建虚拟`Dom`
```html
<script>
  //标签名， 属性， 文本节点
  const VDOM = React.createElement('h1', {id:'title'}, 'react')
  ReactDOM.render(VDOM,document.getElementById('app'))
</script>
```

### 使用`jsx`创建虚拟`Dom`
`jsx`解析需要`babel`
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
`script`标签的`type`为`babel`
```html
<script type="text/babel">
  //创建虚拟dom
  const VDOM = (
    <div>
      <h1>react</h1>
    </div>
  )
  //渲染到页面的容器里
  ReactDOM.render( VDOM, document.getElementById('app'))
</script>
```
