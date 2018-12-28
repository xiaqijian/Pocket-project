<template>
  <div class="app-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="item in list" class="card">
        <van-cell title="时间" :value="item.time" size="large"/>
        <van-cell title="完成单数" :value="item.doneNum" size="large"/>
        <van-cell title="平均服务分" :value="item.averageScore" size="large" />
        <van-cell title="获得佣金" :value="item.getMoney" size="large" />
      </div>
    </van-list>
  </van-pull-refresh>
    <div class="btn"  v-model="active">
      <van-tabbar v-model="active" @change="clickchange">
        <van-tabbar-item >按周查看</van-tabbar-item>
        <van-tabbar-item >按月查看</van-tabbar-item>
      </van-tabbar>
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
      clickchange(active){
        console.log(active);
        if(active ==1){
          //按月查看的数据
            this.$toast('按月查看');
        }else{
          //按周查看的数据
            this.$toast('按周查看');

        }
      },
      onRefresh() { //下拉刷新
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        }, 500);
      },
      onLoad() {//上拉加载数据
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 4) {
          this.finished = true;
        }
      }, 500);
    }

  },
  data () {
    return {
       active:0,
       isLoading: false,
       loading: false,
       finished: false,
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
           },{
            time:'2018-12-24 12:00',
            doneNum:'22',
            averageScore:"88",
            getMoney:'250',
           },{
            time:'2018-12-24 12:00',
            doneNum:'22',
            averageScore:"88",
            getMoney:'250',
           }
         ]
    }
  },
}
</script>

<style scoped>
.app-container{
  position: relative;
}
.card{
    background: #dddddd;
    padding: 5px;
}
.chakan{
    width: 100%;
}
.btn{
  position: relative;
  bottom: 1px;
  width: 100%;
  display: flex;
  flex-direction: row ;
  justify-content:space-between;
}
.btn1,.btn2{
    /* width: 50%; */
    height: 150px;
    flex: auto;
}
.van-tabbar-item--active{
   background: #1989
}

</style>
