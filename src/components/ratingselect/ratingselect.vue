<template lang="pug">
  .ratingselect
    .rating-type.border-1px
      span.block.positive(:class="{'active': selectTp === 2}", @click="select(2, $event)") {{ desc.all }}
        span.count {{ ratings.length }}
      span.block.positive(:class="{'active': selectTp === 0}", @click="select(0, $event)") {{ desc.positive }}
        span.count {{ positives.length }}
      span.block.negative(:class="{'active': selectTp === 1}", @click="select(1, $event)") {{ desc.negative }}
        span.count {{ negatives.length }}
    .switch(:class="{'on': onlyContent}", @click="toggleContent")
      span.icon-check_circle
      span 只看有内容的评价
</template>

<script>

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    data () {
      return {
        onlyCont: this.onlyContent,
        selectTp: this.selectType
      }
    },
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
      // 父子组件不会双向绑定，子组件不能直接修改父组件的值，需要借助数据利用方法传递到父组件
      // onlyCont () {
      //   return this.onlyContent
      // },
      // selectTp () {
      //   return this.selectType
      // }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        if (this.selectTp === type) {
          return
        }
        this.selectTp = type
        this.$emit('ratingSelect', type)    // 同步到父组件
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.onlyCont = !this.onlyContent   // 结合父组件参数
        this.$emit('contentToggle', this.onlyCont)    // 同步到父组件
      }
    }
  }
</script>

<style lang="less">

  @import "../../common/less/mixin";

  .ratingselect{

    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(rgba(7, 17, 27, .1));

      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        line-height: 16px;
        font-size: 12px;
        &.active{
          color: #fff;
        }

        .count{
          display: inline-block;
          vertical-align: text-top;
          margin-left: 2px;
          font-size: 8px;
        }

      }

      .positive{
        background-color: rgba(0, 160, 220, .2);
        &.active{
          background-color: rgb(0, 160, 220);
        }
      }
      .negative{
        background-color: rgba(77, 84, 93, .2);
        &.active{
          background-color: rgb(77, 84, 93);
        }
      }

    }

    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);

      &.on{
        .icon-check_circle{
          color: #00c850;
        }
      }

      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }

      .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }

  }
</style>
