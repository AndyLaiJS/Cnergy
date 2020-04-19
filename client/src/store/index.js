import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from "./authenticationModule";
import { activity } from "./activityModule";

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
     },
     mutations: {
     },
     actions: {
     },
     modules: {
          auth,
          activity
     }
})
