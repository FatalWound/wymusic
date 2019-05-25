// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'
import config from '@/config'
import Audio from '@/config/musicCore'
// require styles
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(VueAwesomeSwiper)

/**
 * 直接写px，编译后会直接转化成rem —- 除开下面两种情况，其他长度用这个
 * 在px后面添加/no/，不会转化px，会原样输出。 — 一般border需用这个
 * 在px后面添加/px/,会根据dpr的不同，生成三套代码。—- 一般字体需用这个
 */
Vue.config.productionTip = false
Vue.use(ElementUI);
axios.defaults.baseURL = config.baseUrl
Vue.prototype.$axios = axios;
Vue.prototype.$player = Audio
FastClick.attach(document.body)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
