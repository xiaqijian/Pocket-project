<template>
  <div class="app-container">
      <div class="weihu">
          <p class="p">联迪A8pos使用说明</p>
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
  },
  data () {
    return {
        
    }
  },
}
</script>

<style scoped>
.weihu{
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
</style>
