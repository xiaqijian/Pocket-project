<template>
  <div class="app-container">
      <van-cell-group>
        <van-cell title="工单编号" :value="datadetail.workOrderCode" />
        <van-cell title="客户姓名" :value="datadetail.customerName" />
        <van-cell title="客户电话" :value="datadetail.customerMobile" />
        <van-cell title="客户地址" :value="datadetail.province + datadetail.area + datadetail.address">
           <!-- <van-icon slot="right-icon" name="location" class="custom-icon" /> -->
        </van-cell>
        <van-cell title="工单业务" :value="datadetail.businessName" />
        <van-cell title="工单类型" :value="datadetail.busDesc" />
        <van-cell title="服务状态" :value="datadetail.statudDesc" />
        <van-cell title="创建时间" :value="datadetail.addTime" />
        <van-cell title="服务时间" :value="datadetail.modifierTime" />
        
      </van-cell-group>
    <van-collapse v-model="activeNames1">
      <van-collapse-item title="备注" name="1">
         {{datadetail.remark}}
      </van-collapse-item>
    </van-collapse>

      <!-- <van-collapse v-model="activeNames">
        <van-collapse-item title="佣金说明" name="1">
          <span v-for="item in datadetail.commissions" :key="item.id"> {{item.commissionName}} 一共{{item.score}}分 --- 每分 {{item.money}}元<br></span>
        </van-collapse-item>
      </van-collapse> -->
      <div class="btn">
        <van-button round size="large" @click.stop.prevent="callclick">电话联系</van-button>    
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
       activeNames: ['1'],
       activeNames1: ['1'],
       workOrderId:'',
       datadetail: {},
       message: '',
       status: false
    }
  },
  mounted() {
    this.workOrderId = this.$route.query.id
    this.getdata(this.workOrderId)
  },
  methods: {
   getdata (id) {
     let that = this;
    this.$axios.get('pocket/wxchatc/workOrderDetail', { params: { 'workOrderId': id }})
      .then((res) => {
        console.log(res.data.data)
        that.datadetail = res.data.data
         
         if( that.datadetail.status == 1 ) {
               that.status = true
         } else if (that.datadetail.status == 2) {
           that.status = true
         } else {
           that.status = false
         }
         console.log(that.status)
      })
      .catch((err) => {
        console.log(err)
      })
   },
   callclick () {
     let that = this
      this.$dialog.confirm({
          title: '提示',
          message: '你即将通过电话联系客户，是否确认'
        }).then(() => {
          // on confirm
           window.location.href = "tel:" + that.datadetail.customerMobile;
        }).catch(() => {
          // on cancel
        });
   },
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
     background: #68B6F7;
     color: #fff;
     width: 60%;
     margin-left: 20%;
  }
}

</style>
<style>
.van-collapse-item .van-cell {
     background: #ffffff !important;
}
</style>



