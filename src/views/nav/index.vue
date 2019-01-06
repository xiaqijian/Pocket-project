<template>
  <div class="app-container">
     <div class="koudai-f">
        <div class="koudai-footer">
            <div class="left">
                <van-icon name="comment" />
            </div>
            <div class="right">
                <div>
                  推荐
                  <div class="nav-list">
                      <div>推荐</div>
                      <div>推荐</div>
                      <div>推荐</div>
                      <div>推荐</div>
                  </div>
                </div>
                <div>推荐</div>
                <div>推荐</div>
            </div>
        </div>
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

<style scoped lang="less" type="text/less">
.koudai-f {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.koudai-footer {
  width: 100%;
  display: flex;
  border-top:1px solid #333;
  border-bottom:1px solid #333;
  .left {
    width: 60px;
    text-align: center;
    line-height: 80px;
  }
  .right {
    flex: 1;
    display: flex;
    > div {
      flex: 1;
      line-height: 80px;
      text-align: center;
      border-left: 1px solid #333;
      position: relative;
      .nav-list {
         position: absolute;
         bottom: 80px;
         left: 0;
         width: 100%;
         > div {
           border: 1px solid red;
         }
      }
    }
  }
}
 
</style>
