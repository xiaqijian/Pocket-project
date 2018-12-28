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
                    label="手机号"
                    placeholder="请输入手机号"
                />

                <van-field
                    type="password"
                    label="验证码"
                    placeholder="请输入验证码"
                    required
                >
                 <van-button slot="button" size="small" class="obtain-yzm">获取验证码</van-button>
                </van-field>
               
                </van-cell-group>
        </div>
       <div class="binding">
           <van-button size="large" class="binding-info" round >绑定</van-button>
        
       </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我的信息绑定"
       
    }
  },
  components: {

  },
  methods:{
      onRead(file) {
      console.log(file)
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
