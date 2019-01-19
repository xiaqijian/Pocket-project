<template>
  <div class="app-container">
    <div class="express-info" >
      <div class="detail-top">
         <img src="../../../assets/tx.png" alt="" class="header-img"> 
         <span>小明</span>
      </div>
       <div class="order-detail">订单详情</div>
       <van-steps direction="vertical" :active="0" active-color="#68B6F7">
          <van-step  v-for="item in data" :key="item.id">
            <h3>{{item.city}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
    </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      data:[
      {
         city:"订单提交",
        time:'2012-12-23'
      },
      {
         city:"接单 业务员：西松 电3话：1243245",
        time:'2012-12-23'
      },
      {
         city:"已完成",
        time:'2012-12-22'
      },
       {
         city:"已确认",
        time:'2012-12-22'
      },
      {
         city:"已评价",
        time:'2012-12-20'
      }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped>

.detail-top{
  height: 200px;
  background: #68B6F7;
  display: flex;
  align-items:center;
  color: #fff;
}
.app-container{
  height: 100%;
  background: #fafafa;
}
.header-img{
  width: 120px;
  margin: 0 20px;
}
.order-detail{
  height: 88px;
  line-height: 88px;
  background: #fff;
  padding-left: 20px;
  margin-bottom: 30px;
}

 
</style>
<style>
.van-step--vertical{
  padding:0;
}
</style>

