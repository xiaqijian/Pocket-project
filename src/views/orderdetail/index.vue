
<template>
  <div class="app-container">
      <van-cell-group>
        <van-cell title="工单类型" :value="datadetail.busDesc" />
        <!-- <van-cell title="工单业务" :value="datadetail.busDesc" /> -->
        <van-cell title="工单地址" :value="datadetail.address">
           <van-icon slot="right-icon" name="location" class="custom-icon" />
        </van-cell>
        <van-cell title="发布时间" :value="datadetail.addTime" />
        <van-cell title="服务时间" :value="datadetail.modifierTime" />
        <van-cell title="服务状态" :value="datadetail.statudDesc" />
         <van-cell title="问题描述" label="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
          哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈" />
      </van-cell-group>
       <van-collapse v-model="activeNames">
        <van-collapse-item title="佣金说明" name="1">
           <span v-for="item in datadetail.commissions" :key="item.id"> {{item.commissionName}} 一共{{item.score}}分 --- 每分 {{item.money}}元<br></span>
        </van-collapse-item>
      </van-collapse>
      <div class="btn" v-show="datadetail.status === 1">
        <van-button type="warning" size="large" @click="orderclick">抢工单</van-button>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
       activeNames: ['1'],
       datadetail: {},
       uid: 3,
       workOrderId: 0
    }
  },
  mounted() {
    this.workOrderId = this.$route.query.id
    console.log(this.$route.query.id)
    this.getdata(this.workOrderId)
  },
  methods: {
    updateWorkOrder () {
       let that = this;
        this.$axios.get('pocket/wxchat/updateWorkOrder', { params: { 'workOrderId': that.workOrderId , 'uid': that.uid}})
          .then((res) => {
            console.log(res.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    tipMesg (data) {
       let that = this
       if(data.code === 0 ) {
          this.$notify({
            message: data.data,
            duration: 1000,
            background: '#1989fa'
          });
           that.getdata(this.workOrderId)
       }else {
          this.$notify({
            message: data.data,
            duration: 1000,
            background: 'red'
          });
       }
    },
    orderclick () {
      this.updateWorkOrder()
      
    },
    getdata (id) {
      let that = this;
        this.$axios.get('pocket/wxchat/workOrderDetail', { params: { 'workOrderId': id }})
          .then((res) => {
            console.log(res.data.data)
            that.datadetail = res.data.data
          })
          .catch((err) => {
            console.log(err)
          })
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
  padding: 20px;
  padding-bottom: 100px;
  .van-button--large {
     margin-top:30px;
  }
}
 
</style>
