<template>
  <div class="app-container">
     <div class="user-info">
           <div class="user-id">
               <label>客户ID：</label>
               <span>1899008475y7</span>
           </div>
           <div class="store-info">
                    <div class="store-name"> 
                    <van-cell icon="shop-o" title="店铺名称：" is-link  value="嘻哈哈零食店铺" @click="modifyStore()"/>
                        <van-popup v-model="dialogStoreModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入淘宝名称" v-bind:style="inputStyle">
                            
                            </p>
                            <p>
                                <van-button round  size="small" @click="save">保存</van-button>
                            </p>
                        </div>
                        </van-popup>
                    </div>
                    <div class="user-name">
                        <van-cell icon="manager-o" title="客户名称：" is-link  value="戏游人间" @click="modifyName()"/>
                        <van-popup v-model="dialogNameModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入名称" v-bind:style="inputStyle">
                            
                            </p>
                            <p>
                                <van-button round  size="small" @click="save">保存</van-button>
                            </p>
                        </div>
                        </van-popup>
                    </div>
                    <div class="contact-way">
                         <van-cell icon="chat-o" title="联系方式：" is-link  value="12343545@145.com" @click="modifyContact()"/>
                        
                        <van-popup v-model="dialogContactModify" position="right" :overlay="true" :overlay-style="popupNameStyle">
                        <div class="modify">
                                <p>
                                <input type="text" placeholder="请输入联系方式" v-bind:style="inputStyle">
                            
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
  methods: {
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
      
      
  }
  }
};
</script>

<style scoped>
.user-info {
  padding: 40px;
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
</style>
