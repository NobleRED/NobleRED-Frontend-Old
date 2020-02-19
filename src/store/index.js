import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    loggedIn: false,
    role: ""
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
      this.$session.start();
      localStorage.userdata = JSON.stringify(user);
    },
    updateLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    updateRole(state, role) {
      state.role = role;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("updateLoggedIn", user !== null);
      if (user) {
        commit("addUser", {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        // this.$router.push("/");
        commit("updateRole", user.role);
      } else {
        commit("addUser", null);
      }
    }
  },
  modules: {},
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    role: state => state.role
  }
});
