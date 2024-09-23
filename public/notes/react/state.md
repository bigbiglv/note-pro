# `state`的使用
* 通过组件中是否有`state`来区分复杂组件和简单组件
* `state`为一个对象，里面包含多个属性保存数据
* 使用 `useState` hook来创建一个`state`, 解构出一个储存`state`的变量和一个修改`state`的方法
  ```ts
  const { count, useCount } = useState(0)
  ```
* 执行 `useState` 后会触发组件的重新渲染，组件重新渲染会重新再跑一次这个函数

## 函数式组件
```js
//引入useState()
import { useState } from 'react'
export default function useCount(props) {
  //返回一个数组， 解构数组得到数据和方法 useState参数传入初始值
  const [ count, setCount ] = useState(0)
  function add(){
    //第一种写法
    setCount(count+1)
    //第二种写法，能直接拿到count
    setCount((count)=>{
      return count+1
    })
  }
  return(
    <div>
      {/* 正常使用 */}
      <span>{ count }</span>
      <button onClick={add}>加1</button>
    </div>
  )
}
```

## 类组件
* 类组件中的`state`不能直接更改，要使用`this.setState()`方法
* 类组件的`constructor`执行的次数为该组件使用的次数
* `render`的次数是初始化1次，后续每次更新`state`都会执行
* 类组件定义事件的方法要注意`this`指向问题，应该先在`constructor`里把组件类的this传给实例里对应的方法
* 类组件中的方法默认为严格模式，组件类构建出来的实例里面的方法`this`的指向就为`undefined`，所以要在`constructor`中把组件类的this给到实例

```jsx
//定义类组件
class MyComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isRed:true
    }
    this.changeColor = this.changeColor.bind(this)
  }
  render() {
    //解构出来
    let { isRed } = this.state
    return (
      <div>
        <h1>我是{isRed ? '红':'白'}色</h1>
        <button onClick={this.changeColor}>切换颜色</button>
      </div>
    )  
  }
  changeColor(){
    this.setState({
      isRed:!this.state.isRed
    })
  } 
}
//把组件渲染到app容器， 组件名大写且必须以标签的形式传参才会找自定义组件
ReactDOM.render(<MyComponent/>,document.getElementById('app'))

```
### 简写`state`
* 初始化的`state`属性直接赋值，不需要在`constructor`里面定义
* 实例方法使用赋值箭头函数的方式，不需要在`constructor`里面为实例指定`this`指向，直接赋值相当于是在实例上添加一个属性，这个属性是一个函数，使用箭头函数可以保证`this`指向当前实例
```jsx
//定义类组件
class MyComponent extends React.Component {
  state = {
    isRed:true
  }
  render() {
    let { isRed } = this.state
    return (
      <div>
        <h1>我是{isRed ? '红':'白'}色</h1>
        <button onClick={this.changeColor}>切换颜色</button>
      </div>
    )  
  }
  changeColor = ()=>{
    this.setState({
      isRed:!this.state.isRed
    })
  }
 }
  //把组件渲染到app容器， 组件名大写且必须以标签的形式传参才会找自定义组件
 ReactDOM.render(<MyComponent/>,document.getElementById('app'))
```
