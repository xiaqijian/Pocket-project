
<template>
  <div class="app-container">
    <van-tabs v-model="active" @click="changeactive">
        <van-tab title="全部">
          <ordervue :datas="datas"></ordervue>
        </van-tab>
        <van-tab title="待接单">
          <ordervue :datas="datas"></ordervue>
        </van-tab>
        <van-tab title="进行中">
          <ordervue :datas="datas"></ordervue>
        </van-tab>
        <van-tab title="完成">
          <ordervue :datas="datas"></ordervue>
        </van-tab>
    </van-tabs>
     
  </div>
</template>

<script>
import ordervue from '@/components/order'
export default {
  data () {
    return {
       datas: [],
       active: 0
    }
  },
  mounted () {
    this.getoption()
    this.getuid()
    this.getdata()
  },
  methods: {
    changeactive (index) {
       console.log(index)
    },
    getoption () {
      let that = this
       if(navigator.geolocation)
          {
              navigator.geolocation.getCurrentPosition(function(position){
                  // 获取成功
                  console.debug(position);
                  let latitude  = position.coords.latitude;
                  let longitude = position.coords.longitude;
                  that.updateLocation(longitude, latitude )
              }, function(err){
                  // 获取失败
                  console.debug(err);
              });
          }
          else
          {
              console.debug('不支持获取GPS地理位置');
          }
       
    },
    updateLocation (longitude, latitude) {
      let that = this
        this.$axios.get('pocket/wxchat/grabwolByDistance', { params: { 'uid': that.uid, 'longitude': longitude, 'latitude':latitude }})
      .then((res) => {
        console.log(res)
        // that.datas = res.data.data
      })
      .catch((err) => {
         this.$toast(err);
        console.log(err)
      })
    },
    getuid () {
      let uid = JSON.parse(localStorage.getItem('user'))
      this.uid = uid.user
    },
    // 分类获取工单列表
    getdata () {
     let that = this;
    this.$axios.get('pocket/wxchat/grabwolByDistance', { params: { 'uid': that.uid }})
      .then((res) => {
        console.log(res.data.data.dataResult)
        that.datas = res.data.data
      })
      .catch((err) => {
         this.$toast(err);
        console.log(err)
      })
   }
  },
  components: {
     ordervue
  }
}
</script>

<style lang="less" type="text/less" scoped>
.app-container {
  height: 100%;
  background: #efefef;
}
</style>
