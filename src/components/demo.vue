<template>
  <div class="demo">
    
  </div>
</template>

<script>

var demo = function (param) {
  param = param || {}
  let p = {
    x: 1,
    y: 2,
    add: () => {
      return this.x + this.y
    }
  }

  this.name = 'demo'

}

demo.prototype.data = function () {
  return {
    msg: 'message'
  }
}

  export default {
    name: 'demo',
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>
  
</style>