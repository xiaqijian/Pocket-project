
<template>
  <div class="app-container">
      <van-cell-group>
        <van-field v-model="userdata.shopName" label="店铺名称" placeholder="请输入用户名" />
        <van-field v-model="userdata.name" label="联系人" placeholder="请输入用户名" />
        <van-field
          v-model="userdata.mobile"
          label="手机号"
          placeholder="请输入手机号"
        />
         <van-field
          v-model="userdata.address"
          label="客户地址"
          placeholder="请输入地址信息"
        >
        </van-field>
        <van-field
          v-model="userdata.businessLicense"
          label="公司机构代码"
          placeholder="公司组织机构代码"
        >
        </van-field>
        <div>
          <uploader
            :files=[]
            :title="Uploader.title"
            :limit="Uploader.limit"
            :autoUpload="Uploader.autoUpload"
            url="your remote upload url"
            @onChange="onChange"
          >
          </uploader>
        </div>
        <!-- <div class="uploadimg">
            <h5>营业执照</h5>
            <van-uploader  :after-read="onRead" accept="image/gif, image/jpeg" multiple>
              <van-icon name="photograph" />
            </van-uploader>
        </div> -->
        <div class="imgsrc">
          <img :src="imgsrc" alt="">
        </div>
      </van-cell-group>
      <div class="btn">
        <van-button type="warning" size="large" @click="adduser">新建客户</van-button>
      </div>
  </div>
</template>

<script>
import Uploader from 'vux-uploader-component'

export default {
  data () {
    return {
       Uploader: {
          'title': '营业执照上传',
          'limit': 1,
          'autoUpload': false
       },
       index: "我是首页",
       activeNames: ['1'],
       value: '',
       uid: 3,
       imgsrc: '',
       userdata: {
         'uid': '',
         'name': '',
         'shopName': '',
         'mobile': '18812345688',
         'address': '',
         'businessLicense': '',
         'licenseUrl': ''
       },
       file: ''
    }
  },
  mounted() {
    this.userdata.uid = this.uid
  },
  components: {
     Uploader
  },
  methods: {
    onChange (fileList) {
       console.log(fileList[0])
       this.file = fileList[0]
    },
    onRead(file) {
      console.log(file)
      console.log(file.file)
      this.imgsrc = file.content
      this.file = file.file
    },
    // 上传营业执照
    uploadLicense (phone, file) {
      let that = this
      let formdata = new FormData();
      
      formdata.append('phone', phone);
      formdata.append('file', file);

      return new Promise ((resolve, reject) => {
         that.$axios({
           url:'pocket/wxchat/uploadLicense/'+ phone,
            method:'post',
            data:formdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then((res) => {
          //  console.log(res)
           resolve(res.data.data)
         })
         .catch((err) => {
           console.log(err)
           reject(err)
         })
      })
    },
    // 新增客户
    addNewCustomer (postdata) {
        let that = this
        that.$axios({
           url:'pocket/wxchat/addNewCustomer/'+ that.uid,
            method:'post',
            data: postdata
         }).then((res) => {
           that.$toast.success(res.data.data);
          //  this.$router.go(-1)
           console.log(res)
         })
         .catch((err) => {
            this.$toast(err);
           console.log(err)
         })
    },
    async adduser () {
      console.log(this.userdata)
      let that = this
      if(this.userdata.mobile == '' ) {
        this.$toast('请添加手机号码')
        return false
      }
      if(this.file == '' ) {
        this.$toast('请上传营业执照')
        return false
      }
      this.$toast.loading({
        mask: true,
        message: '识别营业执照中...'
      });
      let data = await this.uploadLicense(this.userdata.mobile, this.file)
      console.log(data)
      if(data.code === "无") {
         if(this.userdata.businessLicense == "") {
           this.$toast('无法识别机构代码，请填写公司机构代码')
           return false
         }
      } else {
        this.userdata.businessLicense = data.code
      }
      this.userdata.licenseUrl = data.path
      this.addNewCustomer(this.userdata)
    }
  },
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
.imgsrc {
  width: 100px;
  padding: 10px 40px;
  img {
    width: 100%;
  }
}
</style>
