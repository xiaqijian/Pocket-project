
<template>
  <div class="app-container">
      <van-cell-group>
        <van-field v-model="userdata.shopName" label="名称" placeholder="请输入名字" />
        <van-field v-model="userdata.name" label="店铺名称" placeholder="请输入店铺名称" />
        <van-field
          v-model="userdata.mobile"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="userdata.shopMobile"
          label="店铺联系电话"
          placeholder="请输入店铺联系手机号"
        />
        
       
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
        <van-cell title="详细地址" is-link :value="provvalDetail"  size="large" @click="searchAddress"/>
         <!-- <van-field
          v-model="userdata.address"
          label="详细地址"
          placeholder="请输入地址信息"
        >
        </van-field> -->
        <div class="uploadimg">
            <div>营业执照</div>
            <!-- <van-uploader  :after-read="onRead" :disabled='updisabled' accept="image/gif, image/jpeg" multiple>
              <van-icon name="photograph" size="30px"/>
            </van-uploader> -->
             <uploader
            :files="Uploader.files"
            :title="Uploader.title"
            :limit="Uploader.limit"
            :quality="Uploader.quality"
            :autoUpload="Uploader.autoUpload"
            :url="Uploader.imgurl"
            @onChange="onChange"
          
  >
  </uploader>
            <div class="cover" v-if='cover' @click="onCover()"></div>
        </div>
        <div class="imgsrc">
        <div class="hasupload"><span>已上传</span></div>
        <img :src="imgsrc" alt="">
        </div>
         <van-field
          v-model="userdata.businessLicense"
          label="组织机构代码"
          placeholder="请输入组织机构代码"
        >
        </van-field>
      </van-cell-group>
    
      <div class="btn">
         <van-button round size="large" @click="modify" >确认修改</van-button>
        
      </div>
<div class="loading" v-if='onUping'>
 <van-loading type="spinner" color="white" />
</div>
  </div>
</template>

<script>
 import Uploader from 'vux-uploader-component'
