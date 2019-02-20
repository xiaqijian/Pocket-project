<template>
  <div class="app-container" id="sendOut">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
       <div class="cardbox" v-for="item in list" :key="item.id">
         <van-card>
          <div slot="title" class="titlebox" >
             <div style="font-size: 16px;" class="textname">
                 {{item.businessName}}
              </div>
             <!-- <div class="juli"> {{item.distance | toFixedone }}</div> -->
          </div>
          <div slot="thumb" class="thumbbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <img src="/static/logo.jpg" alt="">
            </div>
             <div slot="tags" class="tagsbox">
              <!-- <van-button size="mini">按钮</van-button> -->
                <div class="tagsboxitem">
                   <div>联系人：{{item.operator}}</div>
                   <div>联系方式：{{item.customerMobile}}</div>
                   <div>地址：{{item.province + item.area + item.address}}</div>
                </div>
            </div>
            <div slot="footer">
              <!-- <van-button size="mini">按钮</van-button> -->
              <van-button size="mini" :type="item.status | getstatus" @click="clickserver(item.id)">{{item.statudDesc}}</van-button>
            </div>
          </van-card>
      </div>

    </van-list>
  </div>
</template>

<script>
export default {
  mounted(){
     this.getuid()
    //  this.getdata(1)
  },
  filters: {
     getstatus (value) {
       if(value == 5) {
         return 'primary'
       }else if(value == 4 ) {
         return 'danger'
       }else {
         return 'warning'
       }
     }
  },
  methods:{
     getuid () {
      // let uid = JSON.parse(localStorage.getItem('user'))
      let uid = JSON.parse(localStorage.getItem('uidid'))
      let uids = JSON.parse(localStorage.getItem('user'))
      if(!uid) {
         console.log('登录')
         this.uid = uids.user
      }else {
        console.log('22')
        this.uid = uid
      }
      
      // console.log(this.uid)
    },
      clickserver (id) {
          this.$router.push({ path: 'orderservice', query: { id: id }})
      },
      onLoad() {
      // 异步更新数据
      let that = this
      setTimeout(() => {
        that.page = that.page +1 
        that.getdata(that.page)
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成  
        if (that.list.length >=  that.allDataYeshu) {
          that.finished = true;
        }
      }, 500);
    },
    callphone:function($event,item){
      let that = this;
      let phone = item.userMobile;
      let str1 =" tel://";
      let str2 = phone.toString()
      console.log(phone);
      window.location.href = str1.concat(str2);
    },
    getdata (page, pageSize =5  ) {
        let that = this;
        let userID = this.uid;
        that.$axios.get('pocket/wxchat/getWorkOrderStatus', 
          { params: { 
            'uid':userID,
            'page': page,
            'pageSize': pageSize
            }
          })
          .then(res=>{
            console.log(res.data)
             that.list = that.list.concat(res.data.data.dataResult) ;
             that.allDataYeshu = res.data.data.totalSize;
          })
          .catch(err=>{
              console.log(err)
              this.$toast('数据获取失败');
               this.$toast(err);
          })
    }
  },
  data () {
    return {
      list: [],
      uid: 3,
      loading: false,
      finished: false,
      offset: 10,
      page:0 ,
      allDataYeshu:'',//总页数
    }
  },
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

.loading {
  text-align: center;
  padding: 20px;
}
.tbn {
  background: #d1d1d1;
  padding: 10px;
}

</style>
