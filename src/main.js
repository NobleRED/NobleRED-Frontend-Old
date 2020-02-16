import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import Chart from "chart.js";
import firebaseConfig from "./plugins/firebaseConfig";
import axios from "axios";
import VueSession from 'vue-session'
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import Qrcode from "vue-qrcode";

import VueParticles from 'vue-particles';
Vue.use(VueParticles)

Vue.use(VueSession)

Vue.config.productionTip = false;
export const bus = new Vue();

firebaseConfig.auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  store,
  vuetify,
  Chart,
  firebaseConfig,
  VueSession,
  axios,
  Qrcode,
  render: h => h(App)
}).$mount("#app");
