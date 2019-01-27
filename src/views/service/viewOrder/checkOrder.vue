<template>
  <div class="app-container">
    <div class="express-info" >
      <div class="detail-top">
         <img src="../../../assets/tx.png" alt="" class="header-img"> 
         <span>订单详情</span>
      </div>
       <!-- <div class="order-detail">订单详情</div> -->
       <van-steps direction="vertical" :active="0" active-color="#68B6F7">
          <van-step  v-for="item in data" :key="item.id">
            <h3>{{item.statusDesc}}</h3>
            <p> 操作员：{{item.userName}}</p>
            <p>{{item.addTime}}</p>
          </van-step>
        </van-steps>
    </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      //查询id
      id:'',
      data:''
    }
  },
  mounted(){
  this.id = this.$route.params.id
  //获取订单跟踪数据
  this.getOrderTrack();
  },
  methods:{
    getOrderTrack(){
      this.$axios.get('pocket/wxchat/workOrderTrack',
      {params:{
        workOrderId:this.id
      }}).
      then(res=>{
    console.log(res)
    this.data = res.data.data;
      }).
      catch(err=>{
    this.$toast(err);
      })
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

