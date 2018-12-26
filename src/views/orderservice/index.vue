<template>
  <div class="page">
      <div>
          <van-panel title="标题" desc="描述信息" status="状态">
            <div>内容</div>
          </van-panel>
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
  background: #efefef;
}
.van-panel__header .van-cell__value {
    color: blue
}
 
</style>
