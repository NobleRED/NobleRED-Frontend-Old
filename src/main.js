import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Chart from 'chart.js';
import "./registerServiceWorker";

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  Chart,
  render: h => h(App)
}).$mount("#app");
