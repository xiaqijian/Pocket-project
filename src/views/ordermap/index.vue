<template>
  <div class="page">
    <div class="amap-wrapper">
      <el-amap class="amap-box" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :key="
          marker.id"  :position="marker.position"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
       zoom: 12,
       center: [120.163936,30.254841],
       markers: [
            {
              id:1,
              position: [120.163936,30.254841]
            },
            {
              id:2,
              position: [120.150143,30.257215]
            },
            {
              id:3,
              position: [120.172716,30.264629]
            }
          ]
      } 
    },
    mounted () {
      
    },
    components: {
 
    }
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
