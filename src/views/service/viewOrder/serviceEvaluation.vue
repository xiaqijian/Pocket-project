<template>
  <div class="app-container">
    <div class="service-judge">
      <h3><van-icon name="records" size="40px"/>服务评价</h3>
      <p>&nbsp;&nbsp;请您对本次服务做出评价</p>
    </div>
    
      <div class="judge-score">
          <div class="contact">
                      <label>联系速度</label>
                      <van-rate
                    v-model="contactV"
                    icon="like"
                    void-icon="like-o"/>
              </div>
              <div class="contact">
                  <label>上门速度</label>
                  <van-rate
                v-model="arriveV"
                icon="like"
                void-icon="like-o"/>
              </div>
              <div class="contact">
              <label>服务质量</label>
              <van-rate
                v-model="qualityV"
                icon="like"
                void-icon="like-o" />
             </div>
            <div class="contact">
            <label>服务态度</label>
            <van-rate
              v-model="attitudeV"
              icon="like"
              void-icon="like-o"/>
            </div>
      </div>
   <div class="doJudge" @click="doJudge">
      <van-button size="large" round>确认打分</van-button>
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
  color: #ffffff;
}
.service-judge{
  padding: 5px 10px;
  border-radius: 10px;
  /* background: coral; */
  border: 1px solid #e5e5e5;
  margin-bottom: 130px;
   background: #68B6F7;
  color: #ffffff;
  box-shadow: #eee -2px 1px  10px 2px;
}
.contact {
    margin-bottom: 30px;
   
}
.judge-score{
  width: 65%;
  margin: auto;
  text-align: end;
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
.doJudge .van-button--large{
  width: 60%;
  background: #68B6F7;
  color: #ffffff;
}
.van-button--normal{
  border-radius: 10px;
  background:#68B6F7;
  color: #ffffff
}
 
 
</style>
