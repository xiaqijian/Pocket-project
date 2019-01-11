<template>
  <div class="page">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :plugin="plugin" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :key="
          marker.id"  :position="marker.position" :events="marker.markderclick"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let self = this
      return {
       uid: 3,
       zoom: 12,
       center: [120.163936,30.254841],
       resdata: [],
       markers: [],
       plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    // self.center = [result.position.lng, result.position.lat]
                    self.$nextTick();
                  }
                });
              }
            }
          }]
      } 
    },
    mounted () {
       this.getdata()
       console.log('初始化')
    },
    updated () {
       console.log('初始化22222')    
    },
    components: {
 
    },
    methods: {
      // 请求数据
      getdata () {
        let that = this;
        this.$axios.get('pocket/wxchat/grabwol', { params: { 'uid': that.uid }})
          .then((res) => {
            console.log(res.data)
            that.getmark(res.data.data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 获取地图图标数据
      getmark (data) {
         let markder = []
         let that = this
         data.forEach(ele => {
            let id = ele.id
            markder.push({
              'id': ele.id,
              'position': [ele.longitude, ele.latitude],
              'markderclick': {
                click: (id) => {
                    console.log(ele.id)
                    that.$router.push({
                       path:'/orderdetail', 
                       query: {
                          id: ele.id
                       }})
                },
              }
            })
         });
         this.markers = markder
      }
    },
  }
</script>

<style scoped>
.page {
  height: 100%;
  width: 100%;
}
.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
