<template>
  <div class="app-container">
   <div class="checkMyOrder">
      <div class="myPackge">
      <div class="my-packge-top">
        <p style="line-height:20px;">
           <van-icon name="logistics" size="20px" />&nbsp;我的快递</p>
       
      </div>
        <div class="order-info">
           <p>
            <label>快递名称：</label>
            <span>韵达快递</span>
         </p>
         <p>
            <label>快递单号：</label>
            <span>324667889900087</span>
         </p>
        </div>
    </div>
    <div class="express-info" >
       <van-steps direction="vertical" :active="0" active-color="#f44">
          <van-step  v-for="item in data" :key="item.id">
            <h3>{{item.city}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data:[
      {
        city:"杭州转运中心已收件",
        time:'2012-12-24'

      },{
         city:"快递已到中转站",
        time:'2012-12-23'
      },
      {
         city:"北京转运中心已收入",
        time:'2012-12-23'
      },
      {
         city:"商家已发货",
        time:'2012-12-22'
      },
       {
         city:"你的包裹等待揽收",
        time:'2012-12-22'
      },
      {
         city:"商家已接单",
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
.my-packge-top{
  background: #fff;
}
.app-container{
 
  height: 100%;
  background: #fafafa;
}
.order-info{
  width: 90%;
  padding: 10px;
  line-height: 28px;
  background: #fff;
   border: 1px solid #eeeeee;
   padding: 20px;
   border-radius: 30px;
   background:#Feee90;
   position: relative;
   top: -20px;
   margin: auto;

}
.my-packge-top{

  border-bottom: 1px solid #eeeeee;
  padding: 10px;
  /* border-radius: 10px; */
}
.express-info{
  border: 1px solid #Feee90;
  border-radius: 10px;
  width: 95%;
  margin: auto;
}
 
</style>
