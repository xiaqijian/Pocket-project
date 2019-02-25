
<template>
  <div class="app-container">
     <div class="nodata" v-show="datas.length === 0">没有数据</div>
      <div class="cardbox" v-for="item in datas" :key="item.id" @click="todatail(item.id)">
         <van-card>
          <div slot="title" class="titlebox" >
             <div style="font-size: 16px;" class="textname">
                 {{item.businessName}}
              </div>
             <div class="juli"> {{item.distance | toFixedone }}</div>
          </div>
          <div slot="thumb" class="thumbbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <img src="/static/logo.jpg" alt="">
            </div>
             <div slot="tags" class="tagsbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <div class="tagsboxitem">
                   <div>联系人：{{item.customerName}}</div>
                   <div>联系方式：{{item.customerMobile}}</div>
                   <div>地址：{{item.province + item.area + item.address}}</div>
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
       datas: []
    }
  },
  mounted () {
    this.getoption()
    this.getuid()
    this.getdata()
    
  },
  filters: {
     toFixedone (value) {
       if(value > 1000) {
          let val = value/1000
          let text = val.toFixed(1) + 'km'
          return text
       }else {
          return value + 'm'
       }
     }
  },
  methods: {
    getoption () {
      let that = this
       if(navigator.geolocation)
          {
              navigator.geolocation.getCurrentPosition(function(position){
                  // 获取成功
                  console.debug(position);
                  let latitude  = position.coords.latitude;
                  let longitude = position.coords.longitude;
                  that.updateLocation(longitude, latitude )
              }, function(err){
                  // 获取失败
                  console.debug(err);
              });
          }
          else
          {
              console.debug('不支持获取GPS地理位置');
          }
       
    },
    updateLocation (longitude, latitude) {
      let that = this
        this.$axios.get('pocket/wxchat/grabwolByDistance', { params: { 'uid': that.uid, 'longitude': longitude, 'latitude':latitude }})
      .then((res) => {
        console.log(res)
        // that.datas = res.data.data
      })
      .catch((err) => {
         this.$toast(err);
        console.log(err)
      })
    },
    getuid () {
      let uid = JSON.parse(localStorage.getItem('user'))
      this.uid = uid.user
    },
    getdata () {
     let that = this;
    this.$axios.get('pocket/wxchat/grabwolByDistance', { params: { 'uid': that.uid }})
      .then((res) => {
        console.log(res.data.data.dataResult)
        that.datas = res.data.data
      })
      .catch((err) => {
         this.$toast(err);
        console.log(err)
      })
   },
   todatail (id) {
     let that = this
      that.$router.push({
        path:'/orderservice', 
        query: {
          id: id
      }})
   }
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
  box-shadow: 0 5px 21px 1px rgba(0,0,0,.15);
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
      //  flex: 1;
     }
     .textname {
       flex: 1;
     }
     .juli {
       text-align: right;
       padding: 6px 0px;
       width: 70px;
     }
  }
  .tagsbox {
     padding-top: 20px;
    //  .tagsboxitem {
    //   //  display: flex;
    //  }
  }
}
.nodata {
  text-align: center;
  padding: 20px;
}


</style>
