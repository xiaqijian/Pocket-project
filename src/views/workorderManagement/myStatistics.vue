<template>
  <div class="app-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
       :offset="offset"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" class="card" :key="index">
        <van-cell title="时间" :value="item.time" size="large"/>
        <van-cell title="工单总数" :value="item.woCount" size="large"/>
        <van-cell title="平均服务分" :value="item.woScore" size="large" />
        <van-cell title="获得佣金" :value="item.woCommission" size="large" />
      </div>
    </van-list>
  </van-pull-refresh>
    <div class="btn">
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
        // this.getweekData(1);
        this.getuid()
  },
  methods:{
     getuid () {
      let uid = JSON.parse(localStorage.getItem('user'))
      this.uid = uid.user
    },
      //事件操作
      //按月查看数据
      getmouthData(page, pageSize =5){
        let that = this;
        let userID = this.uid;
        that.$axios.get('pocket/wxchat/statisticsMonth', 
          { params: { 
            'uid':userID,
            'page': page,
            'pageSize': pageSize
            }
          })
          .then(res=>{
            console.log(res.data)
             that.list = that.list.concat(res.data.data.dataResult) ;
             that.allDataYeshu = res.data.data.totalSize;
          })
          .catch(err=>{
              console.log(err)
              this.$toast('数据获取失败');
          })
     },
     //按周查看数据
      getweekData(page1, pageSize =5){
          let that = this;
          let userID = this.uid;
          that.$axios.get('pocket/wxchat/statisticsWeek', 
            { params: { 
              'uid':userID,
              'page': page1,
              'pageSize': pageSize
              }
            })
            .then(res=>{
              console.log(res.data)
              that.list = that.list.concat(res.data.data.dataResult) ;
              that.allDataYeshu = res.data.data.totalSize;
            })
            .catch(err=>{
                console.log(err)
                this.$toast('数据获取失败');
            })
      },
      clickchange(active){
        console.log(active);
        if(active ==1){
          //按月查看的数据
            // this.$toast('按月查看');
            this.list = [],
            this.getmouthData(1);

        }else{
          //按周查看的数据
            // this.$toast('按周查看');
            this.list = [],
            this.getweekData(1);
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
        let that = this;
        if(that.active == 1){
          setTimeout(() => {
          that.page = that.page +1;
          that.getmouthData(that.page);
          // 加载状态结束
          that.loading = false;
          // 数据全部加载完成  
          if (that.list.length >=  that.allDataYeshu) {
            that.finished = true;
          } 
        }, 500);
        }else{
          setTimeout(() => {
          that.page1 = that.page1 +1;
          that.getweekData(that.page1);
          // 加载状态结束
          that.loading = false;
          // 数据全部加载完成  
          if (that.list.length >=  that.allDataYeshu) {
            that.finished = true;
          } 
        }, 500);
        }
        
    },

  },
  data () {
    return {
       page:0,
       page1:0,
       active:0,
       uid: 3,
       isLoading: false,
       loading: false,
       finished: false,
       list:[],
       offset: 200,
       allDataYeshu:'',//总页数
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
