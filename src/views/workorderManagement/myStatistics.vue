<template>
  <div class="app-container">
    <div v-for="item in list" class="card">
      <div slot="footer">
        <van-cell title="时间" :value="item.time" size="large"/>
        <van-cell title="完成单数" :value="item.doneNum" size="large"/>
        <van-cell title="平均服务分" :value="item.averageScore" size="large" />
        <van-cell title="获得佣金" :value="item.getMoney" size="large" />
      </div>
     </van-panel>
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
       list:[
           {
            time:'2018-12-24 12:00',
            doneNum:'22',
            averageScore:"88",
            getMoney:'500',
           },{
            time:'2018-12-24 12:00',
            doneNum:'22',
            averageScore:"88",
            getMoney:'250',
           },
         ]
    }
  },
}
</script>

<style scoped>
.card{
    background: #dddddd;
    padding: 5px;
}
.chakan{
    width: 100%;
}
</style>
