<template>
  <div class="app-container">
      <navs :datanav="navs"></navs>
  </div>
</template>

<script>
import navs from '@/components/nav'
export default {
  data () {
    let url = '?isBind=n&user=9&isCreated=y&openId=oVV-N1VLPb7S9sFU8GWikthwj7vg'
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
             'link': '/orderlist' + url
           },
          //   {
          //    'name': '工单服务',
          //    'id': 1,
          //    'link': '/orderservice'
          //  },
           {
             'name': '抢工单',
             'id': 2,
             'link': '/ordermap' + url
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
             'link': '/addorder' + url
           },
           {
             'name': '工单状态',
             'id': 2,
             'link': '/addstatus' + url
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
             'link': '/disposeWorkorder' + url
           },
           {
             'name': '我的统计',
             'id': 2,
             'link': '/myStatistics' + url
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
