<template>
  <div class="app-container">
     <div class="user-info">
           <div class="user-id">
               <label>客户ID：</label>
               <span>1899008475y7</span>
           </div>
           <div class="store-info">
                    <div class="store-name">
                        <div>
                            <label> <van-icon name="shop-o" />&nbsp;店铺名称：</label>
                            <span>嘻哈哈零食店铺</span>
                        </div>
                        <van-button round   size="small" @click="modifyStore()">修改</van-button>
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
                        <div>
                            <label><van-icon name="manager-o" />&nbsp;客户名称：</label>
                            <span>戏游人间</span>
                        </div>
                        <van-button round  size="small" @click="modifyName()">修改</van-button>
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
                            <div>
                            <label><van-icon name="chat-o" />&nbsp;联系方式：</label>
                            <span>12343545@145.com</span>
                        </div>
                        <van-button round   size="small" @click="modifyContact()">修改</van-button>
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
