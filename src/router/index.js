import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/page/index';
import Login from '@/page/login/login';
import corpAdmin from './corp.admin';
import corpEmployee from './corp.employee';

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
        corpAdmin, corpEmployee,
      ],
    },
  ],
});
