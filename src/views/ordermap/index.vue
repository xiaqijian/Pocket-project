<template>
  <div class="page">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :plugin="plugin" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :key="
          marker.id" :text="text" :position="marker.position" :icon="marker.icon" :events="marker.markderclick"></el-amap-marker>
          <el-amap-text :text="marker.businessName" v-for="marker in markers" :key="
          marker.id + '-label'" :offset="offset" :position="marker.position" data-id="id"></el-amap-text>
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
                    self.center = [result.position.lng, result.position.lat]
                    self.$nextTick();
                  }
                });
              }
            }
          }]
      } 
    },
    mounted () {
       this.getuid()
       this.getdata()
       console.log('初始化')
    },
    
    updated () {
       console.log('初始化22222')    
    },
    components: {
 
    },
    methods: {
      getuid () {
        let uid = JSON.parse(localStorage.getItem('user'))
        this.uid = uid.user
      },
      // 请求数据
      getdata () {
        let that = this;
        this.$axios.get('pocket/wxchat/grabwol', { params: { 'uid': that.uid }})
          .then((res) => {
            console.log(res.data)
            that.getmark(res.data.data)
          })
          .catch((err) => {
             this.$toast(err);
            console.log(err)
          })
      },
      // 获取地图图标数据
      getmark (data) {
         let markder = []
         let that = this
         data.forEach(ele => {
            let id = ele.id
            let busid = ele.businessTypeId
            let icon = 'option.png'
            console.log(busid)
            if(busid == 4 || busid == 34) {
               icon = 'option1.png'
            }
            markder.push({
              'id': ele.id,
              'businessName': ele.businessName,
              'position': [ele.longitude, ele.latitude],
              'icon': require('@/assets/'+ icon +''),
              'markderclick': {
                click: (id) => {
                    console.log(ele.id)
                    that.$router.push({
                       path:'/orderservice', 
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
