# `axios`实例

## 全局默认配置
```ts
axios.defaults.baseURL = 'https://some-domain.com/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

## 创建实例
* 使用`axios.create([config])`创建实例
* 参数传入`config:AxiosRequestConfig`配置项
* 配置参数
   * `timeout`: 请求超时
   * `baseURL`: 基础请求路径
   * `url`: 请求路径，拼接在`baseURL`后面
   * `headers`: 自定义请求头
   * `responseType`: 浏览器响应的数据类型
   * `onUploadProgress:(progressEvent)=>{}`: 上传进度事件
   * `onDownloadProgress:(progressEvent)=>{}`: 下载进度事件
```ts
import axios, { AxiosRequestConfig } from 'axios'
const config: AxiosRequestConfig = {
  //基础请求接口路径
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  //自定义请求头
  headers: {'X-Custom-Header': 'foobar'}
}
// instance接收实例
const instance = axios.create(config);
//修改实例值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```
