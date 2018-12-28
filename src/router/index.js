import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index')
    },
    {
      path: '/orderservice',
      component: () => import('@/views/orderservice/index')
    },
    {
      path: '/orderdetail',
      component: () => import('@/views/orderdetail/index'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/addorder',
      component: () => import('@/views/addorder/index'),
      meta: {
        title: '新增订单'
      }
    },
    {
      path: '/addstatus',
      component: () => import('@/views/addstatus/index'),
      meta: {
        title: '新增状态'
      }
    },
    {
      path: '/adduser',
      component: () => import('@/views/adduser/index'),
      meta: {
        title: '新增客户'
      }
    },
    {
      path: '/ordermap',
      component: () => import('@/views/ordermap/index')
    },
    // 
    {//新增状态
      path: '/addState',
      name: 'addState',
      component: () => import('@/views/yingxiao/addState')
    },{//处理工单
      path: '/disposeWorkorder',
      name: 'disposeWorkorder',
      component: () => import('@/views/workorderManagement/disposeWorkorder')
    },{//我的统计
      path: '/myStatistics',
      name: 'myStatistics',
      component: () => import('@/views/workorderManagement/myStatistics')
    },{//推荐最新活动
      path: '/newActivity',
      name: 'newActivity',
      component: () => import('@/views/recommend/newActivity')
    },{//推荐联迪A8使用说明
      path: '/instructions',
      name: 'instructions',
      component: () => import('@/views/recommend/instructions')
    },{//维护首页
      path: '/serviceIndex',
      name: 'serviceIndex',
      component: () => import('@/views/service/serviceIndex')
    },{//新增需求
      path: '/newDemand',
      name: 'newDemand',
      component: () => import('@/views/service/newDemand')
    },{//所有订单
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/service/viewOrder/myOrder')
    },{//查看订单
      path: '/checkOrder',
      name: 'checkOrder',
      component: () => import('@/views/service/viewOrder/checkOrder')
    },{//订单评价
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: () => import('@/views/service/viewOrder/serviceEvaluation')
    },{
      path: '/serviceState',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/serviceState')
    },{//业务状态
      path: '/contact',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/contact')
    },{//联系方式
      path: '/informationBind',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/informationBind')
    },
    {
      path: '/404',
      component: () => import('@/views/404')
    },
    { path: '*', redirect: '/404' }
  ]
})
