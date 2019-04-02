// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import valert from './plugins/alert';
import vconfirm from './plugins/confirm';

Vue.config.productionTip = false;
Vue.use(valert);
Vue.use(vconfirm);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
