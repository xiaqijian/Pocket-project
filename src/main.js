// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
var qs = require('qs')

Vue.use(Vant)


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.qs = qs

function GetQueryString(name)
{
  var ss = 'http://www.insoup.cn/wxc/#/serviceState?isBind=y&user=10852&isCreated=y&openId=ockPH1Nft3L1vxNxP28aZwYCQ1qA';
  // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(ss) || [, ""])[1].replace(/\+/g, '%20')) || null
  
}
  // isCreated 用户是否存在，y存在，n不存在
var isCreated = GetQueryString('isCreated');
// isBind: y 已经绑定 n 未绑定
var isBind =  GetQueryString('isBind');
//mobile

var mobile = GetQueryString('mobile');
var openid = GetQueryString('openId');
localStorage.setItem('openid', openid);
localStorage.setItem('mobile', mobile);
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
  if (to.meta.requireAuth) { 
//  debugger
    var infoBind= to.path === '/informationBind'?true:false; //判断是否进入绑定页面
         if(isCreated=='n'){ //没绑定进入添加用户
            next({
              path: '/addPeople',
              })
              return
             }
                  if(!infoBind){
                        if(isBind=='y'){
                          next()
                        }else{
                          next('/informationBind')
                        }
                    }else if(isBind=='y'){
                          next('/myOrder')
                    }else{
                      next()
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
