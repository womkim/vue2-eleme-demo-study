<template lang="pug">
  .header

    // 内容
    .content-wrapper
      .avatar
        img(:src="seller.avatar", width="64", height="64")
      .content
        .title
          span.brand
          span.name {{ seller.name }}
        .description {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        .support(v-if="seller.supports")
          span.icon(:class="classMap[seller.supports[0].type]")
          span.text {{ seller.supports[0].description }}
      .support-count(v-if="seller.supports", @click="showDetail")
        span.count {{ seller.supports.length }}个
        i.icon-keyboard_arrow_right

    // 简介
    .bulletin-wrapper(@click="showDetail")
      span.bulletin-title
      span.bulletin-text {{ seller.bulletin }}
      i.icon-keyboard_arrow_right
    
    // 背景
    .background
      img(:src="seller.avatar" width="100%" height="100%")

    // 弹出详情
    transition(name="fade")
      .detail(v-show="detailShow")
        .detail-wrapper.clearfix
          .detail-main
            h1.name {{ seller.name }}
            .star-wrapper
              star(:size="48", :score="seller.score")
            .title
              .line
              .text 优惠信息
              .line
            ul.supports(v-if="seller.supports")
              li.support-item(v-for="(item, index) in seller.supports")
                span.icon(:class="classMap[seller.supports[index].type]")
                span.text {{ seller.supports[index].description}}
            .title
              .line
              .text 商家公告
              .line
            .bulletin
              p.content {{ seller.bulletin }}
        .detail-close(@click="hideDetail")
          i.icon-close

</template>

<script>

  import star from '@/components/star/star'
  import classMap from '@/components/classMap'

  export default {
    data () {
      return {
        classMap: classMap,
        detailShow: false
      }
    },
    props: [ 'seller' ],
    mounted () {

    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    components: {
      star
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  // 整体样式
  .header{
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);
  }

  // 头部内容的背景设置
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  
  // 头部内容，包括图片和介绍
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;

    // 图片
    .avatar{
      display: inline-block;
      vertical-align: top;

      img{
        border-radius: 2px;
      }

    }

    // 文字介绍
    .content{
      display: inline-block;
      margin-left: 16px;
    }

    // 商家名
    .title{
      margin: 2px 0 8px;

      .brand{
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 18px;
        .bg-image('../../components/header/brand');
        background-size: 30px 18px;
        background-repeat: no-repeat;
      }

      .name{
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
      }

    }

    // 配送描述
    .description{
      margin-bottom: 10px;
      line-height: 12px;
      font-size: 12px;
    }

    // 支付支持方式
    .support{

      .icon{
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease{
          .bg-image('../../components/header/decrease_1')
        }
        &.discount{
          .bg-image('../../components/header/discount_1')
        }
        &.guarantee{
          .bg-image('../../components/header/guarantee_1')
        }
        &.invoice{
          .bg-image('../../components/header/invoice_1')
        }
        &.special{
          .bg-image('../../components/header/special_1')
        }
      }

      .text{
        line-height: 12px;
        font-size: 10px;
      }

    }

    // 右边显示个数
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      height: 24px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, .2);

      .count{
        font-size: 10px;
      }

      .icon-keyboard_arrow_right{
        margin-left: 2px;
        font-size: 10px;
      }

    }

  }

  // 公告内容
  .bulletin-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, .2);

    .bulletin-title{
      display: inline-block;
      margin-top: 7px;
      vertical-align: top;
      width: 22px;
      height: 12px;
      .bg-image('../../components/header/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text{
      margin: 0 4px;
      vertical-align: top;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right{
      position: absolute;
      right: 12px;
      top: 8px;
      font-size: 10px;
    }

  }

  // 点击详情显示
  .detail{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, .8);
    backdrop: blur(10px);   // 只在ios手机上适用，背景模糊10像素
    opacity: 1;
    transition: all .5s;

    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }
    
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
    }

    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
      font-size: 32px;
    }

  }

  // 在detail-wrapper里面
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;

    // 店铺名
    .name{
      line-height: 16px;
      font-size: 16px;
      text-align: center;
      font-weight: 700;
    }

    // 评星
    .star-wrapper{
      margin-top: 18px;
      padding: 2px 0;
      text-align: center;
    }

    // 标题，优惠信息和商家公告一样
    .title{
      display: flex;
      width: 80%;
      margin: 28px auto 24px;

      .line{
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
      }
      .text{
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
      }

    }

    // 商家公告的内容
    .bulletin{
      width: 80%;
      margin: 0 auto;

      .content{
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
      }

    }

  }

  // 在detail-main里面，显示获得优惠支持的列表
  .supports{
    width: 80%;
    margin: 0 auto;

    .support-item{
      padding: 0 12px;
      margin-bottom: 12px;

      &:last-child{
        margin-bottom: 0
      }

      .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        &.decrease{
          .bg-image('../../components/header/decrease_2')
        }
        &.discount{
          .bg-image('../../components/header/discount_2')
        }
        &.guarantee{
          .bg-image('../../components/header/guarantee_2')
        }
        &.invoice{
          .bg-image('../../components/header/invoice_2')
        }
        &.special{
          .bg-image('../../components/header/special_2')
        }
      }

      .text{
        line-height: 16px;
        font-size: 12px;
      }
    }

  }

</style>
