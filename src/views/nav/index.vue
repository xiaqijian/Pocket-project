<template>
  <div class="app-container">
      <navs :datanav="navs"></navs>
  </div>
</template>

<script>
import navs from '@/components/nav'
export default {
  data () {
    return {
      //  口袋商服
       navs: { 'navs': [
         {
           'name': '推荐',
           'id':1,
           'link': '',
           'navlist': [
             {
             'name': '联迪A8使用说明',
             'id': 1,
             'link': '/instructions'
           },
           {
             'name': '最新活动',
             'id': 2,
             'link': '/newActivity'
           }
          ]
         },
         {
           'name': '维护',
           'id':2,
           'link': '',
           'navlist': [
             {
             'name': '查看订单',
             'id': 1,
             'link': '/myOrder'
           },
           {
             'name': '新需求',
             'id': 2,
             'link': '/newDemand'
           }
          ]
         },
         {
           'name': '我的',
           'id':3,
           'link': '',
           'navlist': [
             {
             'name': '信息绑定',
             'id': 1,
             'link': '/informationBind'
           },
           {
             'name': '联系方式',
             'id': 2,
             'link': '/contact'
           },
           {
             'name': '业务状态',
             'id': 3,
             'link': '/serviceState'
           }
          ]
         }
       ]
       }
    }
  },
  components: {
      navs
  },
  methods: {
   
  },
}
</script>

<style scoped lang="less" type="text/less">

 
</style>
