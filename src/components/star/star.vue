<template lang="pug">
  .star(:class="starType")
    span.star-item(:class="itemClass", v-for="itemClass in itemClasses", key="index")
</template>

<script>

  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    name: 'star',
    data () {
      return {

      }
    },
    props: ['size', 'score'],
    mounted () {
      // console.log('Star Component...')
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let intergere = Math.floor(score)
        for (let i = 0; i < intergere; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="less">
  @import "../../common/less/mixin";

  .star{
    
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }

    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;

        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star48_on')
        }
        &.half{
          .bg-image('../../components/star/star48_half')
        }
        &.off{
          .bg-image('../../components/star/star48_off')
        }

      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;

        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star36_on')
        }
        &.half{
          .bg-image('../../components/star/star36_half')
        }
        &.off{
          .bg-image('../../components/star/star36_off')
        }

      }      
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;

        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-image('../../components/star/star24_on')
        }
        &.half{
          .bg-image('../../components/star/star24_half')
        }
        &.off{
          .bg-image('../../components/star/star24_off')
        }

      }
    }

  }
</style>
