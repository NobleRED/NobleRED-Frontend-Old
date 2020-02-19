<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
    app
    color="white"
    mobile-break-point
    elevate-on-scroll
  >
    <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
    <v-toolbar-title class="ml-0 pr-4 pl-4">
      <span>
        <v-img
          src="../assets/noblered logo 30x100.png"
          alt="Vuetify"
          @click="redirect"
        />
      </span>
    </v-toolbar-title>

    <v-btn text small color="#C62828" to="/visitor/map">Campaigns Map</v-btn>
    <v-btn text small color="#C62828" to="/bloodNeedPost"
      >Blood Needed Posts</v-btn
    >
    <v-btn text small color="#C62828" to="/campaignPosts">Campaign Posts</v-btn>
    <v-btn text small color="#C62828">Contact Us</v-btn>

    <v-spacer />
    <v-btn icon v-show="loggedIn" @click="showDashBoard">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn
      outlined
      small
      color="secondary"
      to="/login"
      v-show="!loggedIn"
      class="mr-1"
      >Sign In</v-btn
    >

    <div class="text-center" v-if="loggedIn">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn icon large v-show="loggedIn" v-on="on">
            <v-avatar size="32px" item>
              <v-img :src="user.photoURL" />
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="user.photoURL" alt="Profile Pic" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.displayName }}</v-list-item-title>
                <v-list-item-subtitle>Signed In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <!-- <v-btn text @click="menu = false">Cancel</!-->

            <v-btn
              small
              color="secondary"
              to="/userProfile"
              v-show="loggedIn"
              class="mb-1"
              >View Profile</v-btn
            >

            <v-btn
              small
              dark
              color="#B71C1C"
              @click="signOut"
              v-show="loggedIn"
              class="mb-1"
              >Sign Out</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { bus } from "../main";
import { mapGetters } from "vuex";
import firebase from "../plugins/firebaseConfig";

export default {
  name: "Appbar",
  data() {
    return {
      userData: "",
      username: "",
      drawer: false,
      // loggedIn: false,
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
      firebase.auth.signOut().then(() => {
        localStorage.clear();
        this.$session.destroy();
        // bus.$emit("changeDashboardStatus", false);
        this.$store.commit("updateLoggedIn", false);
        this.$store.commit("role", "visitor");
        this.userData = "";
        this.userRole = "visitor";
        this.loggedIn = false;
        this.drawer = false;
        this.$router.go("/");
      });

      // localStorage.removeItem("userdata");
      // localStorage.setItem("role", "visitor");
      // localStorage.setItem("loginstatus", false);
    },
    showDashBoard() {
      bus.$emit("changeDashboardStatus", true);
      this.drawer = true;
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      loggedIn: "loggedIn"
    })
  },
  created() {
    bus.$on("changeLoginStatus", () => {
      // this.loggedIn = data;
      this.loggedIn = localStorage.loginstatus
        ? localStorage.loginstatus
        : false;
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
