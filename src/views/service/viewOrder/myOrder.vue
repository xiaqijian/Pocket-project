<template>
  <div class="app-container">
 <van-tabs swipeable color ="#68B6F7" @click="onClick">
  <van-tab title="全部" >
    
       <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>               
          <div class="myOrder" v-for="item in data" :key="item.id" >

            <van-panel  title=当前状态 :status='item.statudDesc'  v-bind:class="[item.status==2?'blue':'','font-weight',item.status==4?'red':'',]">    
            <div>
                  <van-cell title="工单类型" :value="item.businessName" class="order-type" />
            </div>
            
            <van-cell title="工单编码" :value="item.workOrderCode" />
            <van-cell title="业务员" :value="item.customerName"/>
            <van-cell title="联系方式" :value="item.customerMobile" />
            <van-cell title="开始时间" :value="item.addTime" />
            <van-cell title="竣工时间" :value="item.modifierTime" />
                  <van-cell value=""  is-link @click="checkDetail(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看详情</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="checkProgress(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">订单跟踪</van-tag>
                  </template>
                  
                </van-cell>
          <div slot="footer" v-if="item.status==2" class="footer" >
                <van-button size="small" @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
          </div>

           <div slot="footer" v-if="item.status==5" class="footer" >
                <van-button size="small"  @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
                  
           </div>
           <div slot="footer" v-if="item.status==3" class="footer" >
               <van-button size="small" @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
              <van-button size="small" @click.stop.prevent="judge(item.id)" class="primary-but">评价</van-button> 
                  <van-button size="small" @click.stop.prevent="complain(item.id,item.status)" >申诉</van-button>
           </div>
              </van-panel> 
            
        
    </div>
     </van-list>
  </van-tab>

  <van-tab title="已下单">
           <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >  
          <div class="myOrder" v-for="item in data" :key="item.id">
                   <van-panel title=当前状态 :status='item.statudDesc' class="font-weight">
                
                <div>
                  <van-cell title="工单类型" :value="item.businessName" class="order-type" />
                </div>                  
                <van-cell title="工单编码" :value="item.workOrderCode" />
                <van-cell title="业务员" :value="item.customerName"  />
                <van-cell title="联系方式" :value="item.customerMobile"  />
                <van-cell title="开始时间" :value="item.addTime" />
              <van-cell title="竣工时间" :value="item.modifierTime" />
                <van-cell value=""  is-link @click="checkDetail(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看详情</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="checkProgress(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">订单跟踪</van-tag>
                  </template>
                  
                </van-cell>
              
              </van-panel>
                
    </div>
     </van-list>
  </van-tab>
  <van-tab title="处理中">
               <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>  
            <div class="myOrder" v-for="item in data" :key="item.id">
                  <van-panel  title=当前状态 :status='item.statudDesc' class="font-weight">
              <div>
                  <van-cell title="工单类型" :value="item.businessName" class="order-type" />
            </div>
              
                <van-cell title="工单编码" :value="item.workOrderCode" />
                <van-cell title="业务员" :value="item.customerName" />
                <van-cell title="联系方式" :value="item.customerMobile"  />
                <van-cell title="开始时间" :value="item.addTime" />
                <van-cell title="竣工时间" :value="item.modifierTime" />
                  <van-cell value=""  is-link @click="checkDetail(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看详情</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="checkProgress(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">订单跟踪</van-tag>
                  </template>
                  
                </van-cell>
                
          <div slot="footer" class="footer" >
                <van-button size="small" @click.stop.prevent="call(item.userMobile)">安全拨叫</van-button>
                <!-- <van-button size="small" @click.stop.prevent="urgency">催单</van-button> -->
                 <!-- <van-button size="small" @click.stop.prevent="finish(item.id,item.status)" class="primary-but">确认完成</van-button> -->
           </div>
              </van-panel>
              
    </div>
 </van-list>
  </van-tab>
  <van-tab title="待评价">
       <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>  
        <div class="myOrder" v-for="item in data" :key="item.id" >
                 <van-panel  title=当前状态 :status='item.statudDesc' class="font-weight">
          <div>
                  <van-cell title="工单类型" :value="item.businessName" class="order-type" />
            </div>
              
                <van-cell title="工单编码" :value="item.workOrderCode" />
                <van-cell title="业务员" :value="item.customerName" />
                <van-cell title="联系方式" :value="item.customerMobile"  />
                <van-cell title="开始时间" :value="item.addTime" />
                <van-cell title="竣工时间" :value="item.modifierTime" />
                  <van-cell value=""  is-link @click="checkDetail(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">查看详情</van-tag>
                  </template>
                  
                 </van-cell>
                 <van-cell value=""  is-link @click="checkProgress(item.id)">
                  <template slot="title">
                    <van-tag color="#68B6F7">订单跟踪</van-tag>
                  </template>
                  
                </van-cell>
           <div slot="footer" class="footer" >
                <van-button size="small"  @click.stop.prevent="call(item.userMobile)" >安全拨叫</van-button>
                  <!-- <van-button size="small" @click.stop.prevent="complain(item.id)" >申诉</van-button> -->
                   <!-- <van-button size="small" @click.stop.prevent="judge" class="primary-but">评价</van-button>  -->
           </div>
              </van-panel>
               
    </div>
     </van-list>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 客户ID
      customerId:'',
      // 详情id
      id:'',
      // 查询状态 0：查询全部；2：进行中；5：已完成； -1： 查询异常
     status:0,
     //  查询页数
     pageSize:4,
     page:1,

      // type：1：已下单，2，已处理，3，待评价 4，已评价
      data:''
   
    }
  },
  components: {

  },
  mounted(){
    this.customerId = localStorage.getItem('customerId');
this.getCheckOrder();
  },
  methods:{
    //tab切换请求数据
    onClick(index, title) {
      if(index==0){//全部
    this.status=0
      } else if(index==1){//进行中
      this.status=2
      }else if(index==2){ //已完成
         this.status=5
      }else if(index==3){//待评价
        this.status=3
      }
      this.getCheckOrder();
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.page++;
        }
        // 加载状态结束
        this.loading = false;

        // // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 500);
    },
    getCheckOrder(){
          this.$axios.get('pocket/wxchatc/queryCustomerOwList', 
          { params: {
            'customerId': this.customerId,
            'status':this.status,
            'pageSize':this.pageSize,
            'page':this.page
            }})
      .then(res=>{ 
          console.log(res.data)
          this.data = res.data.data;
          if(res.data.data.length<=4){
             this.finished = true;
          }
      })
      .catch(err=>{
          this.$toast(err);
      })
    },
    //修改工单状态接口
    changeOrderStatus(id,status){
      console.log(id,status)
      this.$axios.get('pocket/wxchat/customerWoUpdate', 
          { params: {
            'workOrderId':id,
            'status':status,
            'customerId':this.customerId,
            'evaluation':'',
            }})
      .then(res=>{ 
          console.log(res.data)
          if(res.data.code==200){
            
          }else{
             this.$toast(res.data.msg);
          }
      })
      .catch(err=>{
          this.$toast(err);
      })
    },
    //申诉
    woErr(id,status){
this.$axios.get('pocket/wxchat/customerWoError', 
          { params: {
            'workOrderId':id,
            'status':status,
            'customerId':this.customerId
            }})
      .then(res=>{ 
          console.log(res.data)
          if(res.data.code==200){
            
          }else{
             this.$toast(res.data.msg);
          }
      })
      .catch(err=>{
          this.$toast(err);
      })
    },
   call:function(phone){
    
              this.$dialog.confirm({
          title: '安全呼叫',
          message: '是否呼叫'+phone+'?'
        }).then(() => {
          // on confirm
          window.location.href = "tel:" + phone;;
        }).catch(() => {
          // on cancel
        });
   },
   urgency:function(){
       this.$dialog.alert({
      message: '请耐心等待，已为您催单！'
    });
   },
   finish:function(id,status){
        this.$dialog.confirm({
          title: '确认完成',
          message: '是否确认完成订单？'
        }).then(() => {
          // on confirm
           this.changeOrderStatus(id,status)
        }).catch(() => {
          // on cancel
        });
   },
   complain:function(id,status){
       this.$dialog.confirm({
          title: '申诉',
          message: '是否申诉？'
        }).then(() => {
          // on confirm
           this.woErr(id,status)
        }).catch(() => {
          // on cancel
          
        });
   },
   checkDetail(id){
 this.$router.push({name:'bussinessDetail',params:{id:id}})
   },
   checkProgress:function( id){
    
     this.$router.push({name:'checkOrder',params:{id:id}})
    
   },
   judge:function(id){
     this.$router.push({name:'serviceEvaluation',params:{id:id}})
      
   }
  }
}
</script>

<style scoped>

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
<style>
.van-cell{
  background:transparent !important;
}
.primary-but{
   color: #68B6F7 !important;
   border:1px solid #68B6F7;
}
.van-tab--active,.col{
  color: #68B6F7 !important;
}
.van-panel__header .van-cell__value{
  color:#969799;
}
.blue .van-panel__header .van-cell__value{
   color: #EEB569;
}
.red .van-panel__header .van-cell__value{
   color: red;
}
.font-weight .van-panel__header .van-cell__title{
  font-weight:bolder;
}
.van-panel__header{
  border-bottom:1px solid #eee;
}
.order-type .van-cell__value span{
  display:inline-block;
  padding:0 10px;
/* width:50px; */
height:24px;
line-height:24px;
color:#fff;
background:rgba(144,202,250,1);
}
</style>

