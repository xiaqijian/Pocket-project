<template>
  <div class="app-container">
      <van-cell-group>
        <van-cell title="工单编号" :value="datadetail.workOrderCode" />
        <van-cell title="客户姓名" :value="datadetail.customerName" />
        <van-cell title="客户电话" :value="datadetail.customerMobile" />
        <van-cell title="客户地址" :value="datadetail.province + datadetail.area + datadetail.address">
           <!-- <van-icon slot="right-icon" name="location" class="custom-icon" /> -->
        </van-cell>
        <!-- <van-cell title="工单业务" :value="datadetail.businessName" /> -->
        <van-cell title="工单类型" is-link :value="datadetail.busDesc" />
        <van-cell title="服务状态" :value="datadetail.statudDesc" />
        <van-cell title="创建时间" :value="datadetail.addTime" />
        <van-cell title="服务时间" :value="datadetail.modifierTime" />
        <van-cell title="佣金" :value="datadetail.commission | getcommission" />
        
      </van-cell-group>
      <van-cell-group v-show="datadetail.label == 'installPOS'">
        <van-field
          v-model="tusn"
          center
          clearable
          label="设备编码"
          placeholder="请输入设备编码"
        >
        </van-field>
      </van-cell-group>
    <van-collapse v-model="activeNames1">
      <van-collapse-item title="备注" name="1">
         {{datadetail.remark}}
      </van-collapse-item>
    </van-collapse>

      <van-collapse v-model="activeNames" v-show="!datadetail.label == 'open_card'">
        <van-collapse-item title="佣金说明" name="1">
           <span style="font-size:16px; color: red;">总分：20分</span>
           <van-row>
            <!-- <van-col span="6">类别</van-col> -->
            <van-col span="8">起始分数</van-col>
            <van-col span="8">结束分数</van-col>
            <van-col span="8">佣金</van-col>
          </van-row>
          <van-row v-for="item in datadetail.commissions" :key="item.id">
            <!-- <van-col span="6">{{item.commissionName}}</van-col> -->
            <van-col span="8">{{item.startScore}}</van-col>
            <van-col span="8">{{item.endScore}}</van-col>
            <van-col span="8">{{item.money}}</van-col>
          </van-row>
          <!-- <span > {{item.commissionName}} 一共{{item.score}}分 --- 每分 {{item.money}}元<br></span> -->
        </van-collapse-item>
      </van-collapse>
       <div class="uploader" v-show="datadetail.status == 2">
          <uploader
            :files="Uploader.files"
            :title="Uploader.title"
            :limit="Uploader.limit"
            :autoUpload="Uploader.autoUpload"
            :quality="Uploader.quality"
            url="your remote upload url"
            @onChange="onChange"
            @onDelete="onDelete"
          >
          </uploader>
        </div>
      <div class="btn">
        <van-button type="primary" size="large" @click.stop.prevent="callclick">电话联系</van-button>
        <span v-show=" datadetail.status == 1">
           <van-button type="warning" :disabled="!status" size="large" @click="orderclick">{{statustext}}</van-button>
        </span>
        <span v-show="datadetail.status == 2">
           <van-button type="warning" :disabled="!status" size="large" @click="completionWorkOrder">{{statustext}}</van-button>
        </span>
       
      </div>
  </div>
</template>

<script>
import Uploader from '@/components/uploader'

export default {
  data () {
    return {
      Uploader: {
          'title': '竣工照片上传',
          'limit': 3,
          'autoUpload': false,
          'files': [],
          'quality': 0.5
       },
       tusn: '',
       index: "我是首页",
       activeNames: ['1'],
       activeNames1: ['1'],
       workOrderId: 36,
       datadetail: {},
       message: '',
       status: false,
       statustext: '',
       files:[]
    }
  },
  mounted() {
    this.getuid()
    this.workOrderId = this.$route.query.id
    this.getdata(this.workOrderId)
    
  },
  methods: {
    onDelete (index) {
      // console.log(index)
      this.files.splice(index, 1);
    },
    onChange (fileList) {
       console.log(fileList[0])
       this.files.push(fileList[0])
      //  this.file = fileList[0]
    },
    getuid () {
        let uid = JSON.parse(localStorage.getItem('user'))
        this.uid = uid.user
   },
   async completionWorkOrder () {
     console.log('2222')
     if(this.files.length < 3 ) {
       this.$toast('请上传三张竣工图')
       return false
     }
     let resdata = await this.uploadCompletion(this.files)
     this.completionWorkOrderpost(resdata.data)
     console.log(resdata)
   },
   completionWorkOrderpost (paths, tusn="") {
        let that = this;
        this.$axios.get('pocket/wxchat/completionWorkOrder', { params: { 'uid': this.uid , 'workOrderId': this.workOrderId, 'paths': paths, 'tusn': tusn}})
          .then((res) => {
            console.log(res.data)
             that.$toast.success(res.data.msg);
             that.getdata(that.workOrderId)
          })
          .catch((err) => {
            this.$toast(err);
            console.log(err)
          })
   },
   getdata (id) {
     let that = this;
    this.$axios.get('pocket/wxchat/workOrderDetail', { params: { 'workOrderId': id }})
      .then((res) => {
        console.log(res.data.data)
        that.datadetail = res.data.data
         
         if( that.datadetail.status == 1 ) {
               that.status = true
               that.statustext = '抢工单'
         } else if (that.datadetail.status == 2) {
           that.status = true
           that.statustext = '竣工'
         } else {
           that.status = false
         }
         console.log(that.status)
      })
      .catch((err) => {
         this.$toast(err);
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
    orderclick () {
      let that = this
      that.updateWorkOrder()
   },
   updateWorkOrder () {
      let that = this;
      this.$axios.get('pocket/wxchat/updateWorkOrder', { params: { 'workOrderId': that.workOrderId, 'uid': that.uid }})
        .then((res) => {
          // console.log(res)
          that.$toast.success(res.data.msg);
          that.getdata(that.workOrderId)
        })
        .catch((err) => {
          this.$toast(err);
          console.log(err)
        })
   },
  // 竣工上传图片
   uploadCompletion (file) {
     let that = this
      const toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '上传图片中.....'
      });
      let formdata = new FormData();
      // formdata.append('code', that.datadetail.workOrderCode );
      // formdata.append('phone', that.datadetail.customerMobile)
      formdata.append('file', file[0]);
      formdata.append('file', file[1]);
      formdata.append('file', file[2]);
      let url = 'pocket/wxchat/uploadCompletion/' + that.datadetail.customerMobile + '/' + that.datadetail.workOrderCode
      return new Promise ((resolve, reject) => {
         that.$axios({
           url: url,
            method:'post',
            data:formdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then((res) => {
           console.log(res)
           toast.clear()
           resolve(res.data)
         })
         .catch((err) => {
           console.log(err)
           reject(err)
         })
      })
    }
  },
  filters: {
    getcommission (val) {
      if(!val) {
        return 0
      }
      return val
    }
  },
  components: {
     Uploader
  }
}
</script>

<style lang="less" type="text/less" scoped>
.app-container {
  // height: 100%;
  background: #efefef;
}
.btn {
  padding: 20px;
  padding-bottom: 100px;
  .van-button--large {
     margin-top:30px;
  }
}
.uploader {
  background: #fff;

}
 
</style>
