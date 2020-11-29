// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import { HTTP as axios } from './axios.js';

import "./assets/fonts/fonts.scss"
import 'devextreme/dist/css/dx.common.css';
import './assets/themes/dx.generic.gpb-theme.css';
var VueCookie = require('vue-cookie');

Vue.use(VueCookie);
Vue.use(Vuex)
Vue.prototype.$http = axios;

Vue.config.productionTip = false
Date.prototype.toJSONLocal = (function() {
  function addZ(n) {
    return (n<10? '0' : '') + n;
  }
  return function() {
    return this.getFullYear() + '-' +
      addZ(this.getMonth() + 1) + '-' +
      addZ(this.getDate()) ;
  };
}())

const store = new Vuex.Store( {
	state: {
		title: ''
	},
	mutations: {
		rtChangeTitle( state, value ) {
			state.title = value;
			document.title = ( state.title ? state.title + ' - ' : '' );
		}
	}
} );


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App: () => import('./layout/Main/Main.vue') },
  template: '<App/>',

})
