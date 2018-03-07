# vue-ui  vue组件库demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


## 注意
* 目录结构
* webpack的打包配置，主要是入口，出口配置


## 使用
```js
# 整体加载
import ui  from  'vue-ui-lib-test'
Vue.use(ui)

# 按需加载
import UiInput  from  'vue-ui-lib-test/dist/UiInput'

```
