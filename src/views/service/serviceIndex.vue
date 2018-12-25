<template>
  <div class="app-container">
      <div class="callService">
        <p class="p" @click="callyewu">
             您好，我是您的收银小管家，点我呼叫业务员
       </p>   
      </div>
      <div></div>
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
          console.log(11);

      }
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped>
.callService{
    width: 80%;
    height: 500px;
    border: 1px solid black;
    margin:50px auto 30px;
}
.p{
    text-align:center;
    vertical-align:middle;
    line-height: 500px;
}
</style>
