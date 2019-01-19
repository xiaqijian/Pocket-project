<template>
  <div class="app-container">
    <div class="center">       
        <van-cell-group>
             <van-cell title="业务选择" is-link :value="val" size="large" @click="ywSelect"/>
             <van-cell title="工单业务" is-link :value="gdval" size="large" @click="gdSelect"/>
             <van-field
                v-model="message"
                type="textarea"
                placeholder="问题描述"
                rows="1"
                autosize
             />
              <van-field
                v-model="contactName"
                label="联系人:"
                placeholder="请输入联系人"
             />
             <van-field
                v-model="contactAddr"
                label="联系地址:"
                placeholder="请输入联系地址"
             />
             <van-field
                v-model="contactPhone"
                label="联系方式:"
                placeholder="请输入联系方式"
             />            
        </van-cell-group>
        <van-button size="normal" round class="butstyle submit-btn" @click="pushContent">提交</van-button>
        <van-popup v-model="show"  position="bottom">
            <van-picker
            show-toolbar
            title="业务类型"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
            />      
        </van-popup>
        <van-popup v-model="gdshow"  position="bottom">
            <van-picker
            show-toolbar
            title="工单业务"
            :columns="list"
            @cancel="onCancel1"
            @confirm="onConfirm1"
            />      
        </van-popup>
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
    //点击业务选择时弹出业务选择内容
    ywSelect:function(){
        let that = this;
        that.show = true;
    },//点击工单选择时弹出业务选择内容
    gdSelect:function(){
        let that = this;
        that.gdshow = true;
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aa = value;
      let that = this;
      that.val = aa;
      that.show = false;
    },
    onCancel() {
      this.show = false;
    },
    onConfirm1(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let bb = value;
      let that = this;
      that.gdval = bb;
      that.gdshow = false;
    },
     onCancel1() {
      this.gdshow = false;
    },
    //点击提交 提交工单的内容
    pushContent:function(){
        console.log('提交内容');
        let that = this;
        let ywcontent = that.val;
        let gdcontent = that.gdval;
        let question = that.message;
        let lianxiren = that.contactName;
        let lianxiadd = that.contactAddr;
        let lianxistate = that.contactPhone;
        console.log(ywcontent,gdcontent,question,lianxiren,lianxiadd,lianxistate);
        this.$toast("提交成功");
    }
  },
  data () {
    return {
      show: false,
      gdshow:false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      list: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      val: '',//业务类型
      gdval:'',//工单业务
      message:'',//问题描述内容
      contactName:'',//联系人
      contactAddr:'',//联系地址
      contactPhone:'',//联系方式
    }
  },
}
</script>

<style scoped>
    .app-container{
        background: #eee;
        height: 100%;
    }
    .aa{
      /* display: table; */
      background: white;
      height: 40px;
      /* width: 98%; */
      margin: auto;
    }
    .p{
      /* padding: 0px 2px; */
      text-align: center;
      vertical-align:middle; 
    }
    .center{
        margin:  auto;
        /* width: 98%; */
        padding-top:0   px 
    }
    .pone{
        text-align: center;
        color: black;
        font-size: 36px
    }
    .butstyle{
        margin: 150px auto;
        width: 60%;
        text-align: center;
       margin-left: 20%;
    }
</style>
<style>
.van-button--default{
  background:#68B6F7;
  color:#fff;

}
</style>

