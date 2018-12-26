<template>
  <div class="page">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
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
