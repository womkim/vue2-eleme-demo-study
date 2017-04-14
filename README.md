# Vue2.0仿饿了么app学习

> A Vue.js project

这里是学习慕课网Vue视频时，边学边做的项目，由于版本改动，这里的表现形式会与视频中的不同。

本项目使用的是Vue2.x+pug+less+es6+webpack，其中一些方法，在学习过程中根据自己的理解表现形式会有所不同。



项目演示：[demo](https://womkim.github.io/vue2-eleme-demo-study/)

demo说明：查看的demo是部署在github上，所以去除了Vue-source获取数据方式，改用直接获取json方式。由于github上是使用HTTPS，而eleme图片是使用http方式获取，所以浏览器中会有警告提示: vendor.559010f….js:6 Mixed Content: The page at '...' was loaded over HTTPS, but requested an insecure image '...'. This content should also be served over HTTPS.

关于本次学习，做了一些有关新版本改动和pug、less使用相关的[学习记录](./record.md)。

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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
