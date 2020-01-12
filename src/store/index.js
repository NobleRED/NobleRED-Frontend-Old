import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: "",
    loggedIn: false,
    role: "visitor"
  },
  mutations: {
    addSession(state, session) {
      state.session = session;
    },
    updateLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    updateRole(state, role) {
      state.role = role;
    }
  },
  actions: {},
  modules: {},
  getters: {
    session: state => state.session,
    loggedIn: state => state.loggedIn,
    role: state => state.role
  }
});
