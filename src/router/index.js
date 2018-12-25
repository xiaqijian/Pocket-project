import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index')
    },{//处理工单
      path: '/workorderManagement/disposeWorkorder',
      name: 'disposeWorkorder',
      component: () => import('@/views/workorderManagement/disposeWorkorder')
    },{//我的统计
      path: '/workorderManagement/myStatistics',
      name: 'myStatistics',
      component: () => import('@/views/workorderManagement/myStatistics')
    },{//维护首页
      path: '/service/serviceIndex',
      name: 'serviceIndex',
      component: () => import('@/views/service/serviceIndex')
    },{//新增需求
      path: '/service/newDemand',
      name: 'newDemand',
      component: () => import('@/views/service/newDemand')
    },{
      path: '/404',
      component: () => import('@/views/404')
    },
    { path: '*', redirect: '/404' }
  ]
})
