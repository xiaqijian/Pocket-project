<template>
    <div class="amap-page-container">
          <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :events="marker.markderclick"></el-amap-marker>
      </el-amap>
      <div class="addressbox">
          <van-field
          v-model="addressname"
          center
          disabled
          :label="searchOption.city"
          placeholder="请在地图上面搜索地址"
        >
    <van-button slot="button" size="small" type="primary" @click="goback">确定</van-button>
  </van-field>
      </div>
    </div>
  </template>

  <style scoped lang="less" type="text/less" >
    .addressbox {
      position: fixed;
      bottom: 0;
      width: 100%;
      box-shadow: 0 5px 21px 1px rgba(0,0,0,.15);
    }
    .amap-demo {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
      width: 100%;
      height: 100%;
      
    }

    /* 
     */
  </style>

  <script>

  export default {
      data () {
        return {
          addressname: '',
          markers: [

          ],
          searchOption: {
            city: '上海',
            citylimit: true
          },
          mapCenter: [121.59996, 31.197646],
          userdata: {
            'address': '',
            'longitude':'',
            'latitude':''
          }
        };
      },
      mounted () {
         let uiddata = JSON.parse(localStorage.getItem('uiddata'))
         this.searchOption.city = uiddata.area
      },
      methods: {
        goback () {
          localStorage.setItem('gomap', null)
          let userdata = localStorage.getItem('userdata')
          //  console.log()
          let userdatas = JSON.parse(userdata)
          userdatas.address = this.userdata.address
          userdatas.longitude = this.userdata.longitude
          userdatas.latitude = this.userdata.latitude
          localStorage.setItem('userdata', JSON.stringify(userdatas))
           this.$router.go(-1)
        },
        addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push({
              'position': [lng, lat],
              'markderclick': {
                click: (id) => {
                    console.log(id)
                }
              }
            })
        },
        onSearchResult(pois) {
          let self = this
          console.log(pois)
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push({
                'position': [poi.lng, poi.lat],
                'name': poi.name,
                'markderclick': {
                  click: (id) => {
                      console.log(poi.name)
                      self.addressname = poi.name
                      self.userdata.address = poi.name
                      self.userdata.longitude = poi.lng
                      self.userdata.latitude = poi.lat
                      console.log(id)
                  }
                }
              });
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        }
      }
    };
</script>