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
       zoom: 2,
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
    },
    components: {
 
    },
    methods: {
      // 请求数据
      getdata () {
        let that = this;
        this.$axios.get('pocket/wxchat/getWorkOrderStatus', { params: { 'uid': that.uid }})
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
         data.forEach(ele => {
            let id = ele.id
            markder.push({
              'id': ele.id,
              'position': [ele.longitude, ele.latitude],
              'markderclick': {
                mousedown: (id) => {
                     console.log(ele.id)
                    console.log(id);
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
