
<template>
  <div class="app-container">
      <van-cell-group>
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
        >
         <van-button slot="button" size="small" type="primary" @click = "findId">匹配客户</van-button>
        </van-field>
        <van-cell-group>
          <van-cell title="店铺名称" :value="userdata.shopName" />
          <van-cell title="联系人" :value="userdata.name" />
          <van-cell title="地区" :value="area" />
          <van-cell title="详细地址" :value="userdata.address" />
           <van-cell title="业务类型" is-link :value="typedata" @click="seletype" />
        </van-cell-group>
        <van-cell-group>
        <van-field
          v-model="addWorkOrderfrom.remark"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      </van-cell-group>
      <div class="btn">
         <van-button type="primary" size="large" @click="addwork">新增工单</van-button>
         <router-link to="/adduser">
             <van-button type="warning" size="large">新建客户</van-button>
        </router-link>
      </div>
      <!-- 弹出层 -->
      <div>
        <van-popup v-model="show" position="bottom">
             <van-row>
                <van-col span="12">
                  <div class="popupbtn" style="text-align: left">
                       取消
                  </div>
                 
                </van-col>
                <van-col span="12" style="text-align: right">
                   <div class="popupbtn" @click="okbtn">
                       确定
                  </div>
                </van-col>
              </van-row>
             <van-picker :columns="columns" @change="onChange" />
        </van-popup>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
       show: false,
       activeNames: ['1'],
       value: '',
       phone: '18812345688',
       uid: 3,
       area: '',
       imageurl: '',
       address: '', // 详细地址
       columns: [ ],
       addWorkOrderfrom: {
         'cId' : '',
         'uid': '',
          'bId': '',
          'remark': ''
       },
       userdata: {},
       // 业务类型
       typecolumns: [],
       typecolumn: {},
       typedata: '选择业务类型'
    }
  },
  mounted () {
    this.getUserInfo()
    this.checkBusDate ()
    this.addWorkOrderfrom.uid = this.uid
  },
  methods: {
    seletype () {
       this.show = true
    },
    addwork () {
      console.log(this.addWorkOrderfrom)
      let that = this;
        this.$axios.get('pocket/wxchat/addWorkOrder', { params: that.addWorkOrderfrom })
          .then((res) => {
            console.log(res.data)
             that.$notify({
                message: res.data.msg ,
                duration: 1000,
                background: '#1989fa'
              });
          })
          .catch((err) => {
            console.log(err)
          })
    },
    // 确认按钮
    okbtn () {
       console.log(this.typecolumn)
       this.addWorkOrderfrom.bId = this.typecolumn.id
        this.show = false
        this.typedata = this.typecolumn.busName
    },
    // 选择类型
    onChange(picker, value, index) {
      let that = this
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.typecolumn = that.typecolumns[index]
    },
    // 上传图片
    onRead(file) {
      console.log(file)
      this.imageurl = window.URL.createObjectURL(file.file)
    },
    setcolumns (dataarr) {
       dataarr.forEach(ele => {
          this.columns.push(ele.busName)
       });
    },
    // 查询业务员业务
    checkBusDate () { 
       let that = this;
        this.$axios.get('pocket/wxchat/checkBusDate', { params: { 'uid': that.uid  }})
          .then((res) => {
            console.log(res.data)
            that.typecolumns = res.data.data
            that.setcolumns(that.typecolumns)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    // 获取业务员信息
    getUserInfo () {
       
       let that = this;
        this.$axios.get('pocket/wxchat/getUserInfo', { params: { 'uid': that.uid  }})
          .then((res) => {
            console.log(res.data)
            that.area = res.data.data.province + res.data.data.area
          })
          .catch((err) => {
            console.log(err)
          })
    },
    // 获取客户信息
    getCustomerInfo (mobile) {
      let that = this;
        this.$axios.get('pocket/wxchat/getCustomerInfo', { params: { 'uid': that.uid , 'mobile': mobile }})
          .then((res) => {
            console.log(res.data)
            that.address =  res.data.data.address
            that.userdata = res.data.data
            that.addWorkOrderfrom.cId = res.data.data.id
          })
          .catch((err) => {
            console.log(err)
          })
    },
    findId () {
      this.getCustomerInfo(this.phone)

      this.$notify({
         message: '匹配用户ID成功',
         duration: 1000,
         background: '#1989fa'
      });
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
.uploadimg {
  padding: 20px;
  border-bottom: 1px solid #efefef;
}
.imgagerurl {
  width: 200px;
  img {
    width: 100%;
  }
}
.popupbtn {
  padding: 30px;
  color: blue;
}
</style>
