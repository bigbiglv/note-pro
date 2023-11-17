# `vscode i18n-ally` 扩展配置

## 文档

[i18n-ally](https://github.com/lokalise/i18n-ally/wiki "i18n-ally文档")

## 效果
* 代码提示
* 通过配置显示语言能直接看到改变量下的语言文字
* 查看各个语言翻译情况 (缺失的文案, 翻译进度)
* 当前文件使用了哪些语言 `key`
* 当前文件可能需要配置的文字
* 翻译树，根据语言包目录展示到变量

## 配置文件
项目根目录的 `.vscode/settings.json`配置

## 语言包目录结构
### 默认（无需配置直接识别）
* 每个语言为独立的文件夹, 文件夹下有着各个文件无子文件夹
```
  locales
  ├── en
  |   ├── common.json
  |   ├── buttons.json
  |   ├── ...
  |   └── <filenames>.json
  ├── zh-CN
  |   ├── common.json
  |   ├── buttons.json
  |   └── ...
  └── <country-code>
      ├── common.json
      ├── buttons.json
      └── ...
```

### 使用命名空间
* 每个语言的文件夹下还有嵌套的文件夹
* 通过配置命名空间和路径`i18n-ally`才能识别到语言包
* 示例
   * `zh-CN/components/common.json` 文件会正确的识别为 `t('components.common.xxx')`
     文件夹名`components`会识别为路径的一部分
   * `zh-CN/common.json`文件会正确的识别为`t('common.xxx')`
```
  locales
  ├── en
  |   ├── components
  |   |   └──common.json     
  |   ├── common.json
  |   └── buttons.json
  ├── zh-CN
  |   ├── components
  |   |   └──common.json     
  |   ├── common.json
  |   └── buttons.json
  └── zh-CN
      ├── components
      |   └──common.json     
      ├── common.json
      └── buttons.json
  
```
命名空间配置
```json
// setting.json
{
  "i18n-ally.namespace": true,
  "i18n-ally.pathMatcher": "{locale}/{namespaces}.json",
}
```

## 常用配置项目
```json
{
  // 语言包路径指定
  "i18n-ally.localesPaths": ["src/locales/lang"],
  // 语言包文件类型
  "i18n-ally.enabledParsers": ["ts"],
  // 翻译器
  "i18n-ally.translate.engines": [
    "google-cn",
    "google",
    "deepl"
  ],
  "i18n-ally.keystyle": "nested",
  // 命名空间是否开启
  "i18n-ally.namespace": true,
  // 匹配自定义路径
  "i18n-ally.pathMatcher": "{locale}/{namespaces}.ts",
  // 源语言
  "i18n-ally.sourceLanguage": "zh-CN",
  // 显示的语言
  "i18n-ally.displayLanguage": "zh-CN",
}

```
