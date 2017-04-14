<template lang="pug">
  .seller(ref="seller")
    .seller-content
      .overview
        h1.title {{ seller.name }}
        .desc.border-1px
          star(:size="36", :score="seller.score")
          span.text ({{ seller.ratingCount}})
          span.text 月售{{ seller.sellCount}}单
        ul.remark
          li.block
            h2 起送价
            .content
              span.stress {{ seller.minPrice }}
              span 元
          li.block
            h2 商家配送
            .content
              span.stress {{ seller.deliveryPrice }}
              span 元
          li.block
            h2 平均配送时间
            .content
              span.stress {{ seller.deliveryTime }}
              span 元
        .favorite(@click="toggleFavorite")
          span.icon-favorite(:class="{'active': favorite}")
          span.text {{ favoriteText }}
      split
      .bulletin
        .title 公告与活动
        .content-wrapper.border-1px
          p.content {{ seller.bulletin }}
        ul.supports(v-if="seller.supports")
          li.support-item.border-1px(v-for="(item, index) in seller.supports")
            span.icon(:class="classMap[seller.supports[index].type]")
            span.text {{ seller.supports[index].description }}
      split
      .pics
        h1.title 商家实景
        .pic-wrapper(ref="picWrapper")
          ul.pic-list(ref="picList")
            li.pic-item(v-for="pic in seller.pics")
              img(:src="pic", width="120", height="90")
      split
      .info
        h1.title.border-1px 商家信息
        ul
          li.info-item.border-1px(v-for="info in seller.infos") {{ info }}

</template>

<script>

  import classMap from '@/components/classMap'
  import BScroll from 'better-scroll'
  import star from '@/components/star/star'
  import split from '@/components/split/split'
  import { saveToLocal, loadToLocal } from '@/common/js/store'

  export default {
    data () {
      return {
        classMap: classMap,
        favorite: (() => {
          return loadToLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    mounted () {
      this._nextDom('seller')
      this._initPics()
    },
    watch: {
      'seller': function () {
        this._nextDom('seller')
        this._initPics()
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      _nextDom (el) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs[el], {
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

<style lang="less">

  @import "../../common/less/mixin";
  
  .seller{
    position: absolute;
    top: 177px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;

    .overview{
      position: relative;
      padding: 18px;

      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }

      .desc{
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, .1));

        .star{
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }

        .text{
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          font-size: 10px;
          vertical-align: top;
          color: rgb(77, 85, 93);
        }

      }

      .remark{
        display: flex;
        padding-top: 18px;

        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, .1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom: 4px;
            line-height: 14px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content{
            line-height: 24px;
            color: rgb(7, 17, 27);
            font-size: 10px;
            .stress{
              font-size: 24px;
            }
          }
        }
      }

      .favorite{
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;

        .icon-favorite{
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active{
            color: rgb(240, 20, 20);
          }
        }

        .text{
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }

      }

    }

    .bulletin{
      padding: 18px 18px 0;

      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }

      .content-wrapper{
        padding: 0 12px 16px;
        .border-1px(rgba(7, 17, 27, .1));

        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }

      }

      .supports{
        .support-item{
          padding: 16px 12px;
          .border-1px(rgba(7, 17, 27, .1));
          &:last-child{
            .border-none();
          }
        }

        .icon{
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease{
            .bg-image('../../components/seller/decrease_4')
          }
          &.discount{
            .bg-image('../../components/seller/discount_4')
          }
          &.guarantee{
            .bg-image('../../components/seller/guarantee_4')
          }
          &.invoice{
            .bg-image('../../components/seller/invoice_4')
          }
          &.special{
            .bg-image('../../components/seller/special_4')
          }
        }

        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

      }

    }

    .pics{
      padding: 18px;

      .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }

      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .pic-list{
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
              margin: 0
            }
          }
        }
      }

    }

    .info{
      padding: 18px 18px 0;
      color: rgb(7, 17, 27);

      .title{
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        .border-1px(rgba(7, 17, 27, .1));
      }

      .info-item{
        padding: 16px 12px;
        .border-1px(rgba(7, 17, 27, .1));
        line-height: 16px;
        font-size: 12px;
        &:last-child{
          .border-none();
        }
      }

    }

  }

</style>
