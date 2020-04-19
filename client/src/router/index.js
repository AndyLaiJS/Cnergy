import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import profile from '../views/Profile/ProfileHome.vue'
import profileEdit from '../views/Profile/ProfileEdit.vue'
import profileSet from '../views/Profile/ProfileSettings.vue'

import notfound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/profile-edit',
    name: 'profile-edit',
    component: profileEdit
  },
  {
    path: '/profile-settings',
    name: 'profile-settings',
    component: profileSet

  },
  {
    path: '/nf',
    name: 'notfound',
    component: notfound
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
