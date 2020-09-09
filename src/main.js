import Vue from 'vue'
import App from './App'
import router from './router';

import '@/assets/css/xx-base.css';
import '@/assets/css/animate.css';
import '@/assets/css/ldb-main.css';

import globalMethods from '@/assets/js/globalMethods.js'; //全局的组件方法

Vue.use(globalMethods);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
