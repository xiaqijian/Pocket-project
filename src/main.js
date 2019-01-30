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
  var ss = 'http://cyp.startupbelts.com/dist/index.html?data=0&isCreated=y&isBind=n&user=10647&customerId=10647&mobile="18812340000"';
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //  var r =  window.location.search.substr(1).match(reg);
     var r =  ss.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
  // isCreated 用户是否存在，y存在，n不存在
var isCreated = GetQueryString('isCreated');
// isBind: y 已经绑定 n 未绑定
var isBind =  GetQueryString('isBind');
//mobile
var mobile = GetQueryString('mobile');
localStorage.setItem('mobile', mobile);
//customerId
var customerId = GetQueryString('user');
localStorage.setItem('customerId', customerId);
//uid
var uid = GetQueryString('user');
localStorage.setItem('uid', uid);
console.log('isCreated:',isCreated,'isBind:',isBind,'mobile:',mobile,'user',uid);
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requireAuth) { 
   if (isCreated=='y') {  // 用户存在
            
            // 判断是否绑定
            if(isBind=='y'){ //用户绑定
              next({
                path: '/myOrder',
               })
            }else{
              next(); //未绑定
            }
        }else{
          // 用户不存在，跳转到添加页面
          next({
            path: '/addPeople',
        })
        }
  }
  else {
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
