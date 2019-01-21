<template>
  <div class="app-container">
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="offset"
      @load="onLoad"
    >
      <div v-for= "(item,index) in list" class="card" :key="index">
        <div slot="footer">
          <van-cell class="haha" icon="card" title="工单编码:" :value="item.workOrderCode" size="large"/>
          <van-cell  class="haha" icon="friends"  title="客户姓名:" :value="item.customerName" size="large"/>
          <van-cell class="haha" icon="phone"  title="联系方式:" :value="item.customerMobile" is-link @click="callphone($event,item)" size="large"/>
          <van-cell  class="haha" icon="printer" title="开始时间:" :value="item.addTime" size="large"/>
          <van-cell class="haha" icon="info" title="当前状态:" :value="item.statudDesc" size="large"/>
          <van-cell class="haha" icon="award" title="工单类型:" :value="item.businessName"  size="large">  
              <!-- <div v-if="item.status ==1">
                <van-tag type="primary" size="large">正常</van-tag>
              </div>
              <div  v-if="item.status ==2">
                <van-tag type="danger" size="large">关闭</van-tag>
              </div> -->
          </van-cell>
          <van-button class="chakan" size="large" @click="workDetail($event,item)">工单详情</van-button>
        </div>
      </div>
      </van-list>
    <div>
        <van-dialog 
             v-model="show"
             :show-confirm-button='showbtn'
             :confirm-button-text='cuidan'
             :cancel-button-text='cantext'
             :before-close="beforeClose"
             >
             <div>
                <van-cell title="工单编码:" :value="gdID" size="large" />
                <van-cell title="客户姓名:" :value="khname" size="large" />
                <van-cell title="客户地址:" :value="khaddr" size="large" />
                <van-cell title="工单类型:" :value="gdstate" size="large" />
                <van-cell title="创建时间:" :value="stratTime" size="large" />
                <van-cell title="服务时间:" :value="fuwuTime" size="large" />
                <van-cell title="当前状态"  :value="nowState" size="large"/>
                <van-collapse v-model="activeNames">
                  <van-collapse-item title="佣金说明" name="1">
                    <span v-for="item in datadetail.commissions" :key="item.id"> {{item.commissionName}} 一共{{item.score}}分 --- 每分 {{item.money}}元<br></span>
                  </van-collapse-item>
               </van-collapse>
             </div>
        </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
        //请求所有数据  封装成一个函数
        // this.getallData(1);
  },
  methods:{
      //事件操作
    getallData(page, pageSize =5){
        let that = this;
        let userID = 3;
        that.$axios.get('pocket/wxchat/getWorkOrderStatus', 
          { params: { 
            'uid':userID,
            'page': page,
            'pageSize': pageSize
            }
          })
          .then(res=>{
            console.log(res.data);
             that.list = that.list.concat(res.data.data.dataResult) ;
             that.allDataYeshu = res.data.data.totalSize;
          })
          .catch(err=>{
              console.log(err)
              this.$toast('数据获取失败');
          })
    },
    //点击拨打电话
    callphone:function($event,item){
      let that = this;
      let phone = item.userMobile;
      let str1 =" tel://";
      let str2 = phone.toString()
      console.log(phone);
      window.location.href = str1.concat(str2);
    },
    //点击显示工单详情
    workDetail:function($event,item){
        
        let that = this;
        that.listData = item;
        let workID = item.id;
        this.$router.push({ path: 'orderservice', query: { id: workID }})
        console.log(workID);
        // that.$axios.get('pocket/wxchat/workOrderDetail', 
        //   { params: { 
        //     'workOrderId':workID
        //     }
        //   })
        //   .then(res=>{
        //      console.log(res.data)
        //      that.datadetail = res.data.data
        //      that.gdID = res.data.data.workOrderCode;//工单编码
        //      that.khname = res.data.data.customerName;//客户姓名
        //      that.khaddr = res.data.data.address;//客户地址
        //      that.gdstate = res.data.data.busDesc;//工单类型
        //      that.stratTime = res.data.data.addTime;//创建时间
        //      that.fuwuTime = res.data.data.completionTime;//竣工时间就是服务时间
        //      that.nowState = res.data.data.statudDesc;//当前状态

        //   })
        //   .catch(err=>{
        //       console.log(err)
        //       this.$toast('数据详情失败');
        //   })


        // let aaa = item.status;
        // console.log(aaa);
        that.show = true;//打开弹窗
        that.showbtn = true;//确认按钮默认一直展示
        that.canbtn = true;        
        // console.log(item);
        // //根据返回的内容进行显示 再看是否进行判断
        // if(aaa === 1){
        //     console.log('异常')
        //     that.cuidan = '催单'
        //     that.cantext = '取消'
        //     that.nowState = '异常'
        // }else{
        //     that.showbtn = false
        //     that.cantext = '确认'
        //     that.nowState = '处理中'
        // }
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        done();//确认为催单事件
      } else {
        done();
      }
    },
   onLoad() {//上滑加载更多数据
      // 异步更新数据
      let that = this
      setTimeout(() => {
        that.page = that.page +1 
        that.getallData(that.page)
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成  
        if (that.list.length >=  that.allDataYeshu) {
          that.finished = true;
        }
      }, 500);
    },
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
       gdID:'',     //工单编码
       khname:'',   //客户姓名
       khaddr:'',   //客户地址
       gdstate:'',  //工单类型
       stratTime:'', //创建时间
       fuwuTime:'',  //服务时间
       nowState:'', //当前状态
       activeNames:[1],
       list:[],
       listData:{},//存放点击对应的数据
       offset: 10,
       page:0 ,
       allDataYeshu:'',//总页数
       datadetail:'',
    }
  },
}
</script>

<style scoped>
.card{
    background: #dddddd;
   width: 90%; 
   margin: auto;
   margin-top: 20px; 
   border: 2px solid #eeeeee;
   border-radius: 6px;
   box-shadow:#e5e5e5 1px 3px 6px 3px;
}
.chakan{
    width: 100%;
}
.haha{
  color: #2983fb
}
</style>
