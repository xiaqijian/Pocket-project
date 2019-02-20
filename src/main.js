// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
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

function GetQueryString(name)
{
  var ss = 'http://www.insoup.cn/wxc/#/serviceState?isBind=y&user=18336391418&isCreated=y&openId=ockPH1Nft3L1vxNxP28aZwYCQ1qA';
  // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(ss) || [, ""])[1].replace(/\+/g, '%20')) || null
  
}
  // isCreated 用户是否存在，y存在，n不存在
var isCreated = GetQueryString('isCreated');
// isBind: y 已经绑定 n 未绑定
var isBind =  GetQueryString('isBind');
let Bind;
sessionStorage.setItem('Bind',isBind);
Bind = sessionStorage.getItem('Bind');
var openid = GetQueryString('openId');
localStorage.setItem('openid', openid);
//customerId
var customerId = GetQueryString('user');
localStorage.setItem('customerId', customerId);
//uid
var uid = GetQueryString('user');
localStorage.setItem('uid', uid);
console.log('isCreated:',isCreated,'isBind:',isBind,'user',uid,'openid:',openid);
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
let binding = localStorage.getItem('Binding')
  
    if (to.meta.requireAuth) { 
      console.log(Bind,0) 
       //如果用户未绑定，则去绑定
       if(Bind=='y'||binding=='y'){
        //  next();
           if(to.path==='/informationBind'){
            next('/myStore');
          }else{
            next()
          }
       }else{
         if(to.path==='/informationBind'){
              next()
         } else{
          next('/informationBind');
         }
       }
    }
    else{
      next();
    }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
