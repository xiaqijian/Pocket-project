<template>
  <div class="app-container">
      <div class="callService">
        <p class="p" @click="callyewu">
             您好，我是您的收银小管家，点我呼叫业务员
       </p>   
      </div>
      <div class="weihu">
          <!-- <p class="p" v-model="sjData">{{sjData}}</p> -->
      </div>
  </div>
</template>

<script>
export default {
  mounted(){
        //请求所有数据  封装成一个函数
  },
  methods:{
      //事件操作
      callyewu:function(){
          //拨打电话
          window.location.href = 'tel://110'
      }
  },
  data () {
    return {
        sjData:'您的维修请求已经受理，很快就会有业务员上门为您服务。'
    }
  },
}
</script>

<style scoped>
.callService,.weihu{
    width: 86%;
    height: 500px;
    border: 1px solid black;
    margin:50px auto 30px;
    display: table;
}
.p{
    display:table-cell; 
    vertical-align:middle;  
    text-align: center; /*设置文本水平居中*/  
    width:100%;
    color: RoyalBlue;;
}
.weihu{
    margin-top: 50px
}
</style>
