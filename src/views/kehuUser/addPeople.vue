
<template>
  <div class="app-container">
      <van-cell-group>
        <van-field v-model="userdata.shopName" label="客户名称" placeholder="请输入名字" />
        <van-field v-model="userdata.name" label="客户店铺地址" placeholder="请输入店铺地址" />
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
        <van-cell title="省份" is-link :value="provval" size="large" @click="sfSelect"/>
        <van-cell title="城市" is-link :value="cityval" size="large" @click="csSelect"/>
        <van-popup v-model="show"  position="bottom">
            <van-picker
            show-toolbar
            title="省份选择"
            :columns="provSelect"
            @cancel="onCancel"
            @confirm="onConfirm"
            />      
        </van-popup>
        <van-popup v-model="cityshow"  position="bottom">
            <van-picker
            show-toolbar
            title="城市选择"
            :columns="citySelect"
            @cancel="onCancel1"
            @confirm="onConfirm1"
            />      
        </van-popup>
        <div class="uploadimg">
            <h5>营业执照</h5>
            <van-uploader  :after-read="onRead" accept="image/gif, image/jpeg" multiple>
              <van-icon name="photograph" />
            </van-uploader>
        </div>
        <div class="imgsrc">
          <img :src="imgsrc" alt="">
        </div>
      </van-cell-group>
      <div class="btn">
        <van-button round size="large" @click="adduser" >新建客户</van-button>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
       activeNames: ['1'],
       value: '',
       uid: 3,
       imgsrc: '',
       provval:'请选择省份',
       cityval:'请选择城市',
       morencity:'',
       show: false,
       cityshow:false,
       provSelect:[],
       provdata:[],
       citySelect:[],
       citydata:[],
       cityidid:'',
       userdata: {
         'name': '',///客户店铺地址
         'shopName': '',//客户名称
         'mobile': '',
         'address': '',
         'businessLicense': '',
         'province':'',//省份名称
         'area':'',//城市名称
         'areaCode':'',//城市id
         'licenseUrl': ''
       },
       file: ''
    }
  },
  mounted() {
    this.getproData();
  },
  methods: {
    //省份选的
    sfSelect:function(){
        let that = this;
        that.show = true;
    },
    //城市选择
    csSelect:function(){
        let that = this;
        that.cityshow = true;
    },
    //省份选择确认 需要发送当前选择的省份的id 以获取省份下面的城市
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aa = value;
      let that = this;
      that.provval = aa; //将当前选择的值显示到页面
      that.show = false;
      let provid = that.provdata[index].id;
      //选择省份时发送接口
      let citarr = [];
      that.$axios.get('pocket/wxchat/getCity', 
          { params: { 
            'id':provid,
            }
          })
          .then(res=>{
            // console.log(res.data.data[0].name);
            that.cityval = res.data.data[0].name;
            that.cityidid =res.data.data[0].id;
            console.log(that.cityidid)
            that.citydata =res.data.data;
            for(let j =0;j<res.data.data.length;j++){
                citarr.push(res.data.data[j].name)
            }
            that.citySelect = citarr;
          })
          .catch(err=>{
              console.log(err)
          })
    },
    onCancel() {
      this.show = false;
    //   this.Toast('取消');
    },
    //城市选择确认
    onConfirm1(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aaa = value;
      let that = this;
      that.cityval = aaa;
      that.cityshow = false;
      that.cityidid =  that.citydata[index].id;
      console.log(that.cityidid);
    },
    onCancel1() {
      this.cityshow = false;
    //   this.Toast('取消');
    },
    //获取所有省份信息
    getproData(){
        let that = this;
        let arr = [];
        let idarr = [];
        that.$axios.get('pocket/wxchat/getProvince', 
          )
          .then(res=>{
            that.provdata =res.data.data;
            for(let i = 0;i<res.data.data.length;i++){
                arr.push(res.data.data[i].name);
            }
                that.provSelect = arr;
          })
          .catch(err=>{
              console.log(err)
          })
    },
    onRead(file) {
      // console.log(file)
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
          //  console.log(res.data)
         })
         .catch((err) => {
           console.log(err)
           reject(err)
         })
      })
    },
    // 新增客户
    async adduser(){
       let that = this; 
       let data = await that.uploadLicense(that.userdata.mobile, that.file)
       let phofuwuadd = data.path
       let khname = that.userdata.shopName;
       let khaddr = that.userdata.name;
       let khphone = that.userdata.mobile;
       let khnameaddr = that.userdata.address;
       let gszzcode = that.userdata.businessLicense;
       let shengfen = that.provval;
       let chengshi = that.cityval;
       let csID = that.cityidid;
       if(phofuwuadd !='' && khname !='' && khaddr !='' && khphone !='' && khnameaddr !='' && gszzcode !='' && shengfen !='' && chengshi !=''){
          console.log(11);
          that.$axios.get('pocket/wxchat/customerAdd', 
          { params: { 
            'name': khname,//客户名称
            'shopName': khaddr,//	客户店铺地址
            'mobile': khphone,//客户手机号码
            'address': khnameaddr,//客户地址
            'businessLicense': gszzcode,//公司组织机构代码
            'province':shengfen,//省份名称
            'area':chengshi,//城市名称
            'areaCode':csID,//城市id
            'licenseUrl': phofuwuadd//上传的营业执照服务端地址
            }
          })
          .then(res=>{
            console.log(res.data);
          })
          .catch(err=>{
              console.log(err)
              this.$toast('新建失败');
          })
       }else{
         this.$toast('请填写完整')
       }
      
      // console.log(this.userdata)
      // let data = await this.uploadLicense(this.userdata.mobile, this.file)
      // this.userdata.licenseUrl = data.path
      // this.addNewCustomer(this.userdata)
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
     background: #68B6F7;
     color: #fff;
     width: 60%;
     margin-left: 20%;
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
<style>
.van-field .van-cell__title{
  max-width: 120px;
}
</style>

