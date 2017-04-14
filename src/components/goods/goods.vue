<template lang="pug">
  .goods
    .menu-wrapper(ref="menuWrapper")
      ul
        li.menu-item(v-for="(item, index) in goods", :class="{'current': currentIndex === index}", @click="selectMenu(index, $event)")
          span.text.border-1px
            span.icon(v-show="item.type > 0", :class="classMap[item.type]")
            span {{ item.name }}
    .foods-wrapper(ref="foodsWrapper")
      ul
        li.foods-list.food-list-hook(v-for="item in goods")
          h1.title {{ item.name }}
          ul
            li.food-item.border-1px(v-for="food in item.foods", @click="selectFood(food, $event)")
              .icon
                img(:src="food.icon", width="57", height="57")
              .content
                h2.name {{ food.name }}
                p.desc {{ food.description }}
                .extra
                  span.count 月售{{ food.sellCount }}份
                  span 好评率{{ food.rating }}%
                .price
                  span.now ￥{{ food.price }}
                  span.old(v-show="food.oldPrice") ￥{{ food.oldPrice }}
                .cartcontrol-wrapper
                  cartcontrol(:food="food", @addFood="_drop")
    shopcart(:deliveryPrice="seller.deliveryPrice", :minPrice="seller.minPrice", :selectFoods="selectFoods", ref="shopcart")
    food(:food="selectedFood", ref="food", @addFood="_drop")

</template>

<script>

  import classMap from '@/components/classMap'
  import BScroll from 'better-scroll'     // https://github.com/ustbhuangyi/better-scroll
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import food from '@/components/food/food'

  const ERR_OK = 0

  export default {
    data () {
      return {
        goods: [],
        classMap: classMap,
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    props: ['seller'],
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get('/api/goods').then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
            this.goods = response.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
      },
      getFoodList () {
        return this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      },
      // 滚动效果
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true     // 开启点击（与原生点击事件不是同一个）
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,    // 监测滚动高度值
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 计算右侧商品分类高度
      _calculateHeight () {
        let foodList = this.getFoodList()
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 选择左侧菜单时的效果
      selectMenu (index, event) {
        if (!event._constructed) {  // 使原生点击事件不生效
          return
        }
        let foodList = this.getFoodList()
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _drop (target) {
        // 异步执行下落动画，性能效果优化
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      selectFood (food, event) {
        if (!event._constructed) {  // 使原生点击事件不生效
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    }
  }
</script>

<style lang="less" scoped>

  @import "../../common/less/mixin";
  
  .goods{
    position: absolute;
    top: 177px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;

    // 左侧菜单内容
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
    }

    // 在menu-wrapper中。具体每一项
    .menu-item{
      display: table;
      padding: 0 12px;
      width: 54px;
      height: 56px;
      line-height: 14px;

      &.current{
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background-color: #fff;
        font-weight: 700;
        .text{
          .border-none();
        }
      }

      .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        .border-1px(rgba(7, 17, 27, .1));
      }

      //.icon-mixin(
      //  '../../components/goods/decrease_3',
      //  '../../components/goods/discount_3',
      //  '../../components/goods/guarantee_3',
      //  '../../components/goods/invoice_3',
      //  '../../components/goods/special_3'
      //);

      .icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease{
          .bg-image('../../components/goods/decrease_3')
        }
        &.discount{
          .bg-image('../../components/goods/discount_3')
        }
        &.guarantee{
          .bg-image('../../components/goods/guarantee_3')
        }
        &.invoice{
          .bg-image('../../components/goods/invoice_3')
        }
        &.special{
          .bg-image('../../components/goods/special_3')
        }
      }

    }

    // 右侧商品内容
    .foods-wrapper{
      flex: 1;

      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }

      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, .1));

        &:last-child{
          .border-none();
          margin-bottom: 0;
        }

        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }

        .content{
          flex: 1;

          .name{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .desc, .extra{
            font-size: 10px;
            color: rgb(147, 152, 159);
          }

          .desc{
            line-height: 12px;
            margin-bottom: 8px;
          }

          .extra{
            line-height: 10px;
            .count{
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

          .cartcontrol{
            position: absolute;
            right: 0;
            bottom: 12px;
          }

        }

      }

    }

  }

</style>
