<template>
  <div class="app-container">
      <div class="bindingInfo">
          <div class="pocket">
              口袋商服
          </div>
        <div class="phone">
                <van-cell-group >

                <van-field 
                    required
                    label="手机号"
                    placeholder="请输入手机号"
                    v-model="phone"
                     v-on:input="activeBind()"
                />

                <van-field
                    type=""
                    label="验证码"
                    placeholder="请输入验证码"
                    required
                   v-model="yzm"
                   v-on:input="activeBind()"
                >
                 <van-button slot="button" size="small" class="obtain-yzm" @click="obtainYzm">{{content}}</van-button>
                </van-field>
               
                </van-cell-group>
        </div>
       <div class="binding">
           <van-button size="large" class="binding-info" :class="[canBind?'canBinding':'']" round @click="bindAccount">绑定</van-button>
        
       </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        content:'获取验证码',
                totalTime:60,   //倒计时
                canClick:true, //添加canClick
                phone:'',
                yzm:'',
                canBind:false,
                openId:''

       
    }
  },
  components: {

  },
  mounted(){
    this.openId = localStorage.getItem('openid');
    
  },
  methods:{
   
    obtainYzm:function(){
      if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
        this.$toast('手机号码有误，请重填');
        return false; 
    } 
       if(!this.canClick){return}  //节流   
                   this.canClick=false;
                   this.content = this.totalTime + 's后重新发送'
                   let clock = window.setInterval(() => {
                   this.totalTime--;
                  this.content = this.totalTime + 's后重新发送'
                  if (this.totalTime < 0) {  //当倒计时小于0时清除定时器
                       window.clearInterval(clock); //关闭
                       this.content = '重新获取验证码'
                       this.totalTime = 60;
                       this.canClick = true; //这里重新开启
                          }
             
        },1000)
        //发送验证码
         this.$axios.get('pocket/wxchatc/sms/', { params: {'phone': this.phone}})
      .then(res=>{
            if(res.data.code==0){
          this.$toast('验证码已发送');
          }else{
            this.$toast(res.data.msg);
          }
          console.log(res.data)
      })
      .catch(err=>{
          console.log(err)
      })

    },
    // 按钮的激活状态
    activeBind(){
        if(this.phone&&this.yzm){
        this.canBind=true;
    }else{
         this.canBind=false;
    }
    },
    // 去绑定
    bindAccount(){
    if(!this.canBind){ 
        this.$toast('请填写完整');
        return false; 
    } 

     this.$axios.get('pocket/wxchatc/customerBind', { params: {'mobile': this.phone,'code':this.yzm,'openId':this.openId}})
      .then(res=>{
          if(res.data.code==0){
           localStorage.setItem('Binding','y');
           this.$toast('绑定成功！');        
           let that = this;
             setTimeout(function(){
              that.$router.replace('/myStore');
           },1000)
         
          }else{
              this.$toast(res.data.msg);
          }
      
          
          console.log(res.data)
      })
      .catch(err=>{
          this.$toast(err);
      })
   
         
    }
  }
}
</script>

<style scoped>
.pocket{
    font-size: 48px;
    text-align: center;
    height: 208px;
    line-height: 78px;
    color:#68B6F7;
}
.app-container{
  height: 100%;
  background: #ffffff;
}
.bindingInfo{
    padding-top: 140px;
}
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
   background: #68B6F7;
   color: #ffffff;
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
   background: #eee;
     color: #999;
}
.canBinding{
     background: #68B6F7;
     color: #ffffff;
}
 
</style>
