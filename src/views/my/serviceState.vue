<template>
  <div class="app-container">
    <div class="person">
         <div class="person-info">
         <label>客户名称：</label> <span>赵莉</span>
         </div>
        <div class="person-id">
            <label>客户ID：</label> <span>18336391418</span>
        </div>
        <div class="person-address">
            <label>联系地址：</label> <span>河南省商丘市民权县</span>
        </div>
    </div>
    <div class="person-bussiness">
        <div class="bussiness-name">
            <label>开通业务：</label>
            <span>银行收单</span>
        </div>
        <div class="bussiness-status">
            <label>当前状态：</label>
            <span>异常</span>
        </div>
        <div class="bussiness-time">
            <label>共计使用时间：</label>
            <span>20小时</span>
        </div>
         <div class="service-last">
            <label>上次服务：</label>
            <span>15小时之前</span>
        </div>
        <div class="print-number">
            <label>打印次数：</label>
            <span>4次</span>
        </div>
         <div class="surplus-number">
            <label>剩余次数：</label>
            <span>4次</span>
        </div>
         <div class="machine-status">
            <label>机具状态：</label>
            <span>通信异常</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我的业务状态"
    }
  },
  components: {

  }
}
</script>

<style scoped>
.person{
    padding: 30px;
    border-bottom: 1px solid #e5e5e5;
}
.person>div{
    height: 48px;
    line-height: 48px;
}
.person-bussiness{
    width: 70%;
    margin: auto;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 40px;
    margin-top: 40px;
}
.person-bussiness>div{
    height: 48px;
    line-height: 48px;
}
 
</style>
