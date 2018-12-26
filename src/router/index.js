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
