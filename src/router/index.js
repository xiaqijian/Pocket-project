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
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('@/views/service/viewOrder/myOrder')
    },
    {
      path: '/checkOrder',
      name: 'checkOrder',
      component: () => import('@/views/service/viewOrder/checkOrder')
    },
    {
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: () => import('@/views/service/viewOrder/serviceEvaluation')
    },
    {
      path: '/serviceState',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/serviceState')
    },
    {
      path: '/contact',
      name: 'serviceEvaluation',
      component: () => import('@/views/my/contact')
    },
    {
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
