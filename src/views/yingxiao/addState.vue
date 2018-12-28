<template>
  <div class="app-container">
      <div v-for = "(item,index) in list">
           <van-cell :value="item.information"   size="large"  class="xinxi" @click="select($event,item)"/>
      </div>
      <div>
        <van-dialog
             v-model="show"
             :before-close="beforeClose"
             >
             <div>
                <van-cell title="客户姓名" :value="username"  size="large"  />
                <van-cell title="营业执照名称" :value="zhizhaoname"  size="large"  />
                <van-cell title="需求业务" :value="requirewore"  size="large" />
                <van-cell title="创建时间" :value="steptime"  size="large" />
             </div>
             <div>
                 <van-cell title="状态" :value="detailstate"  :label="defaltcause"  size="large" />
             </div>
        </van-dialog>
      </div>
  </div>
</template>

<script>
export default {
  mounted(){
        //请求所有数据  封装成一个函数
  },
  methods:{
      //事件操作
      select:function($event,item){
        let that = this;
        that.listData = item;    //将当前点击的数据放入显示数组
        console.log(item);
        that.show = true;   
        that.username = item.username
        that.zhizhaoname = item.zhizhaoname
        that.requirewore = item.requirewore
        that.steptime = item.steptime
        that.detailstate = item.detailstate
        that.defaltcause = item.defaltcause
      },
     beforeClose(action, done) {
      if (action === 'confirm') {
        done();
      } else {
        done();
      }
    }
  },
  data () {
    return {
        show: false,
        username:'',
        zhizhaoname:'',
        requirewore:'',
        steptime:'',
        detailstate:'',
        defaltcause:'',
        list:[{
            id:1,
            information:'您于2018年11月12日新建的工单，XXXXX，待审核，请尽快为客户提供服务。',
            username:'客户1',
            zhizhaoname:'可以营业1',
            requirewore:'需求业务1',
            steptime:'2018-12-28',
            detailstate:'待审核1',
            defaltcause:'',
            
        },{
            id:2,
            information:'您于2018年11月12日新建的工单，XXXXX，已经审核通过，请尽快为客户提供服务。',
            username:'客户2',
            zhizhaoname:'可以营业2',
            requirewore:'需求业务2',
            steptime:'2018-12-28',
            detailstate:'审核不通过2',
            defaltcause:'环境不达标，卫生不行啊',
        },{
            id:3,
            information:"您于2018年11月12日新建的工单，XXXXX，未通过审核，未通过原因：XXXX。",
            username:'客户3',
            zhizhaoname:'可以营业3',
            requirewore:'需求业务3',
            steptime:'2018-12-28',
            detailstate:'待审核3',
            defaltcause:'',
        }
        ],
        listData:{}//设置显示
     
    }
  },
}
</script>

<style scoped>
.xinxi{
    text-align: center;
    background: #f1f1f1;
    margin-top: 20px;
}
</style>
