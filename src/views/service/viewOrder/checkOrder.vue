<template>
  <div class="app-container">
    <div class="myPackge">
      <div class="my-packge-top">
        <p style="line-height:20px;"> <van-icon name="send-gift" size="30px" />&nbsp;我的快递</p>
       
      </div>
         <p>
            <label>快递名称：</label>
            <span>韵达快递</span>
         </p>
         <p>
            <label>快递单号：</label>
            <span>324667889900087</span>
         </p>
    </div>
    <div class="express-info">
       <van-steps direction="vertical" :active="0" active-color="#f44">
  <van-step>
    <h3>【城市】物流状态1</h3>
    <p>2016-07-12 12:40</p>
  </van-step>
  <van-step>
    <h3>【城市】物流状态2</h3>
    <p>2016-07-11 10:00</p>
  </van-step>
  <van-step>
    <h3>快件已发货</h3>
    <p>2016-07-10 09:30</p>
  </van-step>
</van-steps>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       index: "我是首页"
    }
  },
  components: {

  }
}
</script>

<style scoped>
.app-container{
  padding: 30px;
}
.my-packge-top{
  background: #FFCC99;
  padding: 10px 5px;
  border-radius: 10px;
}
.express-info{
  border: 1px solid #FFCC99;
  border-radius: 10px;
}
 
</style>
