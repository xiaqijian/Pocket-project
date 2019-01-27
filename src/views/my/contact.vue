<template>
  <div class="app-container">
      <div class="detail-top">
         <img src="../../assets/tx.png" alt="" class="header-img"> 
          <div class="user-id">
               <label>ID：</label>
               <span>1899008475y7</span>
           </div>
        
    </div>
     <div class="user-info">
          
           <div class="store-info">
                    <div class="store-name">
                        
                       <van-cell is-link @click="modifyStore()">
                        <div>
                            <label> <van-icon name="shop-o" />&nbsp;店铺名称：</label>
                            <span>嘻哈哈零食店铺</span>
                        </div>
                     </van-cell>
                        <van-popup v-model="dialogStoreModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入淘宝名称" v-bind:style="inputStyle" v-model='storeName'>
                            
                            </p>
                            <p>
                                <van-button round  size="small" @click="save">保存</van-button>
                            </p>
                        </div>
                        </van-popup>
                    </div>
                    <div class="user-name">
                        <van-cell is-link @click="modifyName()">
                        <div>
                            <label> <van-icon name="manager-o" />&nbsp;名称：</label>
                            <span>戏游人间</span>
                        </div>
                     </van-cell>
                        <van-popup v-model="dialogNameModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入名称" v-bind:style="inputStyle" v-model="customerName">
                            
                            </p>
                            <p>
                                <van-button round  size="small" @click="save">保存</van-button>
                            </p>
                        </div>
                        </van-popup>
                    </div>
                    <div class="contact-way">
                         <van-cell is-link @click="modifyContact()">
                        <div>
                            <label> <van-icon name="chat-o" />&nbsp;联系方式：</label>
                            <span>2343545@145.com</span>
                        </div>
                     </van-cell>
                        <van-popup v-model="dialogContactModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入联系方式" v-bind:style="inputStyle" v-model="contact">
                            
                            </p>
                            <p>
                                <van-button round  size="small" @click="save">保存</van-button>
                            </p>
                        </div>
                        </van-popup>
                    </div>
           </div>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        //店铺名称
        storeName:'',
        //客户名称
        customerName:'',
        //联系方式
        contact:'',
        //uid
        uid:'',
        //mobelie:
        mobile:'',
        popupNameStyle:{
            background:'#fafafa',
            top:'0',
            width:'100%',
            height:'100%'
        },
        inputStyle:{
            top:'0',
            width:'100%'

        },
        // 是否显示弹出层
     dialogStoreModify: false,
     dialogNameModify:false,
     dialogContactModify:false,
      username: "",
      password: ""
    };
  },
  components: {},
  mounted(){
      this.uid = localStorage.getItem('uid');
      this.mobile = localStorage.getItem('mobile');
      this.getUserInfo();
  },
  methods: {
      getUserInfo(){
          let that = this;
        that.$axios.get('pocket/wxchat/getCustomerInfo', 
           { 'uid':this.uid,
            'mobile':this.mobile
            
          })
      .then(res=>{    
          console.log(res.data)
      })
      .catch(err=>{
          this.$toast(err);
      })
      },
    //   保存店铺名
    modifyStore: function() {
      this.dialogStoreModify=true;
    
    },
// 保存名字
    modifyName:function(){
    this.dialogNameModify=true;
    },
    // 保存联系方式
    modifyContact:function(){
        this.dialogContactModify = true;
    },
  save:function(){
      this.dialogStoreModify=false;
     this.dialogNameModify=false;
     this.dialogContactModify = false;
     this.modifyInfo();
      
      
  },
  modifyInfo(){
        let that = this;
        that.$axios.post('pocket/wxchat/customerInfoUpdate', 
           { 
            'mobile':this.storeName,
            'name':this.customerName,
            'shopName':this.contact
          })
      .then(res=>{    
          console.log(res.data)
      })
      .catch(err=>{
          this.$toast(err);
      })
      
  }
  }
};
</script>

<style scoped>
.detail-top{
  height: 200px;
  background: #68B6F7;
  display: flex;
  align-items:center;
  color: #fff;
}
.app-container{
  height: 100%;
  background: #fafafa;
}
.header-img{
  width: 120px;
  margin: 0 20px;
}
.modify{
    padding: 30px;
}
.modify input{
    border-top: none;
    border-left: none;
    border-right: none;
    background: transparent;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #68B6F7;
}
.van-popup--right{
    top: 10%;
    width: 100%;
    background: transparent;
    /* height: 40%; */
}
.user-id {
  height: 88px;
  line-height: 88px;
  border-bottom: 1px solid #e5e5e5;
}
.store-info{
    margin-top: 10px;
}
.store-info > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
}
.van-button--default{
    background:#68B6F7;
    color: #fff;
}
</style>
