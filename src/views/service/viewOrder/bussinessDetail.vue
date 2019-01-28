<template>
  <div class="app-container">
   
   </div>
</template>

<script>
export default {
  data () {
    return {
      //查询id
      workId:'',
     
    }
  },
  mounted(){
  this.workId = this.$route.params.id
  //获取详情数据
  this.getOrderDetail();
  },
  methods:{
    getOrderDetail(){
      this.$axios.get('pocket/wxchat/workOrderDetail',
      {params:{
        workOrderId:this.workId
      }}).
      then(res=>{
    console.log(res)
    this.data = res.data.data;
      }).
      catch(err=>{
    this.$toast(err);
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
 
</style>


