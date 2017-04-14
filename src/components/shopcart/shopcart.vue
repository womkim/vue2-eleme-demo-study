<template lang="pug">
  .shopcart
    .content
      .content-left(@click="toggleList")
        .logo-wrapper
          .logo(:class="{'highlight': totalCount > 0}")
            i.icon-shopping_cart(:class="{'highlight': totalCount > 0}")
          .num(v-show="totalCount > 0") {{ totalCount }}
        .price(:class="{'highlight': totalPrice > 0}") ￥{{ totalPrice }}
        .desc 另需配送费￥{{ deliveryPrice }}元
      .content-right(@click="pay")
        .pay(:class="payClass") {{ payDesc }}
    .ball-container
      div(v-for="(ball, index) in balls")
        transition(name="drop", @before-enter="beforeDrop", @enter="dropping", @after-enter="afterDrop", key="index")
          .ball(v-show="ball.show")
            .inner.inner-hook
    transition(name="fold")
      .shopcart-list(v-show="listShow")
        .list-header
          .title 购物车
          .empty(@click="empty") 清空
        .list-content(ref="listContent")
          ul
            li.food(v-for="food in selectFoods")
              span.name {{ food.name }}
              .price
                span ￥{{ food.price * food.count }}
              .cartcontrol-wrapper
                cartcontrol(:food="food", @addFood="drop")
    transition(name="fade")
      .list-mask(v-show="listShow", @click="hideList")
</template>

<script>

  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'

  export default {
    data () {
      return {
        balls: [
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false }
        ],
        dropBall: [],
        fold: true
      }
    },
    props: {
      deliveryPrice: Number,
      minPrice: Number,
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
        // this.empty()
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            el.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight  // 重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)'
          el.style.transform = 'translate3d(0, 0, 0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0, 0, 0)'
          inner.style.transform = 'translate3d(0, 0, 0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style lang="less">

  @import "../../common/less/mixin";
  
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background-color: #000;

    .content{
      display: flex;
      background-color: #141d27;
      color: rgba(255, 255, 255, .4);
    }

  }

  .content-left{
    flex: 1;

    .logo-wrapper{
      display: inline-block;
      position: relative;
      top: -10px;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: #141d27;

      .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #2b343c;
        text-align: center;
        &.highlight{
          background-color: rgb(0, 160, 220);
        }
      }

      .icon-shopping_cart{
        line-height: 44px;
        font-size: 24px;
        color: #80858a;
        &.highlight{
          color: #fff;
        }
      }

      .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 18px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background-color: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
      }

    }

    .price{
      display: inline-block;
      vertical-align: top;
      margin-top: 12px;
      padding-right: 12px;
      line-height: 24px;
      box-sizing: border-box;
      border-right: 1px solid rgba(255, 255, 255, .1);
      font-size: 16px;
      font-weight: 700;
      &.highlight{
        color: #fff;
      }
    }

    .desc{
      display: inline-block;
      vertical-align: top;
      line-height: 24px;
      margin: 12px 0 0 12px;
      font-size: 14px;
    }

  }

  .content-right{
    flex: 0 0 105px;
    width: 105px;

    .pay{
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      &.not-enough{
        background-color: #2b333b;
      }
      &.enough{
        background-color: #00b43c;
        color: #fff;
      }
    }

  }

  // 购物添加商品时，弹出的小球
  .ball-container{

    .ball{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all .4s cubic-bezier(.49, -0.29, .75, .41);

      .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all .4s linear;
      }
    }

  }

  // 购物车列表
  .shopcart-list{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;

    transition: all .5s;
    transform: translate3d(0, -100%, 0);

    &.fold-enter, &.fold-leave-active{
      transform: translate3d(0, 0, 0);
    }

    .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, .1);

      .title{
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty{
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }

    }

    .list-content{
      padding: 0 18px;
      max-height: 217px;
      background-color: #fff;
      overflow: hidden;

      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .border-1px(rgba(7, 17, 27, .1));

        .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price{
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom: 6px;
        }

      }

    }

  }

  .list-mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: rgba(7, 17, 27, .6);
    transition: all .5s;
    opacity: 1;

    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }


  }


</style>
