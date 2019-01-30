// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/utils/request'
import VueAMap from 'vue-amap'
import Vant from 'vant'
import 'vant/lib/index.css'

var qs = require('qs')

Vue.use(Vant)
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '3c14af81a3f3cad7e7bc54a5722d857f',
  plugin: ['Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.qs = qs

// let url = 'http://www.insoup.cn/pocket/wxchat?isBind=y&&user=4&&isCreated=n'



router.beforeEach((to, from, next) => {
  let url = window.location.href
  let isBind = parseQueryString(url).isBind
  /* 路由发生变化修改页面title */
  let token = isBind == 'y' ? true: false;
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (token) {
     next()
  } else {
    if (to.path === '/informationBind') {
      next()
    } else {
      next('/informationBind')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



function parseQueryString(url) {
  var obj = {};
  var keyvalue = [];
  var key = "",
    value = "";
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&&");
  for (var i in paraString) {
    keyvalue = paraString[i].split("=");
    key = keyvalue[0];
    value = keyvalue[1];
    obj[key] = value;
  }
  return obj;
}