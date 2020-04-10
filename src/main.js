// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
import Vuex from 'vuex'     //状态管理工具
import stores from './vuex/store'  //引入vuex的状态仓库
import NProgress from 'nprogress'    //页面顶部加载条和样式
import 'nprogress/nprogress.css'


const commonUtil = require('./assets/util/common')

//兼容ie
import "babel-polyfill";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const baseConfig = require('./assets/util/baseConfig')

import constantsMap from './assets/util/constant'   //项目内使用到的常量
import vueUtil from './assets/util/vue-util'   //项目内使用到的常量

let baseURL = ''
if (process.env.NODE_ENV == 'development') {      //这里配置项目开发和上线后的baseURL
  baseURL = 'http://pan-zoe.testing'
} else {
  baseURL = 'http://pan-zoe.testing'
}

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)


// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })



//路由拦截
router.beforeEach((to, from, next) => {              //路由跳转时，添加进度条
  //处理页面位置
    if(to.fullPath === '/'){
        // router.push('/home')
    }


  // if(to.name != 'login' && !commonUtil.getCookie('login')){
  //   // Vue.showAlert('未登录，已经调整到首页')
  //   router.push('/login')
  //   return
  // }
  NProgress.start();    //顶部进度条
  next()
});

router.afterEach(transition => {
  NProgress.done();
});



 Vue.prototype.$axios = axios;

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(constantsMap)
Vue.use(vueUtil)


Vue.config.productionTip = true

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store:stores,
  template: '<App/>',
  components: {App}
})
