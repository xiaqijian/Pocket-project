<template>
  <div class="app-container">
    <div class="person">
       <div>
            <van-icon name="user-o" size="50px"/>
            <div>西雪</div>
       </div>
        <div class="personInfo">
             <!-- <div class="person-info">
         <label>客户名称：</label> 
         </div> -->
        <div class="person-id">
            <label>客户ID：</label> <span>18336391418</span>
        </div>
        <div class="person-address">
            <label>联系地址：</label> <span>荆门路1990号XXXXXXXX</span>
        </div>
        </div>
    </div>
    <div class="seviceStatus"><van-icon name="description"/>&nbsp;我的业务状态</div>
    <div class="bussiness-list">   
        <div class="person-bussiness" v-for="item in data" :key="item.id">
        
        <div class="bussiness-name">
            <label>开通业务：</label>
            <span>{{item.name}}</span>
        </div>
        <div class="bussiness-status">
            <label>当前状态：</label>
             <span v-if="item.status==1" class="colorRed">异常</span>
            <span  v-if="item.status==2">正常</span>
        </div>
        <div class="bussiness-time">
            <label>共计使用时间：</label>
            <span>{{item.time}}</span>
        </div>
         <div class="service-last">
            <label>上次服务：</label>
            <span>{{item.last}}</span>
        </div>
        <div class="print-number">
            <label>打印次数：</label>
            <span>{{item.printNumber}}</span>
        </div>
         <div class="surplus-number">
            <label>剩余次数：</label>
            <span>{{item.surplusNumber}}</span>
        </div>
         <div class="machine-status">
            <label>机具状态：</label>
            <span>{{item.machineStatus}}</span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        // 1：异常 2正常
      data:[
          {
          name:'银行收单',
          status:'1',
          time:'20小时',
          last:'15小时之前',
          printNumber:'4次',
          surplusNumber:'4次',
          machineStatus:'通信异常' ,
          id:1      
      },
       {
          name:'花费查询',
          status:'2',
          time:'40小时',
          last:'5小时之前',
          printNumber:'4次',
          surplusNumber:'无限次',
          machineStatus:'通信正常',
          id:2    
      },
       {
          name:'银行收单',
          status:'1',
          time:'20小时',
          last:'15小时之前',
          printNumber:'4次',
          surplusNumber:'4次',
          machineStatus:'通信异常' ,
          id:13    
      }
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped>
.bussiness-list{
    background: #fafafa;
    padding-top: 10px;
}
.personInfo{
  margin-left: 70px;
  flex: 3;
}
.person{
  padding:50px;
  background: #68B6F7;
  box-shadow: #eeeeee -2px 1px  10px 2px;
  color: #ffffff;
  display: flex;
  height: 120px;

}
.person>div:first-child{
      text-align: center;
}
.colorRed{
    color: #68B6F7;
}
.seviceStatus{
    padding-left: 30px;
    height: 88px;
    line-height: 88px;
    border-top: 1px solid #e5e5e5;
}
.person>div{
    height: 48px;
    line-height: 48px;
}
.person-bussiness{
    background: #fff;
    width: 86%;
    margin: auto;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 10px 30px;
    margin-top: 20px;
    font-size: 16px;
}
.person-bussiness>div{
    height: 48px;
    line-height: 48px;
}
 
</style>
