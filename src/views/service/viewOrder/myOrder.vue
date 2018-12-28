<template>
  <div class="app-container">
 <van-tabs>
  <van-tab title="全部">
     <div class="myOrder" v-for="item in data" :key="item.id" @click="checkDetail">
                  <van-card 
                    :num=item.num
                    :tag=item.tag
                    :price=item.price
                    :desc=item.desc  
                    :title=item.title
                    :origin-price=item.originPrice
                    :thumb="item.thumb"
                 >
                <div slot="footer" v-if="item.type==2">
                <van-button size="mini" @click.stop.prevent="call">安全拨叫</van-button>
                <van-button size="mini" @click.stop.prevent="urgency">催单</van-button>
                 <van-button size="mini" @click.stop.prevent="finish">确认完成</van-button>
                  </div>

                   <div slot="footer" v-if="item.type==3">
                <van-button size="mini"  @click.stop.prevent="call">安全拨叫</van-button>
                  <van-button size="mini" @click.stop.prevent="complain">申诉</van-button>
                   <van-button size="mini" @click.stop.prevent="judge">评价</van-button>
                 
                  
                  </div>

                   <div slot="footer" v-if="item.type==4">
                  <van-button size="mini" @click.stop.prevent="complain">申诉</van-button>
                  </div>
          </van-card>
          
    </div>
  </van-tab>

  <van-tab title="已下单">
          <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==1"  @click="checkDetail">
                  <van-card 
                    :num=item.num
                    :tag=item.tag
                    :price=item.price
                    :desc=item.desc  
                    :title=item.title
                    :origin-price=item.originPrice
                    :thumb="item.thumb"
                 >
                <div slot="footer">
                <van-button size="mini"  @click.stop.prevent="call">安全拨叫</van-button>
                <van-button size="mini"  @click.stop.prevent="urgency">催单</van-button>
                 <van-button size="mini"  @click.stop.prevent="finish">确认完成</van-button>
                  </div>
          </van-card>
    </div>
  </van-tab>
  <van-tab title="处理中">
            <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==2"  @click="checkDetail">
                  <van-card 
                    :num=item.num
                    :tag=item.tag
                    :price=item.price
                    :desc=item.desc  
                    :title=item.title
                    :origin-price=item.originPrice
                    :thumb="item.thumb"
                 >
                  <div slot="footer">
                <van-button size="mini"  @click.stop.prevent="call">安全拨叫</van-button>
                  <van-button size="mini" @click.stop.prevent="complain">申诉</van-button>
                      <van-button size="mini" @click.stop.prevent="judge">评价</van-button>
                  </div>
          </van-card>
    </div>

  </van-tab>
  <van-tab title="待评价">
        <div class="myOrder" v-for="item in data" :key="item.id" v-if="item.type==3"  @click="checkDetail">
                  <van-card 
                    :num=item.num
                    :tag=item.tag
                    :price=item.price
                    :desc=item.desc  
                    :title=item.title
                    :origin-price=item.originPrice
                    :thumb="item.thumb"
                 >
                    <div slot="footer">
                  <van-button size="mini" @click.stop.prevent="complain">申诉</van-button>
                  </div>
          </van-card>
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
.myOrder{
 
  width: 90%;
  margin: auto;
   margin-top: 20px; 
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
