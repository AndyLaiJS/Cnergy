import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile/ProfileHome.vue'
import ProfileEdit from '../views/Profile/ProfileEdit.vue'
import ProfileSettings from '../views/Profile/ProfileSettings.vue'
import ProfileManager from '../views/Profile/ProfileManager.vue'
import CreateActivity from '../views/CreateClubnActivities/CreateActivity.vue'
import CreateClub from '../views/CreateClubnActivities/CreateClub.vue'

import notfound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/profile-edit',
    name: 'profile-edit',
    component: ProfileEdit
  },
  {
    path: '/profile-settings',
    name: 'profile-settings',
    component: ProfileSettings

  },
  {
    path: '/manager',
    name: 'manager',
    component: ProfileManager
  },
  {
    path: '/nf',
    name: 'notfound',
    component: notfound
  },
  {
    path: '/create-club',
    name: 'create-club',
    component: CreateClub
  },
  {
    path: '/create-activity',
    name: 'create-activity',
    component: CreateActivity
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