export default {
  data () {
    return {
       Uploader: {
          'title': '营业执照修改',
          'limit': 1,
          'autoUpload': false,
          'quality':0.5,
          'files': [],
          'imgurl':''
       },
       index: "我是首页",
       activeNames: ['1'],
       value: '',
       uid: 3,
       imgsrc: '',
       provval:'',
       provvalDetail:'',
       cityval:'',
       morencity:'',
       show: false,
       cityshow:false,
       provSelect:[],
       provdata:[],
       citySelect:[],
       citydata:[],
       cityidid:'',
       submitDisabled:true,
       updisabled:true,
       onUping:false,
       cover:true,
       imgPathUrl:'',
       userdata: {
         'name': '',///客户店铺地址
         'shopName': '',//客户名称
         'mobile': '',
         'shopMobile':'',
         'address': '',
         'businessLicense': '',
         'province':'',//省份名称
         'area':'',//城市名称
         'areaCode':'',//城市id
         'licenseUrl': '',
         'path':'',
         'lng':'',
         'lat':''
       },
       file: '',
    }
  },
  components: {
      Uploader,
    },
  mounted() {
    this.getproData();
    this.id = this.$route.query.id;
    console.log(this.id);
    //获取修改数据
   let list = localStorage.getItem('mod');
   list = JSON.parse(list);
   console.log(list);
   //初始赋值数据
console.log(list.name)
  this.userdata.name = list.name;
  this.userdata.shopName = list.shopName;
  this.userdata.mobile = list.mobile;
  this.provval= list.province;
  this.cityval = list.provinceArea;
  this.provvalDetail = list.address;
  this.userdata.shopMobile = list.shopMobile;
  this.userdata.businessLicense = list.businessLicense;
  this.userdata.areaCode = list.areaCode;
//   this.userdata.path = list.licenseUrl;
  this.userdata.lng=list.lng;
  this.userdata.lat = list.lat;
  this.imgPathUrl = list.licenseUrl;
  this.picPath = list.licenseUrl;
  let str = encodeURI(this.imgPathUrl);
  this.imgsrc='http://www.mypocketms.com/upload/'+str
console.log(this.Uploader.files)    
    console.log(this.$route.params.address,'oooooo')
    if(localStorage.getItem('data')&&sessionStorage.getItem('status')==1){
       let data = JSON.parse(localStorage.getItem('data'));
       console.log(data)
      this.userdata.name= data.name;
      this.userdata.shopName=data.shopName;
       this.userdata.mobile =data.mobile;
       this.userdata.shopMobile =data.shopMobile;
       this.provval=data.provval;
        this.cityval=data.cityval;
         this.userdata.lng = data.lng;
         this.cityidid = data.cityidid;
    this.userdata.lat =data.lat;
    this.provvalDetail = data.address;
       data = JSON.stringify(data)
       localStorage.setItem('data',data);
    }
   
  },
   watch: {
    'userdata.mobile': {
      handler() {
        if((/^1[34578]\d{9}$/.test(this.userdata.mobile))){ 
       
        this.updisabled=false;
        this.cover = false;
      }else{
        this.updisabled=true;
        this.cover = true;
      }
      },
      deep: true,
      immediate: true
    }
  },
  
  methods: {
    searchAddress:function(){

//缓存数据
let data = {};
       data.name = this.userdata.name;
       data.shopName = this.userdata.shopName;
       data.mobile = this.userdata.mobile;
       data.provval = this.provval;
       data.cityval = this.cityval;
       data.shopMobile=this.userdata.shopMobile;
       data.cityidid = this.cityidid;
       data = JSON.stringify(data)
       localStorage.setItem('data',data);


      if(this.provval){
        let city =this.cityval =='市辖区'?this.provval:this.cityval
        this.$router.push({name:'searchAddress',params:{city:city}})
      }else{
         this.$toast('请先选择您的省份！');
         return;
      }
      
    },
    //省份选的
    sfSelect:function(){
        let that = this;
        that.show = true;
    },
    // 城市选择
    csSelect:function(){
        let that = this;
        that.cityshow = true;
    },
    //照片调用
    onSuccess(result){
      console.log(result)
    },
    onChange(fileList){
      console.log(fileList);
      
    },
    //省份选择确认 需要发送当前选择的省份的id 以获取省份下面的城市
    onConfirm(value, index) {
      this.provvalDetail ='';
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aa = value;
      let that = this;
      that.provval = aa; //将当前选择的值显示到页面
      that.show = false;
      let provid = that.provdata[index].id;
      //选择省份时发送接口
      let citarr = [];
      that.$axios.get('pocket/wxchatc/getCity', 
          { params: { 
            'id':provid,
            }
          })
          .then(res=>{
            // console.log(res.data.data[0].name);
            that.cityval = res.data.data[0].name;
            that.cityidid =res.data.data[0].id;
            console.log(that.cityidid,'pro')
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
    onCover(){
         if(!(/^1[34578]\d{9}$/.test(this.userdata.mobile))){ 
       
       this.$toast('请先填写手机号');
      }
    },
    //城市选择确认
    onConfirm1(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aaa = value;
      let that = this;
      that.cityval = aaa;
      that.cityshow = false;
      that.cityidid =  that.citydata[index].id;
      console.log(that.cityidid,'city');
    },
    onCancel1() {
      this.cityshow = false;
    //   this.Toast('取消');
    },
    // 获取所有省份信息
    getproData(){
        let that = this;
        let arr = [];
        let idarr = [];
        that.$axios.get('pocket/wxchatc/getProvince', 
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
   async onChange(fileList) {
      console.log(fileList)
      var file = fileList[0];
      this.onUping=true;
      this.file = file
      let res = await this.uploadLicense(this.userdata.mobile, this.file)
      console.log(res)
       if(res.data.code=='0'){//说明上传成功
       console.log(res.data.data.path)
       let url =res.data.data.path;
       let str = encodeURI(url);
       console.log(str)
       this.imgsrc ='http://www.mypocketms.com/upload/'+str;
       
              if(res.data.data.code){//图片解析成功，把机构代码填入
                  this.userdata.businessLicense = res.data.data.code;
              }else{
                  this.$toast('组织机构代码未识别 请重新上传或直接输入');
              }
              this.submitDisabled = false
              this.picPath = res.data.data.path
           }else{
              this.$toast(res.data.msg);
             return
           }

       
    },
    // 上传营业执照
    uploadLicense (phone, file) {
      console.log(file,22)
      let that = this
      let formdata = new FormData();
      formdata.append('phone', phone);
      formdata.append('file', file);
      if(!(/^1[34578]\d{9}$/.test(that.userdata.mobile))){ 
        this.$toast('手机号码有误，请重填');
        return false; 
      }else{
        
        return new Promise ((resolve, reject) => {
         that.$axios({
           url:'pocket/wxchatc/uploadLicense/'+ phone,
            method:'post',
            data:formdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then((res) => {
           this.onUping=false;
           console.log(res)
           resolve(res)
        
         })
         .catch((err) => {
           this.onUping=false;
           console.log(err)
            this.$toast(err);
           reject(err)
         })
      })
      }
      
    },
    // 修改店铺
    async modify(){
       let that = this; 
      //  let res = await that.uploadLicense(that.userdata.mobile, that.file)
       let phofuwuadd = this.picPath;
       console.log(this.phofuwuadd)
       let khname = that.userdata.shopName;
       let khaddr = that.userdata.name;
       let khphone = that.userdata.mobile;
       let khnameaddr = that.provvalDetail;
       let gszzcode = that.userdata.businessLicense;
       let shengfen = that.provval;
       let chengshi = that.cityval;
       let csID = that.cityidid;
       console.log(csID,222)
       let lng = that.userdata.lng;
       let lat = that.userdata.lat;
       let shopMobile = that.userdata.shopMobile;
      if(!(/^1[34578]\d{9}$/.test(that.userdata.mobile))||!(/^1[34578]\d{9}$/.test(that.userdata.shopMobile))){ 
        this.$toast('手机号码有误，请重填');
        return false; 
      }else if(phofuwuadd && khname && khaddr && khphone &&shopMobile&& khnameaddr  && gszzcode && shengfen && chengshi){
          console.log(11);
          that.$axios.post('pocket/wxchatc/customerInfoUpdate', 
           { 
            'id':this.id,
            'name': khname,//客户名称
            'shopName': khaddr,//	客户店铺地址
            'mobile': khphone,//客户手机号码
            'address': khnameaddr,//客户地址
            'businessLicense': gszzcode,//公司组织机构代码
            'province':shengfen,//省份名称
            'area':chengshi,//城市名称
            'areaCode':csID,//城市id
            'licenseUrl': phofuwuadd,//上传的营业执照服务端地址
            'longitude':lng,
            'latitude':lat,
            'shopMobile':shopMobile
            
          })
          .then(res=>{
            if(res.data.code===0){
           this.$toast('修改成功！');
            localStorage.setItem('data',null);
             let that = this;
             setTimeout(function(){
               that.$router.push('/myStore')
           },1000)
         
          }else{
              this.$toast(res.data.msg);
          }
            console.log(res.data);
          })
          .catch(err=>{
              console.log(err)
              this.$toast('修改失败');
          })
       }else{
         this.$toast('请填写完整')
       }
      
      console.log(this.userdata)
    //   let data = await this.uploadLicense(this.userdata.mobile, this.file)
    //   this.userdata.licenseUrl = data.path
    //   this.addNewCustomer(this.userdata);
     
    }
  },
}
</script>

<style lang="less" type="text/less" scoped>
.app-container {
  // height: 100%;
  background: #efefef;
  position: relative;
  width: 100%;
  // height: 100%;
}
.loading{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background:rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
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
.uploadimg {
  padding: 20px;
  border-bottom: 1px solid #efefef;
  position:relative;
  .cover{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30%;
    height: 50%;
    background: rgba(0,0,0,0);
    z-index: 1000;
    
  }
}

.imgsrc {
  width: 100%;
  padding: 10px 40px;
 .hasupload{
   float: left;
   margin-right: 20px;
 }
  img {
    width: 30%;
  }
}
</style>
<style>
.van-field .van-cell__title{
  max-width: 120px;
}
.vux-uploader .vux-uploader_hd .vux-uploader_info{
  color:#fff !important;
}
</style>

