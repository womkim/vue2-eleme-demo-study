<template lang="pug">
  transition(name="move")
    .food(v-show="showFlag", ref="food")
      .food-content
        .image-header
          img(:src="food.image")
          .back(@click="hide")
            i.icon-arrow_lift
        .content
          .title {{ food.name }}
          .detail
            span.sell-count 月售{{ food.sellCount }}份
            span.rating 好评率{{ food.rating }}%
          .price
            span.now ￥{{ food.price }}
            span.old(v-show="food.oldPrice") ￥{{ food.oldPrice }}
          .cartcontrol-wrapper
            cartcontrol(:food="food", @addFood="passFun")   // 将子组件的方法传递，利用方法传递到上一层
          transition(name="fade")
            .buy(v-show="!food.count || food.count === 0", @click.stop.prevent="addFirst") 加入购物车
        split(v-show="food.info")
        .info(v-show="food.info")
          .title 商品信息
          p.text {{ food.info }}
        split
        .rating
          .title 商品评价
          ratingselect(:selectType="selectType", :onlyContent="onlyContent", :desc="desc", :ratings="food.ratings", @ratingSelect="_ratingSelect", @contentToggle="_contentToggle")
          .rating-wrapper
            ul(v-show="food.ratings && food.ratings.length")
              li.rating-item.border-1px(v-for="rating in food.ratings", v-show="needShow(rating.rateType, rating.text)")
                .user
                  .name {{ rating.username }}
                  img.avatar(width="12", height="12", :src="rating.avatar")
                .time {{ rating.rateTime | formatDate }}
                .text
                  span(:class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}")
                  span {{ rating.text }}
            .no-rating(v-show="!food.ratings || !food.ratings.length") 暂无评价
</template>

<script>

  import Vue from 'vue'
  import {formatDate} from '@/common/js/date'
  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import split from '@/components/split/split'
  import ratingselect from '@/components/ratingselect/ratingselect'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    props: {
      food: Object
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate (time) {
        return formatDate(time, 'yyyy-MM-dd hh:mm')   // 引用外部组件对时间进行格式化
      }
    },
    methods: {
      // 按观点类型显示评价内容
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      },
      // 显示隐藏商品详情页
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this._nextDom()
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
        this.$emit('addFood', event.target)
      },
      passFun (target) {
        this.$emit('addFood', target)
      },
      _ratingSelect (type) {
        this.selectType = type
        this._nextDom()
      },
      _contentToggle (onlyCont) {
        this.onlyContent = onlyCont
        this._nextDom()
      },
      _nextDom () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  @import "../../common/less/mixin";
  
  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;

    transition: all .2s linear;
    transform: translate3d(0, 0, 0);

    &.move-enter, &.move-leave-active{
      transform: translate3d(100%, 0, 0);
    }

    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;

      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back{
        position: absolute;
        left: 0;
        top: 10px;
        .icon-arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }

    }

    .content{
      position: relative;
      padding: 18px;

      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }

      .detail{
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;

        .sell-count, .rating{
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .sell-count{
          margin-right: 12px;
        }

      }

      .price{
        font-weight: 700;
        line-height: 24px;

        .now{
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old{
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

      }

    }

    .cartcontrol-wrapper{
      position: absolute;
      right: 12px;
      bottom: 12px;
    }

    .buy{
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background-color: rgb(0, 160, 220);

      transition: all .2s;
      opacity: 1;

      &.fade-enter, &.fade-leave-active{
        opacity: 0;
      }

    }

    .info{
      padding: 18px;

      .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .text{
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }

    }

    .rating{
      padding-top: 18px;

      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
    }

    .rating-wrapper{
      padding: 0 18px;

      .rating-item{
        position: relative;
        padding: 16px 0;
        .border-1px(rgba(7, 17, 27, .1));

        .user{
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;

          .name{
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .avatar{
            border-radius: 50%;
          }

        }

        .time{
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          
          .icon-thumb_up, .icon-thumb_down{
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
          }

          .icon-thumb_up{
            color: rgb(0, 160, 220);
          }

          .icon-thumb_down{
            color: rgb(147, 153, 159);
          }

        }

      }

      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }

    }

  }


</style>
