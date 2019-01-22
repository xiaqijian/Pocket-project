<template>
  <div class="app-container">
 <van-tabs swipeable color ="#68B6F7">
  <van-tab title="全部">
    
       <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>               
          <div class="myOrder" v-for="item in data" :key="item.id" @click="checkDetail">

              <van-panel  title=当前状态 :status=item.tag v-bind:class="[item.type==2?'blue':'','font-weight']">
                 <van-cell title="工单类型" value="英航订单" class="order-type"/>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="电饭锅" />
                <van-cell title="联系方式" value="1342352345" />
                <van-cell title="开始时间" value="2804-3-330" />
                <van-cell title="当前状态" value="正常" />
               
          <div slot="footer" v-if="item.type==2" class="footer" >
                <van-button size="small" @click.stop.prevent="call" >安全拨叫</van-button>
                <van-button size="small" @click.stop.prevent="urgency">催单</van-button>
                 <van-button size="small" @click.stop.prevent="finish" class="primary-but">确认完成</van-button>
           </div>

           <div slot="footer" v-if="item.type==3" class="footer" >
                <van-button size="small"  @click.stop.prevent="call" >安全拨叫</van-button>
                  <van-button size="small" @click.stop.prevent="complain" >申诉</van-button>
                   <van-button size="small" @click.stop.prevent="judge" class="primary-but">评价</van-button> 
           </div>
           <div slot="footer" v-if="item.type==4" class="footer" >
                  <van-button size="small" @click.stop.prevent="complain" >申诉</van-button>
           </div>
              </van-panel>
            
        
    </div>
     </van-list>
  </van-tab>

  <van-tab title="已下单">
          <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==1"  @click="checkDetail">
            
                 <van-panel title=当前状态 :status=item.tag>
                     <van-cell title="工单类型" value="0000" class="order-type"/>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
              
              </van-panel>
    </div>
  </van-tab>
  <van-tab title="处理中">
            <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==2"  @click="checkDetail">
                <van-panel  title=当前状态 :status=item.tag>
              <van-cell title="工单类型" value="0000" class="order-type"/>
              
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
                
          <div slot="footer" class="footer" >
                <van-button size="small" @click.stop.prevent="call">安全拨叫</van-button>
                <van-button size="small" @click.stop.prevent="urgency">催单</van-button>
                 <van-button size="small" @click.stop.prevent="finish" class="primary-but">确认完成</van-button>
           </div>
              </van-panel>
    </div>

  </van-tab>
  <van-tab title="待评价">
        <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==3"  @click="checkDetail">
                <van-panel  title=当前状态 :status=item.tag class="font-weight">
                  <van-cell title="工单类型" value="0000" class="order-type"/>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
           <div slot="footer" class="footer" >
                <van-button size="small"  @click.stop.prevent="call" >安全拨叫</van-button>
                  <van-button size="small" @click.stop.prevent="complain" >申诉</van-button>
                   <van-button size="small" @click.stop.prevent="judge" class="primary-but">评价</van-button> 
           </div>
              </van-panel>
    </div>
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
      id:42,
      // 查询状态 0：查询全部；2：进行中；5：已完成； -1： 查询异常
     status:0,
     //  查询页数
     pageSize:10,
     page:1,

      // type：1：已下单，2，已处理，3，待评价 4，已评价
      data:[
        {
          num:"2",
          tag:"已下单",
          price:"2.00",
          desc:"描述信息"  ,
          title:"商品标题",
          originPrice:"10.00",
          thumb:"http://yanxuan.nosdn.127.net/42b4ab968ae5b0f38e608131fb68a095.png",
          buttonType:1, 
          id:1,
          type:1

      },
       {
          num:"2",
          tag:"处理中",
          price:"2.00",
          desc:"描述信息"  ,
          title:"商品标题",
          originPrice:"10.00",
          thumb:"http://yanxuan.nosdn.127.net/42b4ab968ae5b0f38e608131fb68a095.png",
          buttonType:1,
           id:2,
            type:2

      },
       {
          num:"2",
          tag:"待评价",
          price:"2.00",
          desc:"描述信息"  ,
          title:"商品标题",
          originPrice:"10.00",
          thumb:"http://yanxuan.nosdn.127.net/42b4ab968ae5b0f38e608131fb68a095.png",
          buttonType:1,
           id:3,
            type:3

      },
       {
          num:"2",
          tag:"已评价",
          price:"2.00",
          desc:"描述信息"  ,
          title:"商品标题",
          originPrice:"10.00",
          thumb:"http://yanxuan.nosdn.127.net/42b4ab968ae5b0f38e608131fb68a095.png",
          buttonType:1,
           id:4,
            type:4

      }
      ]
    }
  },
  components: {

  },
  mounted(){
this.getCheckOrder();
  },
  methods:{
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
          this.$axios.get('pocket/wxchat/queryCustomerOwList', 
          { params: {'customerId': this.id,'status':this.status,'pageSize':this.pageSize,'page':this.page}})
      .then(res=>{ 
          console.log(res.data)
          if(res.data.data.length<=0){
             this.finished = true;
          }
      })
      .catch(err=>{
          this.$toast(err);
      })
    },
   call:function(){
    
              this.$dialog.confirm({
          title: '安全呼叫',
          message: '是否呼叫10086？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
   },
   urgency:function(){
       this.$dialog.alert({
      message: '请耐心等待，已为您催单！'
    });
   },
   finish:function(){
        this.$dialog.confirm({
          title: '确认完成',
          message: '是否确认完成订单？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
   },
   complain:function(){
       this.$dialog.confirm({
          title: '申诉',
          message: '是否申诉？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
   },
   checkDetail:function(){
     this.$router.push('/checkOrder')
    
   },
   judge:function(){
     this.$router.push('/serviceEvaluation')
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

