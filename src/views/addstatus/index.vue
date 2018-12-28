
<template>
  <div class="app-container">
     <div class="card">
        <div class="carlist">
          <div class="left">夏夏</div>
          <div class="right red">待审核</div>
        </div>
        <van-cell title="营业执照名称" value="阿里巴巴集团公司" />
        <van-cell title="创建时间" value="2018-12-12" />
        <van-collapse v-model="activeNames">
          <van-collapse-item title="需求业务" name="1">
            哈哈哈哈哈哈哈
          </van-collapse-item>
         
        </van-collapse>
     </div>
      <div class="card">
        <div class="carlist">
          <div class="left">夏夏</div>
          <div class="right blue">审核通过</div>
        </div>
        <van-cell title="营业执照名称" value="阿里巴巴集团公司" />
        <van-cell title="创建时间" value="2018-12-12" />
        <van-collapse v-model="activeNames">
          <van-collapse-item title="需求业务" name="1">
            哈哈哈哈哈哈哈
          </van-collapse-item>
         
        </van-collapse>
     </div>
      <div class="card">
        <div class="carlist">
          <div class="left">夏夏</div>
          <div class="right red">待审核</div>
        </div>
        <van-cell title="营业执照名称" value="阿里巴巴集团公司" />
        <van-cell title="创建时间" value="2018-12-12" />
        <van-collapse v-model="activeNames">
          <van-collapse-item title="需求业务" name="1">
            哈哈哈哈哈哈哈
          </van-collapse-item>
         
        </van-collapse>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     activeNames: ['1']
    }
  },
  components: {

  }
}
</script>

<style lang="less" type="text/less" scoped>
.app-container {
  height: 100%;
  background: #efefef;
}
.card {
  background: #fff;
  margin-bottom: 20px;
  // padding: 20px;
   .carlist {
     display: flex;
     padding: 24px;
     border-bottom: 1px solid #efefef;
     > div {
       flex:1;
     }
     .right {
       text-align: right;
     }
     .red {
       color: #f44;
     }
     .blue {
       color: blue;
     }
   }
}

</style>
