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
          <div class="shop" v-for='item of shopList'>
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
            <van-cell title="店铺地址" :value="item.provinceArea+item.area+item.address" />
                  <van-cell value=""  is-link @click="checkOrderList(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看工单</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="addOrder(item.id)" >
                  <template slot="title">
                    <van-tag color="#68B6F7">添加工单</van-tag>
                  </template>
                  
                </van-cell>
        
          </div>

      </div>
     </div>
      <!-- 添加店铺 -->
      <div class="footer" @click="addStore">
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
        mobile:'18336391418',
        //店铺信息
        shopList:[],
      }
    },
    components: {
     
    },
    mounted(){
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
        this.$router.push({name:'myOrder',params:{id:id}})
    },
     addStore(){
            this.$router.push('addStore')
        },
    //添加工单
    addOrder(id){
      this.$router.push({name:'newDemand',params:{id:id}})
    }
    },
   
  }
</script>

<style scoped lang="less" type="text/less">
.page{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background:#eee;
    width: 100%;
    .topList{
        flex: 1;
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
 .footer {
  padding: 20px;
  padding-bottom: 100px;
  .van-button--large {
     margin-top:10px;
     background: #68B6F7;
     color: #fff;
     width: 60%;
     margin-left: 20%;
  }
}
}

 
</style>
<style>
.van-cell__value{
    flex: 3
}
</style>

