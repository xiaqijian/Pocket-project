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
    {
      path: '/404',
      component: () => import('@/views/404')
    },
    { path: '*', redirect: '/404' }
  ]
})
