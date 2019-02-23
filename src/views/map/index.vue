<template>
  <div class="page">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :plugin="plugin" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker :position="position"></el-amap-marker>
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
       text: '维修',
       offset: [10, -50],
       center: [120.163936,30.254841],
       position: [],
       positions: [],
       resdata: [],
       markers: [],
       plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  console.log(status)
                  console.log(result)
                  if (result && result.position) {
                    // self.center = self.positions
                    // self.position = self.positions
                    self.$nextTick();
                  }
                });
              }
            }
          }]
      } 
    },
    mounted () {
       let res = this.$route.query
       this.positions = [parseFloat(res.longitude), parseFloat(res.latitude)]
       this.center = [this.positions[0], this.positions[1]]
       this.position = [this.positions[0], this.positions[1]]
       console.log(this.positions)
    },
    
    updated () {
       console.log('初始化22222')    
    },
    components: {
 
    },
    methods: {
      getuid () {
        
      },
      // 请求数据
      getdata () {
        
      },
      // 获取地图图标数据
      getmark (data) {
         
      }
    },
  }
</script>

<style>
.page {
  height: 100%;
  width: 100%;
}
.amap-wrapper {
  width: 100%;
  height: 100%;
}
.amap-overlay-text-container {
  color: red!important;
  border: none!important;
}
</style>
