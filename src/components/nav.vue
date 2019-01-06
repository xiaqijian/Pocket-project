<template>
  <div class="app-container">
     <div class="koudai-f">
        <div class="koudai-footer">
            <div class="left">
                <van-icon name="comment" />
            </div>
            <div class="right">
                <div v-for="item in datanav.navs" :key="item.id">
                  <router-link :to="item.link"> 
                    <div @click="clicknav(item.id)">
                         {{item.name}}
                    </div>
                  </router-link>
                  <div class="nav-list" v-show="id === item.id">
                      <div v-for="itemlist in item.navlist" :key="itemlist.id"><router-link :to="itemlist.link"> {{itemlist.name}}</router-link></div>
                  </div>
                </div>
                
            </div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  props: ['datanav'],
  data () {
    return {
       id: 0
    }
  },
  components: {

  },
  methods: {
    clicknav (id) {
      this.id = id
    }
  },
}
</script>

<style scoped lang="less" type="text/less">
a {
  color: #333;
}
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
         border-left: 1px solid #333;
         border-right: 1px solid #333;
         > div {
           border-top: 1px solid #333;
         }
      }
    }
  }
}
 
</style>
