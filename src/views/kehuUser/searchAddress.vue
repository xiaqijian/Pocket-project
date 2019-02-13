<template>
  <div class="app-container">
          <div class="searchCity">
          <div class="position">{{searchOption.city}}</div>
        <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult">
         
       </el-amap-search-box>
                <!-- <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              @search="onSearch"
            > -->

              <!-- <div slot="action" @click="onSearch">搜索</div> -->
            <!-- </van-search> -->
                </div>
                
                <div :style="{width:'100%',height:'100%'}">

         <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
           <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index" :events="marker.markderclick">

           </el-amap-marker>
      </el-amap>
                      <!-- <div class="amap-page-container">
                <div :style="{width:'100%',height:'300px'}">
                  <el-amap vid="amap" :plugin="plugin" class="amap-box" :zoom="zoom" :center="center">
                  </el-amap>
                </div>
              </div> -->
          </div>

     
      <!-- <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
       
      </el-amap> -->
          
  </div>
</template>

<script>
export default {
  data () {
const self = this;
    return { 
           value:'',
            mapCenter: [120.163936,30.254841],
            lng: 0,
            lat: 0,
             zoom: 12,
            loaded: true,
             searchOption: {
            city:'',
            citylimit: true
          },
          address:'',
          //  mapCenter: [121.59996, 31.197646],
          markers:[]
            
          
          }
  },
  mounted(){
   
    
    this.searchOption.city = this.$route.params.city;
     this.address =  this.searchOption.city ;
    console.log(this.searchOption.city)
     //  请求地址经纬度
    this.getGeocode();
  },
  components: {
     
  },

  methods: {
    getGeocode(){
    this.$axios.get('https://restapi.amap.com/v3/geocode/geo',
    {params:{
      key:'0355edd906a57778adc658708e9401a6',
      address:this.address
    }}).then(res=>{
      this.mapCenter = res.data.geocodes[0].location;
      console.log(res.data.geocodes[0].location)
      var str = res.data.geocodes[0].location;
      let ln = str.split(',')[0];
      let la=str.split(',')[1];
       this.mapCenter = [ln,la];
      self.loaded = true;
    console.log(res)
    }).catch(err=>{
      this.$toast(err);
    })
    },
    addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push({
            'position':[lng, lat]
          });
        },
        
   onSearchResult(pois) {
    //  debugger
     console.log(pois)
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push({
                'position':[poi.lng, poi.lat],
                'markderclick': {
                click: (id) => {
                console.log(poi.lng,poi.lat);
                let that = this;
                //1代表从搜索跳转到添加
                sessionStorage.setItem('status',1);
                let data = localStorage.getItem('data');
                data = JSON.parse(data)
                data.lng = poi.lng;
                data.lat = poi.lat;
                data.address = poi.name;
                localStorage.setItem('data',JSON.stringify(data));
                // that.$router.push('addStore');
                this.$router.go(-1)
                },
              }
            })
            });
            console.log(this.markers,33);
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        }
  
  },
}
</script>

<style scoped lang="less" type="text/less">
.app-container{
    height: 100%;
    width: 100%;
    background: rgb(242, 242, 242);
    .searchCity{
        display: flex;
        align-items: center;
        width: 100%;
        background: #ffffff;
        position: absolute;
        z-index: 10000;
        .el-vue-search-box-container{
            width: 78%;
    
        }

    }
}
 .position{
     flex: 1;
     padding: 7px 15px;
     line-height: 1;
     text-align: center;
    //  height: 45px;
    //  line-height: 45px;
 }
 .van-search--show-action{
     flex: 9;
 }
</style>
<style>
        .el-vue-search-box-container .search-tips {
                position: absolute;
                border: 1px solid #dbdbdb;
                background: #fff;
                overflow: auto;
                width: 129.5%;
                left: -30%;
                top: 780px !important;
                /* max-height: 300px; */
}
</style>

