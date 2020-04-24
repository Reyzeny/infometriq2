import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/js/vendors/jquery/jquery.js';
import './assets/js/vendors/bootstrap/bootstrap.min.js';
import './assets/js/vendors/typeahead/typeahead.min.js';
import './assets/js/vendors/pushy/pushy.min.js';
import 'vuesax/dist/vuesax.css';
import Vuesax from 'vuesax';

Vue.use(Vuesax, {
  // options here
})


window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
