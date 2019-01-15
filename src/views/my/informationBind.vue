<template>
  <div class="app-container">
      <div class="bindingInfo">
        <div class="bussiness-prove">
                    <label>营业执照</label>
                    <div class="business-photo">

                    </div>
                    <van-uploader >
                    <van-icon name="photograph" />
                    </van-uploader>

        </div>
        <div class="phone">
                <van-cell-group >
                <van-field 
                    required
                    clearable
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    :error-message="errmessage"
                />
                <van-field
                    type="password"
                    label="验证码"
                    v-model="yanzhengma"
                    placeholder="请输入验证码"
                    required
                >
                 <van-button  slot="button"   type="default" size="small" class="obtain-yzm" v-if="sending" :disabled="disabled"  @click="huoqu">获取验证码
                     
                 </van-button>
                <van-button  slot="button"  type="default" size="small"  v-if="!sending" :disabled="disabled"  >{{second}}秒后重新获取
                     
                 </van-button>
                </van-field>
               
                </van-cell-group>
        </div>
       <div class="binding">
           <van-button size="large" class="binding-info" round @click="bangding">绑定</van-button>
        
       </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我的信息绑定",
       sending:true,//判断是否显示倒计时
       disabled:false,//是否禁用点击
       phone:'',//手机号
       yanzhengma:'', //验证码 
       second:60,//倒计时
       errmessage:'',//手机号错误信息
       openID:123456,
    }
  },
  mounted(){
    this.aa();
  },
  methods:{
      onRead(file) {
      console.log(file)
    },
    aa(){//获取用户信息
     let that = this;
      that.$axios.get('pocket/wxchat/getUserInfo', { params: {'uid': 3}})
      .then(res=>{
          console.log(res.data)
      })
      .catch(err=>{
          console.log(err)
      })
    },
    //点击获取验证码 并判断手机号格式
    huoqu:function(){
        let that = this;
        let phoneNum = that.phone;
        let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        that.errmessage  = '';
        that.sending = false;
        console.log(phoneNum)
         if(phoneNum ==''){
                console.log(111)
                that.errmessage = "请输入手机号码";
                 that.sending  = true;
            }else if(!reg.test(that.phone)){
                console.log(222);
                that.errmessage = "手机格式不正确";
                 that.sending  = true;
            }else{
                  let result = setInterval( ()=>{
               --that.second;
               if(that.second < 0)
                 {
                  clearInterval(result);
                  that.sending  = true;
                  that.disabled = false;
                  that.second = 60;
                  }                   
                 }, 1000);
             that.errmessage  = '';
            }   
        that.$axios.get('pocket/wxchat/sms/', { params: { 'phone':phoneNum}})
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        // that.$axios({
        //     methods:'post',
        //     url:'pocket/wxchat/sms/',
        //     data:that.qs.stringify(phonedata) 
        // })
        // .then(res=>{
        //     console.log(res.data)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },
    bangding:function(){
        let that = this;
        let bdPhone = that.phone;  //绑定手机号
        let bdyzm = that.yanzhengma; //绑定验证码
        let bdopenid = that.openID;//微信openid
        that.$axios.get('pocket/wxchat/bingd', { params: { 'phone':bdPhone,"openId":bdopenid,"code":bdyzm}})
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.bussiness-prove{
    background: #fafafa;
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center
}
.business-photo{
    width: 40%;
    height: 400px;
    border: 1px solid #e5e5e5;
}
.obtain-yzm{
    background: #eeeeee;
}
.bussiness-prove{
    margin-bottom: 40px;
}
 .binding{
    text-align: center;
    margin-top: 90px;
}
.binding-info{
    width: 60%;
    background: #eeeeee;
}
 
</style>
