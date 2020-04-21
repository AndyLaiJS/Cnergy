import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from "./authenticationModule";
import { activity } from "./activityModule";
import { club } from "./clubModule";
import { user } from "./userModule";

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
          activity,
          club,
          user
     }
})
