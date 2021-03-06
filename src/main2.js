// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery';
import './assets/site-main/assets/js/vendors/jquery/jquery.js';
import 'popper.js';
import Vuex from 'vuex'
import Slider from '@jeremyhamm/vue-slider'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuesax from 'vuesax'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import axiosInstance from './network'
import VModal from 'vue-js-modal'
import store from './store'
// import VueSimpleSuggest from 'vue-simple-suggest'
import AvatarCropper from "vue-avatar-cropper"
// import 'vue-simple-suggest/dist/styles.css' // Optional CSS
import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';

// VueRx can use libraries other than RxJS
// that implement the observable interface.
Vue.use(VueRx, Rx)
Vue.use(VModal)

// Vue.use(axiosInstance);

// Global registration
// Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
// Vue.component('vue-simple-suggest', VueSimpleSuggest);

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})

library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Slider)
Vue.component('avatar-cropper', AvatarCropper)

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axiosInstance,
  store,
  components: { App },
  template: '<App/>',

})
