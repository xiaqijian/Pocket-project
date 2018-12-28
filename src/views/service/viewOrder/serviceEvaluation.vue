<template>
  <div class="app-container">
    <div class="service-judge">
      <p><van-icon name="records" size="20px"/>服务评价</p>
      <p>宝贝满足您的期待吗？</p>
      </div>
    
    <div class="contact">
    <label>联系速度</label>
    <van-rate
  v-model="contactV"
  icon="like"
  void-icon="like-o"
/>
    </div>
    <div class="contact">
    <label>上门速度</label>
    <van-rate
  v-model="arriveV"
  icon="like"
  void-icon="like-o"
/>
    </div>
    <div class="contact">
    <label>服务质量</label>
    <van-rate
  v-model="qualityV"
  icon="like"
  void-icon="like-o"
/>
    </div>
     <div class="contact">
    <label>服务态度</label>
    <van-rate
  v-model="attitudeV"
  icon="like"
  void-icon="like-o"
/>
    </div>
   <div class="doJudge" @click="doJudge">
      <van-button size="normal" >确认打分</van-button>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contactV: 0,
      arriveV:0,
      qualityV:0,
      attitudeV:0

    }
  },
  components: {

  },
  methods:{
    doJudge:function(){
      this.$dialog.alert({
      message: '您的评价已提交！'
    });
    }
  }
}
</script>

<style scoped>
.app-container{
  padding: 20px 40px;
}
.service-judge{
  padding: 5px 10px;
  border-radius: 30px;
  background: #Feee90;
  border: 1px solid #e5e5e5;
  margin-bottom: 30px;
  /* color: #b32b2b; */
  box-shadow: #eee -2px 1px  10px 2px;
}
.contact {
    padding-left: 10%;
    margin-bottom: 10px;
   
}
.contact label{
     float: left;
    }
.doJudge{
  text-align: center;
  margin-top: 30px;
}
.van-button--normal{
  border-radius: 10px;
  background:#Feee90;
}
 
 
</style>
