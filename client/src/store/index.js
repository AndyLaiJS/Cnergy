import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from "./authenticationModule";

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
     },
     mutations: {
     },
     actions: {
     },
     modules: {
          auth
     }
})
