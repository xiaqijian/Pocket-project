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
      // 所有订单
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/service/viewOrder/myOrder')
    },
    {
      // 查看订单
      path: '/checkOrder',
      name: 'checkOrder',
      component: () => import('@/views/service/viewOrder/checkOrder')
    },
    {
      // 评价
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: () => import('@/views/service/viewOrder/serviceEvaluation')
    },
    {
      // 业务状态
      path: '/serviceState',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/serviceState')
    },
    {
      // 联系方式
      path: '/contact',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/contact')
    },
    {
      // 信息绑定
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
