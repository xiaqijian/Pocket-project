<template>
  <div class="page">
     <div class="topList">
          <!-- 没有店铺 -->
      <div class="emptyList">
          <img src="../../../assets/mr.png" alt="" class="header-img">
          <p>您暂时还没有店铺！</p>
      </div>
      <!-- 店铺列表 -->
      <div class="storeList"></div>
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
        storeList:''
      }
    },
    components: {
     
    },
    methods:{
        addStore(){
            this.$router.push('/addStore')
        }
    }
  }
</script>

<style scoped lang="less" type="text/less">
.page{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    .topList{
        flex: 1;
        .emptyList{
                margin-top: 200px;
                text-align: center;
            }
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
