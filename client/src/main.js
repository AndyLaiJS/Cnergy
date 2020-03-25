import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDqz0hcIvcrTNuDjFlnc8hWU9Mjynw1p9E",
  authDomain: "csci3100-805c1.firebaseapp.com",
  databaseURL: "https://csci3100-805c1.firebaseio.com",
  projectId: "csci3100-805c1",
  storageBucket: "csci3100-805c1.appspot.com",
  messagingSenderId: "326474493349",
  appId: "1:326474493349:web:8f70a0cdd9c565f3288c4c",
  measurementId: "G-1FK4GFHKP2"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
