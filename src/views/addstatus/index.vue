<template>
  <div class="app-container">
      <van-tabs v-model="active" @click="clicktab"> 
        <van-tab title="全部">
           <statusvue :datas="datas"></statusvue>
        </van-tab>
        <van-tab title="进行中">
           <statusvue :datas="datas"></statusvue>
        </van-tab>
        <van-tab title="已竣工">
           <statusvue :datas="datas"></statusvue>
        </van-tab>
        <van-tab title="已完成">
           <statusvue :datas="datas"></statusvue>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import statusvue from '@/components/status'

export default {
  data () {
    return {
       active: 0,
       status: '',
       datas: []
    }
  },
  components: {
     statusvue
  },
  mounted() {
    this.getuid()
    this.getdata()
  },
  methods: {
    clicktab (index) {
      console.log(index)
      if (index === 0) {
        this.status = ''
        this.getdata()
      }else if (index === 1) {
        this.status = 2
        this.getdata()
      }else if (index === 2) {
        this.status = 3
        this.getdata()
      }else if(index === 3) {
        this.status = 6
        this.getdata()
      }
    },
    getuid () {
      // let uid = JSON.parse(localStorage.getItem('user'))
      let uid = JSON.parse(localStorage.getItem('uidid'))
      let uids = JSON.parse(localStorage.getItem('user'))
      if(!uid) {
         console.log('登录')
         this.uid = uids.user
      }else {
        console.log('22')
        this.uid = uid
      }
      
      // console.log(this.uid)
    },
    getdata (page = 1, pageSize =500  ) {
        let that = this;
        let userID = this.uid;
        that.$axios.get('pocket/wxchat/getWorkOrderStatusNew', 
          { params: { 
            'uid':userID,
            'page': page,
            'status': this.status,
            'pageSize': pageSize
            }
          })
          .then(res=>{
            console.log(res.data)
            //  that.list = that.list.concat(res.data.data.dataResult) ;
            //  that.allDataYeshu = res.data.data.totalSize;
            that.datas = res.data.data.dataResult
          })
          .catch(err=>{
              console.log(err)
              this.$toast('数据获取失败');
               this.$toast(err);
          })
    }
  }
}
</script>

<style scoped>
.app-container {
  background: #efefef;
  height: 100%;
}


 
</style>
<style>
.van-cell{
  background:transparent !important;
}
.primary-but{
   color: #68B6F7 !important;
   border:1px solid #68B6F7;
}
.van-tab--active,.col{
  color: #68B6F7 !important;
}
.van-panel__header .van-cell__value{
  color:#969799;
}
.blue .van-panel__header .van-cell__value{
   color: #EEB569;
}
.red .van-panel__header .van-cell__value{
   color: red;
}
.font-weight .van-panel__header .van-cell__title{
  font-weight:bolder;
}
.van-panel__header{
  border-bottom:1px solid #eee;
}
.order-type .van-cell__value span{
  display:inline-block;
  padding:0 10px;
/* width:50px; */
height:24px;
line-height:24px;
color:#fff;
background:rgba(144,202,250,1);
}
.van-tabs__line {
  background-color: #68B6F7 !important
}
</style>


