import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/nav',
      name: 'nav',
      component: () => import('@/views/nav/index'),
      meta: {
        title: '口袋商服'
      }
    },
    {
      path: '/nav2',
      name: 'nav2',
      component: () => import('@/views/nav/index2'),
      meta: {
        title: '口袋商服业务'
      }
    },
    {
      path: '/orderservice',
      component: () => import('@/views/orderservice/index'),
      meta: {
        title: '工单服务'
      }
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
      component: () => import('@/views/ordermap/index'),
      meta: {
        title: '订单地图',
        keepAlive: true
      }
    },
    {
      path: '/addState',
      name: 'addState',
      component: () => import('@/views/yingxiao/addState'),
      meta: {
        title: '新增状态'
      }
    },
    {
      path: '/disposeWorkorder',
      name: 'disposeWorkorder',
      component: () => import('@/views/workorderManagement/disposeWorkorder'),
      meta: {
        title: '处理工单'
      }
    },
    {
      path: '/myStatistics',
      name: 'myStatistics',
      component: () => import('@/views/workorderManagement/myStatistics'),
      meta: {
        title: '我的统计'
      }
    },
    {
      path: '/newActivity',
      name: 'newActivity',
      component: () => import('@/views/recommend/newActivity'),
      meta: {
        title: '推荐最新活动'
      }
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: () => import('@/views/recommend/instructions'),
      meta: {
        title: '推荐联迪A8使用说明'
      }
    },
    {
      path: '/serviceIndex',
      name: 'serviceIndex',
      component: () => import('@/views/service/serviceIndex'),
      meta: {
        title: '维护首页'
      }
    },
    {
      path: '/newDemand',
      name: 'newDemand',
      component: () => import('@/views/service/newDemand'),
      meta: {
        title: '新增需求'
      }
    },
    {//
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/service/viewOrder/myOrder'),
      meta: {
        title: '所有订单'
      }
    },
    {
      path: '/checkOrder',
      name: 'checkOrder',
      component: () => import('@/views/service/viewOrder/checkOrder'),
      meta: {
        title: '查看订单'
      }
    },
    {
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: () => import('@/views/service/viewOrder/serviceEvaluation'),
      meta: {
        title: '订单评价'
      }
    },
    {
      path: '/serviceState',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/serviceState'),
      meta: {
        title: '订单状态'
      }
    },
    {
      path: '/contact',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/contact'),
      meta: {
        title: '业务状态'
      }
    },
    {
      path: '/informationBind',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/informationBind'),
      meta: {
        title: '联系方式',
        requireAuth: true

      }
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      meta: {
        title: '404页面'
      }
    },
    { path: '*', redirect: '/404' }
  ]
})
