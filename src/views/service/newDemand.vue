<template>
  <div class="app-container">
    <div class="center">       
        <van-cell-group>
             <van-cell title="业务选择" is-link :value="val" size="large" @click="ywSelect"/>
             <van-field
                v-model="message"
                type="textarea"
                placeholder="问题描述"
                rows="1"
                autosize
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
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
//客户id
id:4,
show: false,
      gdshow:false,
      columns: [],
      val: '',//业务类型
      gdval:'',//工单业务
      message:'',//问题描述内容
      contactName:'',//联系人
      contactAddr:'',//联系地址
      contactPhone:'',//联系方式
      yewuid:'',//业务id
      yydata:[]//保存选择的对象
    }
  },
  mounted(){
        //请求所有数据  封装成一个函数
      //  this.getCreateBussiness();
        this.aa();
  },
  methods:{
//获取可创建的工单列表

    aa(){
         let that = this
         let userID = localStorage.getItem('customerId')
         that.$axios.get('pocket/wxchat/customerCreateBusiness', { params: { 
            'customerId':userID,
            }
          })
          .then(res=>{
            console.log(res.data);
            let arr = [];
            that.yydata = res.data.data;
            for(let i = 0;i<res.data.data.length;i++){
                arr.push(res.data.data[i].busName);
                // console.log(arr)
            }
            that.columns = arr;
          })
          .catch(err=>{
              console.log(err)
          })
    },  
      //事件操作
    //点击业务选择时弹出业务选择内容
    ywSelect:function(){
        let that = this;
        that.show = true;
       
        
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      let aa = value;
      let that = this;
      that.val = aa;
      that.show = false;
      let lili = that.yydata;
      console.log(lili)
      that.yewuid = that.yydata[index].id
    },
    onCancel() {
      this.show = false;
    },
    //点击提交 提交工单的内容
    pushContent:function(){
        console.log('提交内容');
        let that = this;
        
        let question = that.message;//备注
        let ywID = that.yewuid;//业务id

        let khID = localStorage.getItem('customerId')//客户id

          that.$axios.get('pocket/wxchat/customerWorkOrderAdd', 
             { params:{
                 "customerId":khID,
                 "busCompanyId":ywID,
                 "remark":question
                 }
            })
      .then(res=>{
          console.log(res.data)
      })
      .catch(err=>{
          this.$toast(err);
      })

        
  }
  }}
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
    .van-button--default{
  background:#68B6F7;
  color:#fff;

}
</style>

