<template lang="pug">

  #app
    v-header(:seller="seller")
    .tab.border-1px
      .tab-item
        router-link(to="/goods") 商品
      .tab-item
        router-link(to="/ratings") 评论
      .tab-item
        router-link(to="/seller") 商家
    keep-alive    // 用于保留组件状态，避免重新渲染(改为单独标签形式)
      router-view(:seller="seller")

</template>

<script>

  import header from '@/components/header/header'
  import {urlParse} from '@/common/js/util'

  const ERR_OK = 0

  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    mounted () {
      this.getSellerData()
    },
    methods: {
      getSellerData () {
        this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
          let response = res.body
          if (response.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, response.data)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./common/less/mixin";

  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    .border-1px(rgba(7, 17, 27, .1));

    .tab-item{
      flex: 1;
      text-align: center;

      & > a{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active{
          color: rgb(240, 20, 20);
        }

      }

    }

  }
</style>
