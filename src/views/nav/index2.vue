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
      //  口袋业务
       navs: { 'navs': [
         {
           'name': '抢工单',
           'id':1,
           'link': '',
           'navlist': [
             {
             'name': '工单列表',
             'id': 1,
             'link': '/orderlist'
           },
          //   {
          //    'name': '工单服务',
          //    'id': 1,
          //    'link': '/orderservice'
          //  },
           {
             'name': '抢工单',
             'id': 2,
             'link': '/ordermap'
           }
          ]
         },
         {
           'name': '营销管理',
           'id':2,
           'link': '',
           'navlist': [
             {
             'name': '新增工单',
             'id': 1,
             'link': '/addorder'
           },
           {
             'name': '工单状态',
             'id': 2,
             'link': '/addstatus'
           }
          ]
         },
         {
           'name': '工单管理',
           'id':3,
           'link': '',
           'navlist': [
             {
             'name': '我的工单',
             'id': 1,
             'link': '/disposeWorkorder'
           },
           {
             'name': '我的统计',
             'id': 2,
             'link': '/myStatistics'
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
