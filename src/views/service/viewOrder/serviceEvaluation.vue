<template>
  <div class="app-container">
    <!-- <div class="service-judge">
      <h3><van-icon name="records" size="40px"/>服务评价</h3>
      <p>&nbsp;&nbsp;请您对本次服务做出评价</p>
    </div> -->
    <div class="service-judge">请您对本次服务做出评价</div>
    
      <div class="judge-score">
          <div class="contact" v-for="(item,index) in arrList" :key="index">
                      <label>{{item.value}}</label>
                      <van-rate
                      v-model="contactV[index]"
                      icon="like"
                      void-icon="like-o" />
            </div>
          
      </div>
   <div class="doJudge" @click="doJudge">
      <van-button size="large" >确认打分</van-button>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index:'0',
      contactV: [5,5,5],//默认五星好评
      //工单id
      workId:'',
      //评分
      eval:{},
      customerId:'',
      descripe:'',
      arrList:[],
      arrid:[],
    }
  },
  mounted(){
    this.workId = this.$route.params.id;
    this.customerId = localStorage.getItem('customerId');
    console.log(this.workId)
    this.getDtailData();
  },
  methods:{
  getDtailData(){
    let that = this;
    that.workId = this.$route.params.id;
    let gdID = that.workId;
    console.log(gdID)
    that.$axios.get('pocket/wxchatc/workOrderDetail', 
        { params: { 
          'workOrderId':gdID,
          }
        })
        .then(res=>{
          console.log(res.data.data.commissionNameList);  
          that.arrList = res.data.data.commissionNameList;
          let arr = [];
          for(let i=0;i<res.data.data.commissionNameList.length;i++){
            arr.push(res.data.data.commissionNameList[i].sysId)
          }
          that.arrid = arr;
          console.log(that.arrid);
        })
        .catch(err=>{
            console.log(err)
            this.$toast('数据获取失败');
        })
  },
  doJudge:function(){
     let that = this;
     console.log(this.contactV)
     let evaluation = {}
     this.contactV.forEach((ele, index) => {
        console.log(ele)
        // console.log(index)
        let id = that.arrList[index].sysId
        evaluation[id] = ele

     });
     console.log(evaluation)
  this.$axios.get('pocket/wxchatc/customerWoUpdate',
      {params:{
        workOrderId:this.workId,
        status:3,
        customerId:this.customerId,
        evaluation:evaluation
      }}).
      then(res=>{
    console.log(res)
    if(res.data.code==200){
    this.$dialog.alert({
      message: '您的评价已提交！'
    });
    setTimeout(function(){
               this.$router.replace('/myOrder')
           },1000)
    }else{
      this.$toast(res.data.msg);
          }
            }).
            catch(err=>{
          this.$toast(err);
        })
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
  padding-top: 60px;
  padding-left: 40px;
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
  width: 70%;
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
