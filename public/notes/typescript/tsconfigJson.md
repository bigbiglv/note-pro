# 编译配置（tsconfig.json）

## 生成tsconfig.json
```
tsc --init
```
`files`：需要编译的文件，传数组
`include`：需要编译的文件目录，传一个数组
`exclude`：**不需要**编译的目录
`extends`：继承其他配置文件

### compilerOptions
* 编译器的选项
* 
`target`：编译之后的`js`文件的`es`版本（`es5`或者`es6`的代码）
`module`：模块化的规范
`lib`：指定项目的库
`outDir`：输出的编译后的文件目录
`outFile`：输出编译后的文件合并为一个文件（`xx/xx.js`）


`strict`：**严格检查模式**（为`true`下面的属性就都为`true`）
`allowJs`：是否编译`js`文件，默认`false`
`checkJs`：是否检查`js`文件的语法，默认`false`
`removeComments`：是否移除注释
`noEmit`：不生成编译文件（`ts`文件）
`noEmitError`：代码有错误的时候不编译
`alwaysStrict`：编译后的`js`文件是否使用严格模式
`noImplicitAny`：检查隐式的`any`（不声明变量类型）
`noImplicitAny`：是否允许不明类型的`this`
`strictNullChecks`：是否严格检查`null`值（变量的值是否`null`）


## 严格模式
* 开启`strict`就不用开下面两个了
```json
"strict": true,   //是否类型验证 
"noImplicitAny":true,  //判断any类型
"strictNullChecks":true   //undefined赋值string,null赋值number
```

## 入口文件夹和输出文件夹
```json
 /* Modules */
"rootDir" : "./"  // 入口文件夹

/* Emit */
"outDir": "./",    // 输出文件夹
```