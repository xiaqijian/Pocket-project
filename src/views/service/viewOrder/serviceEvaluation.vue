<template>
  <div class="app-container">
    <div>服务评价</div>
    <p>宝贝满足您的期待吗？</p>
    <div class="contact">
    <label>联系速度</label>
    <van-rate
  v-model="value"
  icon="like"
  void-icon="like-o"
/>
    </div>
    <div class="contact">
    <label>上门速度</label>
    <van-rate
  v-model="value"
  icon="like"
  void-icon="like-o"
/>
    </div>
    <div class="contact">
    <label>服务质量</label>
    <van-rate
  v-model="value"
  icon="like"
  void-icon="like-o"
/>
    </div>
     <div class="contact">
    <label>服务态度</label>
    <van-rate
  v-model="value"
  icon="like"
  void-icon="like-o"
/>
    </div>
    <van-button size="normal">确认打分</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是pingjia"
    }
  },
  components: {

  }
}
</script>

<style scoped>
.contact {
    padding-left: 10%;
    margin-bottom: 10px;
   
}
.contact label{
     float: left;
    }

 
 
</style>
