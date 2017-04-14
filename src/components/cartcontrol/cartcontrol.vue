<template lang="pug">
  .cartcontrol
    transition(name="move")
      .cart-decrease(v-show="food.count > 0", @click.stop.prevent="decreaseCart")
        span.inner.icon-remove_circle_outline
    .cart-count(v-show="food.count > 0") {{ food.count }}
    .cart-add.icon-add_circle(@click.stop.prevent="addCart")
</template>

<script>

  import Vue from 'vue'

  export default {
    props: {
      food: Object
    },
    mounted () {
      this.getFoodsData()
    },
    methods: {
      getFoodsData () {
        // console.log(this.food)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('addFood', event.target)
      }
    }
  }
</script>

<style lang="less">
  .cartcontrol{

    .cart-decrease{
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all .4s linear;
      max-height: 24px;

      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all .4s linear;
        transform: rotate(0);
      }

      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }

    }

    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }


    .cart-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }

  }
</style>
