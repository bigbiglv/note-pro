# `package.json`

* 记录当前项目使用了哪些包以及包的具体信息
* 区分哪些包在开发环境使用，哪些包在生产环境使用或者两个环境都使用
* 每次运行`npm install` 的时候都会把当前的包信息记录到`package.json`中

## 新建（项目首次新建的时候，安装第一个包的时候就自动创建了）
```
npm init -y
```
## `dependencies`
* 开发环境和生产环境都需要使用
* `package.json` 中的属性，用来记录当前项目使用的包
### `devDenpendencies`
* 仅在开发环境使用的包
```
npm install xxx --save-dev
```
简写
```
npm i xxx -D
```