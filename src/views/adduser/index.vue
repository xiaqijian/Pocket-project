
<template>
  <div class="app-container">
      <van-cell-group>
        <van-cell title="工单业务" is-link value="平安银行" />
        <van-field v-model="value" label="店铺名称" placeholder="请输入用户名" />
        <van-field v-model="value" label="联系人" placeholder="请输入用户名" />
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
        />
         <van-field
          v-model="value"
          label="客户定位"
          placeholder="请输入地址信息"
        >
          <van-button slot="button" size="small" type="primary">定位</van-button>
        </van-field>
        <div class="uploadimg">
            <h5>营业执照</h5>
        <van-uploader  accept="image/gif, image/jpeg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
        </div>
         <div class="uploadimg">
            <h5>资料上传</h5>
        <van-uploader  accept="image/gif, image/jpeg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
        </div>
        
      </van-cell-group>
      
      <div class="btn">
        <van-button type="warning" size="large">新建客户</van-button>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页",
       activeNames: ['1'],
       value: ''
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
 
</style>
