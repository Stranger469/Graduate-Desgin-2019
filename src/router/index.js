import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/page/index';
import Login from '@/page/login/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login,
        },
      ],
    },
  ],
});
