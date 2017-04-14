<template lang="pug">
  .ratings(ref="ratings")
    .ratings-content
      .overview
        .overview-left
          h1.score {{ seller.score }}
          .title 综合评分{{  }}
          .rank 高于周边商家{{ seller.rankRate }}%
        .overview-right
          .score-wrapper
            span.title 服务态度
            star(:size="36", :score="seller.serviceScore")
            span.score {{ seller.serviceScore }}
          .score-wrapper
            span.title 商品评分
            star(:size="36", :score="seller.serviceScore")
            span.score {{ seller.foodScore }}
          .delivery-wrapper
            span.title 送达时间
            span.delivery {{ seller.deliveryTime }}分钟
      split
      ratingselect(:selectType="selectType", :onlyContent="onlyContent", :ratings="ratings", @ratingSelect="_ratingSelect", @contentToggle="_contentToggle")
      .rating-wrapper
        ul
          li.rating-item.border-1px(v-for="rating in ratings", v-show="needShow(rating.rateType, rating.text)")
            .avatar
              img(:src="rating.avatar", width="28", height="28")
            .content
              .name {{ rating.username }}
              .star-wrapper
                star(:size="24", :score="rating.score")
                span.delivery(v-show="rating.deliveryTime") {{ rating.deliveryTime }}
              p.text {{ rating.text }}
              .recommend(v-show="rating.recommend && rating.recommend.length")
                span.icon-thumb_up
                span.item(v-for="item in rating.recommend") {{ item }}
              .time {{ rating.rateTime | formatDate }}
</template>

<script>

  import BScroll from 'better-scroll'
  import {formatDate} from '@/common/js/date'
  import star from '@/components/star/star'
  import split from '@/components/split/split'
  import ratingselect from '@/components/ratingselect/ratingselect'

  const ALL = 2
  const ERR_OK = 0

  export default {
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    mounted () {
      this.getData()
    },
    components: {
      star,
      split,
      ratingselect
    },
    filters: {
      formatDate (time) {
        return formatDate(time, 'yyyy-MM-dd hh:mm')   // 引用外部组件对时间进行格式化
      }
    },
    methods: {
      getData () {
        this.$http.get('/api/ratings').then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.ratings = response.data
            this._nextDom()
          }
        })
      },
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
            this.scroll = new BScroll(this.$refs.ratings, {
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

  .ratings{
    position: absolute;
    top: 177px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;

    .overview{
      display: flex;
      padding: 18px 0;

      .overview-left{
        flex: 0 0 137px;
        width: 137px;
        padding: 6px 0;
        border-right: 1px solid rgba(7, 17, 27, .1);
        text-align: center;

        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }

        .score{
          line-height: 28px;
          margin-bottom: 6px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }

        .title{
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .rank{
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

      }

      .overview-right{
        flex: 1;
        padding: 6px 0 6px 24px;

        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }

        .score-wrapper{
          margin-bottom: 8px;

          .title{
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .star{
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }

          .score{
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }

        }

        .delivery-wrapper{
          .title{
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery{
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }

      }

    }

    .rating-wrapper{
      padding: 0 18px;

      .rating-item{
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, .1));

        .avatar{
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img{
            border-radius: 50%;
          }
        }

        .content{
          position: relative;
          flex: 1;

          .name{
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }

          .star-wrapper{
            margin-bottom: 6px;
            .star{
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }

          .text{
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }

          .recommend{
            line-height: 16px;

            .icon-thumb_up, .item{
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .item{
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, .1);
              color: rgb(147, 153, 159);
              background-color: #fff;
            }

          }

          .time{
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

        }

      }

    }

  }

</style>
