<template>
  <div class="app-container">
 <van-tabs v-model="active">
  <van-tab title="全部">内容 1</van-tab>
  <van-tab title="已下单">内容 2</van-tab>
  <van-tab title="处理中">内容 3</van-tab>
  <van-tab title="待评价">内容 4</van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我的订单"
    }
  },
  components: {

  }
}
</script>

<style scoped>

 
</style>
