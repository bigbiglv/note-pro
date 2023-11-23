# JSX语法
* JavaScript XML
1. 不需要引号
2. 可以用括号整体括起来
3. 只能有一个根标签
4. 表达式使用 `{}` 包起来，也是以使用三木运算符和`map`循环
5. 标签上的`class`改成`className`
6. 标签上的`style`需要传一个对象，变量使用括号数值需要传入对象所以就是两个括号
7. 标签为小写
   
## `class`和`style`
```jsx
render(){
  const style = {color : '#fff'}
  return (
    {/* class变成className */}
    <div className="box">
      {/* 第一个括号表示传一个变量 第二个表示style传入一个对象 */}
      <h1 style={style}>我是h1标签</h1>
    </div>
  )
}
```

## 三木运算符
```jsx{5}
render(){
  let i = 5
  return(
    {/* 直接在括号写就行了 */}
    <h1>{ i > 1 ? '':'' }</h1>
  )
}
```

## 事件绑定
```jsx{4,8-10}
class MyComponent extends React.Component {
  render(){
    return (
      <button onClick="{this.handerClick}"> 点击触发事件 </button>
    )
  }
  handerClick = () =>{

  }
}
```

## `state`使用
```jsx{2-4,7}
import { useState } from 'react'
export default function useCount (){
  const [ count, setCount ] = useState(1)
  render(){
    return (
      <h1>{ count }</h1>
    )
  }
}
```

## 数据遍历
```jsx{8-12}
import { useState } from 'react'
export default function useCount (){
  const [ list, setList ] = useState([1,2,3,4,5])
  render(){
    return (
      <div>
        <ul>
          {
            list.map((el,i)=>{
              return <li key={i}> {el} </li>
            })
          }
        </ul>
      </div>
    )
  }
}
```

