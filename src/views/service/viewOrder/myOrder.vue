<template>
  <div class="app-container">
 <van-tabs>
  <van-tab title="全部">
     <div class="myOrder" v-for="item in data" :key="item.id" @click="checkDetail">
              <van-panel   icon="orders-o"  title=业务状态 :status=item.tag>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
                <van-cell title="工单类型" value="0000" />
          <div slot="footer" v-if="item.type==2" class="footer" >
                <van-button size="small" @click.stop.prevent="call" type="primary">安全拨叫</van-button>
                <van-button size="small" @click.stop.prevent="urgency" type="warning">催单</van-button>
                 <van-button size="small" @click.stop.prevent="finish"  type="danger">确认完成</van-button>
           </div>

           <div slot="footer" v-if="item.type==3" class="footer" >
                <van-button size="small"  @click.stop.prevent="call" type="primary">安全拨叫</van-button>
                  <van-button size="small" @click.stop.prevent="complain" type="warning">申诉</van-button>
                   <van-button size="small" @click.stop.prevent="judge" type="danger">评价</van-button> 
           </div>
           <div slot="footer" v-if="item.type==4" class="footer" >
                  <van-button size="small" @click.stop.prevent="complain" type="warning">申诉</van-button>
           </div>
              </van-panel>
    </div>
  </van-tab>

  <van-tab title="已下单">
          <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==1"  @click="checkDetail">
                 <van-panel  icon="orders-o" title=业务状态 :status=item.tag>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
                <van-cell title="工单类型" value="0000" />
              </van-panel>
    </div>
  </van-tab>
  <van-tab title="处理中">
            <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==2"  @click="checkDetail">
                <van-panel  icon="orders-o" title=业务状态 :status=item.tag>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
                <van-cell title="工单类型" value="0000" />
          <div slot="footer" class="footer" >
                <van-button size="small" @click.stop.prevent="call">安全拨叫</van-button>
                <van-button size="small" @click.stop.prevent="urgency">催单</van-button>
                 <van-button size="small" @click.stop.prevent="finish">确认完成</van-button>
           </div>
              </van-panel>
    </div>

  </van-tab>
  <van-tab title="待评价">
        <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==3"  @click="checkDetail">
                <van-panel  icon="orders-o" title=业务状态 :status=item.tag>
                <van-cell title="工单编码" value="0000" />
                <van-cell title="客户姓名" value="0000" />
                <van-cell title="联系方式" value="0000" />
                <van-cell title="开始时间" value="0000" />
                <van-cell title="当前状态" value="0000" />
           <div slot="footer" class="footer" >
                <van-button size="small"  @click.stop.prevent="call" type="primary">安全拨叫</van-button>
                  <van-button size="small" @click.stop.prevent="complain" type="warning">申诉</van-button>
                   <van-button size="small" @click.stop.prevent="judge" type="warning">评价</van-button> 
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
  methods:{
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
.footer{
  text-align: end;
}
.myOrder{
 
  width: 90%;
  margin: auto;
   margin-top: 20px; 
   border: 2px solid #eeeeee;
   border-radius: 6px;
   box-shadow:#e5e5e5 1px 3px 6px 3px;
}
.van-card{
   background: #Feee90;
    border-radius: 10px;
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
