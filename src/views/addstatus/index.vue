<template>
  <div class="app-container" id="sendOut">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :offset="offset"
    @load="onLoad"
  >
   <div v-for= "(item,index) in list" class="card">
          <div slot="footer">
            <van-cell title="工单编码:" :value="item.workOrderCode" size="large"/>
            <van-cell title="客户姓名:" :value="item.customerName" size="large"/>
            <van-cell title="联系方式:" :value="item.customerMobile" is-link @click="callphone($event,item)" size="large"/>
            <van-cell title="开始时间:" :value="item.addTime" size="large"/>
            <van-cell title="当前状态:" :value="item.statudDesc" size="large"/>
            <van-cell  title="工单类型:" :value="item.businessName"  size="large">  
                <!-- <div v-if="item.status ==1">
                  <van-tag type="primary" size="large">正常</van-tag>
                </div>
                <div  v-if="item.status ==2">
                  <van-tag type="danger" size="large">关闭</van-tag>
                </div> -->
            </van-cell>
          </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  mounted(){
      // this.getdata(1)
  },
  methods:{
      onLoad() {
      // 异步更新数据
      let that = this
      setTimeout(() => {
        that.page = that.page +1 
        that.getdata(that.page)
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成  
        if (that.list.length >=  that.allDataYeshu) {
          that.finished = true;
        }
      }, 500);
    },
    callphone:function($event,item){
      let that = this;
      let phone = item.userMobile;
      let str1 =" tel://";
      let str2 = phone.toString()
      console.log(phone);
      window.location.href = str1.concat(str2);
    },
    getdata (page, pageSize =5  ) {
        let that = this;
        let userID = 3;
        that.$axios.get('pocket/wxchat/getWorkOrderStatus', 
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
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: 10,
      page:0 ,
      allDataYeshu:'',//总页数
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
