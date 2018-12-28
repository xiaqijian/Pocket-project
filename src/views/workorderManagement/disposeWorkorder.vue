<template>
  <div class="app-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for= "(item,index) in list" class="card">
        <div slot="footer">
          <van-cell title="工单ID:" :value="item.workID" size="large"/>
          <van-cell title="开始时间:" :value="item.stratTime" size="large"/>
          <van-cell  title="当前状态:" :value="item.workState"  size="large">
              <div v-if="item.workState ==0">
                <van-tag type="primary" size="large">处理中</van-tag>
              </div>
              <div  v-if="item.workState ==1">
                <van-tag type="danger" size="large">异常</van-tag>
              </div>
          </van-cell>
          <van-button class="chakan" size="large" @click="workDetail($event,item)">查看</van-button>
        </div>
      </div>
      </van-list>
    </van-pull-refresh>
    <div>
        <van-dialog 
             v-model="show"
             :show-cancel-button='canbtn'
             :show-confirm-button='showbtn'
             :confirm-button-text='cuidan'
             :cancel-button-text='cantext'
             :before-close="beforeClose"
             >
             <div>
                <van-cell title="工单ID:" :value="gdID" size="large" />
                <van-cell title="开始时间:" :value="stratTime" size="large" />
                <van-cell title="当前状态" :value="nowState" size="large"/>
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
    workDetail:function($event,item){
        let that = this;
        console.log("点击了查看");
        let aaa = item.workState;
        that.show = true;//打开弹窗
        that.showbtn = true;//确认按钮默认一直展示
        that.canbtn = true;
        that.listData = item;
        console.log(item);
        that.gdID = item.workID;
        that.stratTime = item.stratTime;
        // that.nowState = item.workState;
        //根据返回的内容进行显示 再看是否进行判断
        if(aaa === 1){
            console.log('异常')
            that.cuidan = '催单'
            that.cantext = '取消'
            that.nowState = '异常'
        }else{
            that.showbtn = false
            that.cantext = '确认'
            that.nowState = '处理中'
        }
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        done();//确认为催单事件
        console.log(111)
        this.$toast('催单成功');
      } else {
        done();
      }
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        }, 500);
      },
    onLoad() {//上拉加载数据
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length = this.list.length) {
          this.finished = true;
        }
      }, 2000);
    }
  },
  data () {
    return {
       isLoading: false, //下拉刷新
       loading: false,
       finished: false,
       cantext:'取消',
       cuidan:'确认',
       canbtn:true,
       showbtn:true,
       show:false,
       gdID:'',
       stratTime:'',
       nowState:'',
       list:[
           {
            workID:'111',
            workState:0,
            stratTime:"2018-12-24 12:00"
           },
           {
            workID:'222',
            workState:1,
            stratTime:"2018-12-25 11:00"
           },
            {
            workID:'3333',
            workState:1,
            stratTime:"2018-12-25 11:00"
           },
            {
            workID:'3333',
            workState:0,
            stratTime:"2018-12-25 11:00"
           }
         ],
         listData:{},//存放点击对应的数据
    }
  },
}
</script>

<style scoped>
.card{
    background: #dddddd;
    padding: 5px;
}
.chakan{
    width: 100%;
}
</style>
