<template>
  <div class="app-container">
     <!-- 工单状态组件 -->
        
         <div v-show="datas.length == 0" class="loding">没有更多了</div>
          <div class="myOrder" v-for="item in datas" :key="item.id" >

            <van-panel  title='当前状态' :status='item.statudDesc'  v-bind:class="[item.status==2?'blue':'','font-weight',item.status==4?'red':'',]">    
            <div>
                  <van-cell title="工单类型" :value="item.businessName" class="order-type" />
            </div>
            
            <van-cell title="工单编码" :value="item.workOrderCode" />
            <van-cell title="客户" :value="item.customerName"/>
            <van-cell title="联系方式" :value="item.customerMobile" />
            <van-cell title="地址" :value="item.address" @click="gotomap(item.latitude, item.longitude)">
                <van-icon slot="right-icon" name="location" class="location-icon" />
            </van-cell>
            <van-cell title="开始时间" :value="item.addTime" />
            <van-cell title="竣工时间" :value="item.completionTime" />
                  <van-cell value=""  is-link @click="checkDetail(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看详情</van-tag>
                  </template>
                  
                 </van-cell>
                 <!-- <van-cell value=""  is-link @click="checkProgress(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">订单跟踪</van-tag>
                  </template>
                  
                </van-cell> -->
          <!-- <div slot="footer" v-if="item.status==2" class="footer" >
                <van-button size="small" @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
          </div> -->

           <!-- <div slot="footer" v-if="item.status==5" class="footer" >
                <van-button size="small"  @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
                  
           </div> -->
           <!-- <div slot="footer" v-if="item.status==3||item.status==5" class="footer" > -->
               <!-- <van-button size="small" @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button> -->
                <!-- <van-button size="small" class="primary-but" v-if="item.status==3" @click="changeOrderStatus(item.id,item.status)">确认完成</van-button> -->
                <!-- <van-button size="small" @click.stop.prevent="judge(item.id,item.status)" class="primary-but"  v-if="item.status==5">待评价</van-button>  -->
                  <!-- <van-button size="small" @click.stop.prevent="complain(item.id,item.status)" >申诉</van-button> -->
           <!-- </div> -->
              </van-panel> 
            
        
    </div>
     <!-- </van-list> -->
  </div>
</template>

<script>
export default {
  props: ['datas'],
  data () {
    return {
       loading: false,
       finished: false
    }
  },
  mounted() {
    // this.getdata()
  },
  components: {

  },
  methods: {
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    checkDetail (id) {
      let that = this
      that.$router.push({
        path:'/orderservice', 
        query: {
          id: id
      }})
    },
    gotomap (latitude, longitude) {
     let that = this
      that.$router.push({
        path:'/map', 
        query: {
          latitude,
          longitude,
          isBind: 'y'
      }})
   }
  },
}
</script>

<style scoped>
.loding {
  text-align: center;
  padding: 20px;
}
.cardbox {
  box-shadow: 0 5px 21px 1px rgba(0,0,0,.15);
  /* // margin-bottom: 20px; */
  margin-top: 20px;
}
 

.van-tab--active{
  color: #68B6F7;
}

.van-button--small{
  border-radius: 15px;
}
.van-tab{
  background-color: #eeeeee !important;
}
.van-tabs__nav{
  background: transparent;
}
.app-container{
  background: #eeeeee;
  height: 100%;
  overflow-y: auto;
}
.footer{
  text-align: end;
}
.myOrder{
  margin: auto;
   margin-top: 20px; 
   border: 2px solid #eeeeee;
   background:#fff;
   box-shadow:#e5e5e5 1px 3px 6px 3px;
}
.van-card{
   background: #Feee90;
    border-radius: 10px;
}

.van-cell,.van-panel,.van-cell-group,.van-panel__header,.myOrder .van-cell{
  background: transparent !important;
  background-color: transparent;
}
.van-button--mini{
  border-radius: 4px;
  /* padding: 4px 6px; */
  width: 60px;
}
.tagInstro{
  position: absolute;
  right: 0;
  top: 10px;
}

</style>