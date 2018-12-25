<template>
  <div class="app-container">
    <div v-for="item in list" class="card">
      <div slot="footer">
        <van-cell title="工单ID" :value="item.workID" size="large"/>
        <van-cell title="开始时间：" :value="item.stratTime" size="large"/>
        <van-cell title="当前状态" :value="item.workState" size="large" />
        <router-link to="/">
          <van-button class="chakan" size="large" >查看</van-button>
        </router-link>
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
    workDetail:function(scope){
        console.log("点击了查看")
    }
  },
  data () {
    return {
       list:[
           {
            workID:'111',
            workState:'处理中',
            stratTime:"2018-12-24 12:00"
           },
           {
            workID:'222',
            workState:'异常(催单)',
            stratTime:"2018-12-25 11:00"
           },
            {
            workID:'3333',
            workState:'异常(催单)',
            stratTime:"2018-12-25 11:00"
           }
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
