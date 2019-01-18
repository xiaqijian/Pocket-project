<template>
  <div class="app-container">
    <div class="service-judge">
      <h3><van-icon name="records" size="40px"/>服务评价</h3>
      <p>请您对本次服务做出评价</p>
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
      <van-button size="large" type="warning">确认打分</van-button>
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
h3{
  color: coral;
}
.app-container{
  padding: 20px 40px;
}
.service-judge{
  padding: 5px 10px;
  border-radius: 10px;
  /* background: coral; */
  border: 1px solid #e5e5e5;
  margin-bottom: 130px;
  /* color: #b32b2b; */
  box-shadow: #eee -2px 1px  10px 2px;
}
.contact {
    padding-left: 23%;
    margin-bottom: 30px;
   
}
.contact label{
     float: left;
     margin-right: 20px;
    }
.doJudge{
  text-align: center;
  width: 60%;
  margin:70px auto 0; 
}
.van-button--normal{
  border-radius: 10px;
  background:coral;
  color: #ffffff
}
 
 
</style>
