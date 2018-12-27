<template>
  <div class="app-container">
 <van-tabs v-model="active">
  <van-tab title="全部">
    <div class="myOrder">
      <van-card
        num="2"
        tag="标签"
        price="2.00"
        desc="描述信息"  
        title="商品标题"
        origin-price="10.00"
>
<span>已下单</span>
  <div slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </div>
</van-card>
    </div>
  </van-tab>
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
.myOrder{
  background: #Feee90;
  border-radius: 30px;
  width: 90%;
  margin: auto;
   margin-top: 20px; 
}
 
</style>
