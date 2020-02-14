<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    app
    color="white"
    mobile-break-point
    flat
    fixed
  >
    <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
    <v-toolbar-title class="ml-0 pr-4 pl-4">
      <span>
        <v-img src="../assets/noblered logo 30x100.png" alt="Vuetify" @click="redirect" />
      </span>
    </v-toolbar-title>

    <v-btn text small color="#C62828">Campaigns Map</v-btn>
    <v-btn text small color="#C62828">Blood Needed Posts</v-btn>
    <v-btn text small color="#C62828">Campaign Posts</v-btn>
    <v-btn text small color="#C62828">Contact Us</v-btn>

    <!-- <v-btn small color="success" class="ml-3" to="/bloodNeedPost">Blood Need Post</v-btn> -->
    <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
    />-->
    <v-spacer />
    <v-btn outlined small color="secondary" to="/login" v-show="!loggedIn">Sign In</v-btn>
    <v-btn outlined small color="secondary" @click="signOut" v-show="loggedIn">Sign Out</v-btn>

    <v-btn icon v-show="loggedIn" @click="showDashBoard">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <div v-show="loggedIn">{{ userRole }}</div>
    <v-btn icon large v-show="loggedIn">
      <v-avatar size="32px" item>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/user_pro_pic%2FPSX_20181208_195134.jpg?alt=media&token=fab833a7-50d9-4efe-a40c-0b43f61c2757"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { bus } from "../main";
// import { mapGetters } from "vuex";

export default {
  name: "Appbar",
  data() {
    return {
      userData: "",
      username: "",
      drawer: null,
      loggedIn: false,
      menu: [
        { icon: "home", title: "Link A" },
        { icon: "info", title: "Link B" },
        { icon: "warning", title: "Link C" }
      ]
    };
  },
  props: {},
  methods: {
    redirect() {
      this.$router.push("/"); // if ur using router
    },
    signOut() {
      // localStorage.clear();
      localStorage.removeItem("userdata");
      localStorage.setItem("role", "visitor");
      localStorage.setItem("loginstatus", false);
      bus.$emit("changeDashboardStatus", true);
      this.$store.commit("updateLoggedIn", false);
      this.$store.commit("role", "visitor");
      this.userData = "";
      this.userRole = "visitor";
      this.loggedIn = false;
      this.$router.push("/");
    },
    showDashBoard() {
      bus.$emit("changeDashboardStatus", true);
    }
  },
  // computed: {
  //   ...mapGetters({
  //     loggedIn: "loggedIn",
  //     username: "role"
  //   })
  // },
  created() {
    bus.$on("changeLoginStatus", () => {
      // this.loggedIn = data;
      this.loggedIn = localStorage.loginstatus;
    });
    bus.$on("sendUserRole", () => {
      // this.userRole = data;
      this.userRole = localStorage.role;
    });
    bus.$on("sendUserData", () => {
      // this.userData = data;
      this.userData = localStorage.userdata.fname;
    });
  },
  beforeMount() {
    this.loggedIn = localStorage.loginstatus;
    this.userRole = localStorage.role;
    this.userData = localStorage.userdata;
  }
};
</script>
