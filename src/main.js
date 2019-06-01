// import '/firebase'
import Vue from 'vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
//vuefire 
import {  firestorePlugin} from 'vuefire'
Vue.use(firestorePlugin)
//jquery
window.$ = require('jquery')
window.JQuery = require('jquery')
import 'popper.js'
//bootstrap 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
Vue.config.productionTip = false;

import './assets/scss/app.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");