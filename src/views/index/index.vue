<template>
  <div class="app-container">
      <van-cell-group>
        <van-cell title="工单编号" value="23784783748" />
        <van-cell title="客户姓名" value="张四" />
        <van-cell title="客户地址" value="杭州东站东关村121212号  ">
           <van-icon slot="right-icon" name="location" class="custom-icon" />
        </van-cell>
        <van-cell title="工单业务" value="信用卡办卡" />
        <van-cell title="工单类型" is-link value="信用卡" />
        <van-cell title="创建时间" value="2018-12-12" />
        <van-cell title="服务时间" value="2019-12-12" />
        
      </van-cell-group>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="佣金说明" name="1">
          
          服务分0-20    佣金0<br>
          服务分21-30  佣金20<br>
          服务分31-40  佣金40<br>
          服务分41-50  佣金50<br>
        </van-collapse-item>
      </van-collapse>
      <div class="btn">
        <van-button type="primary" size="large">电话联系</van-button>
        <van-button type="warning" size="large">工单竣工</van-button>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
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
.btn {
  .van-button--large {
     margin-top:30px;
  }
}
 
</style>
