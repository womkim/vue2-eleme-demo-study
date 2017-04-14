### 项目开发过程中的一些记录

[TOC]

#### 1.x到2.x版本的[改动](https://github.com/vuejs/vue/issues/2873) 

---

由于慕课网上视频是使用Vue 1.x版本开发的，在使用2.x版本学习时会遇到一些改动问题，这里标注一下。

- 在配置路由时，首次进入时直接调到`/goods`页面下，原版本使用的是`go`方法

```javascript
  router.go('/goods')
```

新版本该方法已经不生效，可以直接将商品页指向根目录：

```javascript
{
  path: '/',
  component: goods
}
```

也可以改为直接在router下配置，可以使用重定向方法：

```javascript
{
  path: '/',
  redirect: '/goods'
}
```

- Vue 1.x版本在使用生命周期函数时，命名为`create/ready`方法，在2.x版本之后`create/ready`方法不可用，改为`mounted`方法。


- 原版本在使用`v-for`方法时，使用的是`$index`记录数组索引的值，新版本改为:
```javascript
v-for="(item index) in items"
```

在一个括号中记录数组的值和索引，类似于forEach方法的传参（这里数组没有第三个参数，对象才有）。

- 在使用过渡样式的transition属性时，原版本在需要变化的层中直接添加`transition="fade"`以应用过渡效果：

```vue
<template lang="pug>
  ...
  .detail(v-show="detailShow", transition="fade")	// html中直接引用transition属性
  ...
</template>
...
<style lang="less>
	.detail{
      ...
      transition: all .5s;
      &.fade-transition{
        opacity: 1;
      	background-color: rgba(7, 17, 27, .8);
      }
      &.fade-enter, &.fade-leave{
        opacity: 0;
      	background-color: rgba(7, 17, 27, 0);
      }
      ...
	}
</style>
```

但新版本在解析上面方法时不会正确解析，而是直接将transition="fade"当做HTML属性显示处理。

新版本的transition表现方式改为使用transition[标签组件](https://cn.vuejs.org/v2/guide/transitions.html) ，所以这里可以简单改写为：

```vue
<template lang="pug">
  ...
  transition(name="fade")
    .detail(v-show="detailShow")
  ...
</template>
...
<style lang="less">
  .detail{
    opacity: 1;
    transition: all .5s;
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }
  }
</style>
```

transition作为单独的组件使用，不用为fade-transition单独写样式，可以直接写在层(detail)上，过渡样式书写时，原`fade-leave`类使用`fade-leave-active`代替。

- 1.x版本的`v-el`，`v-ref`被弃用，2.x版本用`ref`代替，并不必要使用`-`符号，而是直接使用驼峰命名。
```vue
<template lang="pug">
.menu-wrapper(v-el="menu-wrapper")	// 1.x

.menu-wrapper(ref="menuWrapper")	// 2.x
</template>
...
<script>
  ...
    let mw = this.$els.menuWrapper		// 1.x
    
    let mw = this.$refs.menuWrapper		// 2.x
  ...
</script>
```

同样在父子组件传递数据命名时也可以用驼峰命名方式。

- 2.x弃用了`$broadcast`方法，使用`$emit`代替，但是向上不能广播，好像能用`$emit`方法多层传递


- 其他改动如transition动画的事件动作的改变等在视频最后有介绍
- 新的改动都可以在[官方api](https://cn.vuejs.org/v2/api/)查询





#### 使用less遇到的问题

---

- 安装less时，需要同时安装`less` 和 `less-loader`
- 由于less并没有像stylus那样加载mixin后引入文件时会以当前目录为基本目录引入，而是以原mixin文件为准，所以引入文件时会有一大串字符。

```javascript
@import "../../common/less/mixin";	// 加载mixin文件
...
.bg-image('../../components/header/special_1')	// 引入当前目录下文件需要以mixin文件为基本目录引入
```

- 另外需要提到的是，less没有像sass的@at-root方法，所以在书写样式时，这里为了不造成过多层的css，手动将样式表外移。（只是移动解析超过三层的，保证性能，不影响解析，但可能会影响阅读）
- 顺便提一下，在使用`overflow:auto;`属性时，浏览器会出现滚动条，建议全屏页面不要轻易添加。（在弹出店铺详情时，不要设置该属性）



#### 使用pug(jade)的问题

---

- 同样，安装pug时，需要同时安装`pug`和`pug-loader`
- 由于pug在解析为HTML文件后不会有空格和回车的困扰，所以没有必要去在乎4px间隔的问题，所以这里没有使用font-size对该问题进行处理。

#### 学习的知识点

---

- 阻止冒泡写法：

  `@click.stop.prevent`

- 

