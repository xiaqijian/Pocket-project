
<template>
  <div class="app-container">
      <div class="cardbox" v-for="item in datas" :key="item.id">
         <van-card>
          <div slot="title" class="titlebox" >
             <div style="font-size: 16px;">
                 售后-维修
             </div>
             <div class="juli">3km</div>
             
          </div>
          <div slot="thumb" class="thumbbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <img src="/static/logo.jpg" alt="">
            </div>
             <div slot="tags" class="tagsbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <div class="tagsboxitem">
                   <div>联系人：马化腾</div>
                   <div>联系方式：1506887110110</div>
                   <div>地址：浙江省杭州市西湖区西溪银泰城</div>
                </div>
            </div>
            <div slot="footer">
              <!-- <van-button size="mini">按钮</van-button> -->
              <van-button size="mini" type="danger">抢单</van-button>
            </div>
          </van-card>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       datas: [
         {
           id:1
         },
          {
           id:2
         },
         {
           id:3
         },
         {
           id:4
         },
         {
           id:5
         },
         {
           id:6
         },
         {
           id:7
         }
       ]
    }
  },
  mounted () {
    
  },
  methods: {
   
  },
  components: {

  }
}
</script>

<style lang="less" type="text/less" scoped>
.app-container {
  height: 100%;
  background: #efefef;
}
.cardbox {
  font-size: 12px;
  // box-shadow: 0 5px 21px 1px rgba(0,0,0,.15);
  margin-bottom: 20px;
  .thumbbox {
    // border: 1px solid red;
    width: 160px;
    height: 160px;
    border-radius: 20px;
    overflow: hidden;
    
  }
  .titlebox {
     display: flex;
     > div {
       flex: 1;
     }
     .juli {
       text-align: right;
       padding: 6px 0px;
     }
  }
  .tagsbox {
     padding-top: 20px;
    //  .tagsboxitem {
    //   //  display: flex;
    //  }
  }
}


</style>
