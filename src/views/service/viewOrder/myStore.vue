<template>
  <div class="page">
     <div class="topList">
          <!-- 没有店铺 -->
      <div class="emptyList" v-if="emptyList">
          <img src="../../../assets/mr.png" alt="" class="header-img">
          <p>您暂时还没有店铺！</p>
      </div>
      <!-- 店铺列表 -->
      <div class="storeList">
          <div class="shop" v-for='(item,index) in shopList' :key="index">
                   <div v-if="item.status==0">
                       <van-cell title="当前状态" value="审核未通过" />
                   </div>
                   <div v-if="item.status==1">
                       <van-cell title="当前状态" value="审核通过" />
                   </div>
                   <div v-if="item.status==2">
                       <van-cell title="当前状态" value="审核中" />
                   </div>
                   
            <van-cell title="店铺名称" :value="item.shopName" />
            <van-cell title="联系方式" :value="item.shopMobile"/>
            <van-cell title="店铺地址" :value="item.province+item.area+item.address" />
             <div slot="footer" class="footer" >
                <van-button size="small" @click="checkOrderList(item.id)" >查看工单</van-button>
                <van-button size="small" @click="addOrder(item.id)" class="primary-but">添加工单</van-button>
          </div>
                  <!-- <van-cell value=""  is-link @click="checkOrderList(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看工单</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="addOrder(item.id)" >
                  <template slot="title">
                    <van-tag color="#68B6F7">添加工单</van-tag>
                  </template>
                  
                </van-cell> -->
        
          </div>

      </div>
     </div>
      <!-- 添加店铺 -->
      <div class="foot" @click="addStore">
          <van-button round size="large">添加店铺</van-button>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          emptyList:true,
        storeList:'',
        mobile:'',
        //店铺信息
        shopList:[],
      }
    },
    components: {
     
    },
    mounted(){
        this.mobile = localStorage.getItem('customerId');
        this.getCustomShop();
    },
    methods:{
    getCustomShop(){
        let that = this;
        that.$axios.get('pocket/wxchatc/allCustomerShop',
       {
           params:{
               mobile:that.mobile
           }
       }
        ).then(res=>{
         console.log(res.data);
         if(res.data.data.length>0){
             that.emptyList=false;
         }
         that.shopList = res.data.data;
        }).catch(err=>{
            this.$toast(err);
         
        })
    },
    //查询工单列表
    checkOrderList(id){
        this.$router.push({path:'/myOrder',query:{id:id}})
    },
     addStore(){
          //更改状态，从这里进入不取出数据
        sessionStorage.setItem('status',0);
            this.$router.push('addStore')
        },
    //添加工单
    addOrder(id){
       
      this.$router.push({path:'/newDemand',query:{id:id}})
    }
    },
   
  }
</script>

<style scoped lang="less" type="text/less">
.page{
    position: relative;
    display: flex;
    flex-direction: column;
    // height: 100%;
    background:#eee;
    width: 100%;
    .topList{
        flex: 1;
        padding-bottom: 200px;
        .emptyList{
                margin-top: 200px;
                text-align: center;
            }
        .shop{
            margin-bottom: 20px;
            background: #fff;
        }
    }
    .storeList{
        //   background: #fff;
          margin: 20px 0;
    }
 .foot {
//   padding: 20px;
  padding-bottom: 20px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  .van-button--large {
     margin-top:10px;
     background: #68B6F7;
     color: #fff;
     width: 60%;
     margin-left: 20%;
  }
}
}
.primary-but{
   color: #68B6F7 !important;
   border:1px solid #68B6F7;
}
.footer{
  text-align: end;
  padding: 20px;

}
.van-button--small{
  border-radius: 15px;
}
 
</style>
<style>
.van-cell__value{
    flex: 3
}
</style>

