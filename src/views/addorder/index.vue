
<template>
  <div class="app-container">
      <van-cell-group>
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
        >
         <!-- <van-button slot="button" size="small" type="primary" @click = "findId">匹配客户</van-button> -->
        </van-field>
        <van-cell-group  v-show="showbtn">
          <van-cell title="店铺名称" :value="shopName" @click="seletypeshop" is-link />
          <van-cell title="联系人" :value="userdata.name" />
          <van-cell title="店铺联系人" :value="userdata.shopMobile" />
          <van-cell title="地区" :value="area" />
          <van-cell title="详细地址" :value="userdata.address" />
           <van-cell title="业务类型" is-link :value="typedata" @click="seletype" />
        </van-cell-group>
        <van-cell-group  v-show="showbtn">
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
      <div class="btn" v-show="showuser">
         <van-button type="primary" size="large" @click="findId">匹配店铺</van-button>
      </div>
      <div class="btn" v-show="showwork">
         <van-button type="primary" size="large" @click="addwork" :disabled="workdisabled" >{{workname}}</van-button>
      </div>
      <div class="btn">
         <!-- <van-button type="primary" size="large" @click="addwork">新增工单</van-button> -->
         <router-link to="/adduser">
             <van-button type="warning" size="large">新建店铺</van-button>
        </router-link>
      </div>
       <!-- 店铺弹出层 -->
      <div>
        <van-popup v-model="showshop" position="bottom">
             <van-row>
                <van-col span="12">
                  <div class="popupbtn" style="text-align: left">
                       取消
                  </div>
                 
                </van-col>
                <van-col span="12" style="text-align: right">
                   <div class="popupbtn" @click="okbtnshop">
                       确定
                  </div>
                </van-col>
              </van-row>
             <van-picker :columns="columnsshop" @change="onChangeshop" />
        </van-popup>
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
      <!--  -->
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
       workdisabled: false,
       workname: '新增工单',
       show: false,
       showshop: false,
       showbtn: false,
       showwork: false,
       showadd: false,
       showuser: true,
       activeNames: ['1'],
       value: '',
       phone: '',
       uid: 3,
       area: '',
       imageurl: '',
       address: '', // 详细地址
       columns: [ ],
       columnsshop: [],
       addWorkOrderfrom: {
         'cId' : '',
         'uid': '',
          'bId': '',
          'remark': ''
       },
       userdata: {
        
       },
       // 业务类型
       typecolumns: [],
       typecolumnsshop: [], // 所有有效店铺
       typecolumnshop: {},
       typecolumn: {},
       shopName: '选择店铺',
       typedata: '选择业务类型'
    }
  },
  mounted () {
    this.getuid()
    this.getUserInfo()
    this.checkBusDate ()
    this.addWorkOrderfrom.uid = this.uid
    localStorage.removeItem('gomap')
  },
  methods: {
    checkPhone(phone){ 
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
            return true; 
        } 
      },
     getuid () {
      let uid = JSON.parse(localStorage.getItem('user'))
      this.uid = uid.user
    },
    // 设置店铺信息
    setshopinfo (data) {
      let that = this
      that.address =  data.address
      that.userdata = data
      that.addWorkOrderfrom.cId = data.id
      that.shopName = data.shopName
    },
    // 
    seletypeshop () {
       if(this.typecolumnsshop.length == 0 ) {
         this.$toast('无审核通过店铺')
         return false
       }
       this.showshop = true
       this.typecolumnshop = this.typecolumnsshop[0]
       this.setshopinfo(this.typecolumnshop)
    },
    seletype () {
       this.show = true
       this.typecolumn = this.typecolumns[0]
       this.addWorkOrderfrom.bId = this.typecolumn.id
       this.typedata = this.typecolumn.busName
    },
    addwork () {
      console.log(this.addWorkOrderfrom)
      // bId
      if(this.addWorkOrderfrom.bId == "") {
        this.$toast('请选择业务类型')
        return false
      }
      let that = this;
        this.$axios.get('pocket/wxchat/addWorkOrder', { params: that.addWorkOrderfrom })
          .then((res) => {
            console.log(res.data)
             that.$notify({
                message: res.data.msg ,
                duration: 1000,
                background: '#1989fa'
              });
              that.$router.replace('/orderlist')
          })
          .catch((err) => {
             this.$toast(err);
            console.log(err)
          })
    },
     // 确认按钮
    okbtnshop () {
       console.log(this.typecolumnshop)
       this.setshopinfo(this.typecolumnshop)
       this.showshop = false
    },
    // 确认按钮
    okbtn () {
       console.log(this.typecolumn)
       this.addWorkOrderfrom.bId = this.typecolumn.id
        this.show = false
        this.typedata = this.typecolumn.busName
    },
    
    // 选择类型
    onChangeshop(picker, value, index) {
      let that = this
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.typecolumnshop = that.typecolumnsshop[index]
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
    setcolumnsshop (dataarr) {
       this.columnsshop = []
       dataarr.forEach(ele => {
          this.columnsshop.push(ele.shopName)
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
             this.$toast(err);
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
            localStorage.setItem('uiddata', JSON.stringify(res.data.data))
          })
          .catch((err) => {
             this.$toast(err);
            console.log(err)
          })
    },
    // 过滤有效的店铺
    getshop (arr) {
      let newarr = arr.filter((item) => {
        return item.status == 1
      })
      if(newarr.length == 0) {
        this.workdisabled = true
        this.workname = '无审核通过的店铺'
        this.$toast('无审核通过店铺')
        return false
      }
      this.typecolumnsshop = newarr
      this.setcolumnsshop(newarr)
      // this.columnsshop = newarr
      console.log(newarr)
    },
    // 获取客户信息
    getCustomerInfo (mobile) {
      let that = this;
        this.$axios.get('pocket/wxchat/getCustomerInfo', { params: { 'uid': that.uid , 'mobile': mobile }})
          .then((res) => {
            if (res.data.data == 101) {
              that.$toast.fail(res.data.msg);
              that.showadd = true

              return false
            }
            console.log(res.data)
            // 获取有效的店铺 
            console.log(res.data.data)
            that.getshop(res.data.data)
            // 
            
            that.$notify({
              message: '匹配店铺ID成功',
              duration: 1000,
              background: '#1989fa'
            });
            that.showbtn = true
            that.showwork = true
            that.showadd = false
            that.showuser = false
          })
          .catch((err) => {
             this.$toast(err);
            console.log(err)
          })
    },
    findId () {
      if(this.phone == "") {
        this.$toast('手机号码不能为空');
        return false
      }
      if(this.checkPhone(this.phone)) {
         this.$toast('手机号码不正确');
        return false
      }
      this.getCustomerInfo(this.phone)
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
  // padding-bottom: 100px;
  
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
