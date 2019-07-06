import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/signin.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/contact.vue'),
    },

  ],
});