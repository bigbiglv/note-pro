# `useMemo`
* 缓存计算结果，优化性能避免多余的计算
* 只能在函数的顶层调用
* 只作为优化手段，程序即使没有`useMemo`也应该能正常运行
## 使用
- 当有一个值需要通过其他值得到时可以使用`useMemo`实现
  - 其他方式
    1. 使用`useEffect`将其他值作为依赖来更新，会触发多余的更新
    2. 直接在`render`执行时赋值，渲染组件时即使依赖值不变也会进行多余的计算
- `useMemo`会保证在依赖更新的时候才触发计算
- 需要注意的是第二个参数传入一个依赖数组，依赖数组为空时每次渲染都会执行
- 对于组件依赖某个数据才触发更新时，可直接返回一个`jsx`组件进行优化，避免大列表重新渲染
```jsx
const listComp = useMemo(() => <List data={list}>, [list])
```
- 对于组件的缓存也可以直接在组件中使用`memo`包装，这样更方便
```jsx
import React, { memo } from 'react';

// 原始组件
const MyComponent = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// 使用 React.memo 包装
export default memo(MyComponent);
```