# Props 

## 使用`Proptypes`
```html
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
```
## 函数式组件
* `props`作为函数的参数传入后使用
* `props`类型限制只能在函数外另外声明
```jsx{1,5-8}
function User(props){
  return (
    <div>
      <ul>
        <li>用户名：{props.name}</li>
        <li>性别：{props.sex}</li>
        <li>年龄：{props.age}</li>
      </ul>
    </div>
  )  
}
```
### 类型限制
```js
//props类型限制 isRequired：必填 func：函数
User.propTypes = {
  name: PropTypes.string,
  sex: PropTypes.string.isRequired,
  age: PropTypes.number
};
```
### 默认值 
```js
//props默认值
User.defaultProps = {
    name:'默认名称'
}
  
ReactDOM.render(<User name="用户1" sex="男" age={10}/>,document.getElementById('app1'))
```

## 类式组件

* 自定义组件的标签上的属性会以对象的形式保存在组件的`props`中
* 取值直接使用`this.props.xxx`
* 可以使用展开运算符把一个对象直接传到标签中
* `props`为只读
* 需要在`constructor`中使用`props`时，需要传`props`并调用`super(props)`
```jsx{6,7}
class User extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>用户名：{this.props.name}</li>
          <li>性别：{this.props.sex}</li>
        </ul>
      </div>
    )  
  }
}
//使用对象传参 数字为number类型需要加{}
ReactDOM.render(<User name="用户1" sex="男" age={10} />,document.getElementById('app1'))

let props = {
  name:'用户2',
  sex:'女',
  age:11
}
//babel加react能让对象使用展开运算符（仅限于标签使用）
//key对应
ReactDOM.render(<User {...props}/>,document.getElementById('app2'))
```
### `props`类型限制 `Proptypes`
* 首字母小写，不会与默认的关键字重复
* 函数类型为`func`，避免关键字重复
* `isRequired`必填项在类型限制后面声明

```js
User.propTypes = {
  name: PropTypes.string,
  sex: PropTypes.string.isRequired,
  age: PropTypes.number 
};
```
### `props`默认值 `defaultProps`
```js
User.defaultProps = {
  name:'默认名称'
}
```
### `props`简写
* 类中使用`static`关键字可以把属性添加在类上，直接添加是添加在实例上

```jsx
class User extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>用户名：{this.props.name}</li>
          <li>性别：{this.props.sex}</li>
          <li>年龄：{this.props.age}</li>
        </ul>
      </div>
    )  
  }
  //props类型限制 isRequired：必填 func：函数
  static propTypes ={
    name: PropTypes.string,
    sex: PropTypes.string.isRequired,
    age: PropTypes.number
  }
  //props默认值
  static defaultProps = {
    name:'默认名称'
  }
}
```

