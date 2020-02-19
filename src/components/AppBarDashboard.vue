<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      style="background-color: #424242; "
      :dark="true"
    >
      <v-flex
        :class="`d-flex justify-center pt-5 `"
        style="background-color:#424242"
        v-if="loggedIn"
      >
        <p
          style="font-size:24px; color:white"
          class="font-weight-medium"
          v-if="dashboardRole == 'Admin' || userRole == 'Admin'"
        >Admin</p>
        <p
          style="font-size:24px; color:white"
          class="font-weight-medium"
          v-if="dashboardRole == 'Organizer' || userRole == 'Organizer'"
        >Organizer</p>
        <p
          style="font-size:24px; color:white"
          class="font-weight-medium"
          v-if="dashboardRole == 'Donor' || userRole == 'Donor'"
        >Donor</p>
      </v-flex>
      <v-divider></v-divider>

      <v-list dense>
        <div>
          <v-list-item to="/bloodNeedPost">
            <v-list-item-icon>
              <v-icon>mdi-water</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Blood Needed Posts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/campaignPosts">
            <v-list-item-icon>
              <v-icon>mdi-calendar-multiple-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Campaign Posts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/visitor/map">
            <v-list-item-icon>
              <v-icon>mdi-map-marker-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Campaign Map</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
        <div v-if="dashboardRole == 'Admin' || userRole == 'Admin'">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>
        <div v-if="dashboardRole == 'Organizer' || userRole == 'Organizer'">
          <v-list-item to="/campaignPosts">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Campaign Posts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/organizer/map">
            <v-list-item-icon>
              <v-icon>mdi-map-marker-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Campaign Map</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/organizer/userProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>User Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div v-if="dashboardRole == 'Donor' || userRole == 'Donor'">
          <v-list-item to="/visitor/map">
            <v-list-item-icon>
              <v-icon>mdi-map-marker-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Campaign Map</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/userProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>User Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="white" light>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-4">
        <router-link to="/">
          <v-img src="../assets/noblered logo 30x100.png" alt="Vuetify" />
        </router-link>
      </v-toolbar-title>

      <v-spacer />
      <v-btn outlined small color="secondary" to="/login" v-show="!loggedIn" class="mr-1">Sign In</v-btn>
      <div class="text-center" v-if="loggedIn">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
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

              <v-btn
                small
                color="secondary"
                to="/userProfile"
                v-show="loggedIn"
                class="mb-1"
              >View Profile</v-btn>

              <v-btn
                small
                dark
                color="#B71C1C"
                @click="signOut"
                v-show="loggedIn"
                class="mb-1"
              >Sign Out</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { bus } from "../main";
import { mapGetters } from "vuex";
import firebase from "../plugins/firebaseConfig";

export default {
  name: "AppBarDashnoard",
  props: {
    source: String
  },
  data: () => ({
    userData: "",
    dashboardRole: "",
    // userRole: "",
    drawer: null,
    menu: [
      { icon: "home", title: "Link A" },
      { icon: "info", title: "Link B" },
      { icon: "warning", title: "Link C" }
    ],
    items: [
      { icon: "mdi-chart-pie", text: "Analytics", link: "/admin/charts/donor" },
      {
        icon: "mdi-account-star",
        text: "Administrators",
        link: "/admin/admins"
      },
      {
        icon: "mdi-human-male-female",
        text: "Blood Donors",
        link: "/admin/donors"
      },
      {
        icon: "mdi-human",
        text: "Campaign Organizers",
        link: "/admin/organizers"
      },
      {
        icon: "mdi-map-marker-multiple",
        text: "Campaigns Map",
        link: "/admin/map"
      },
      {
        icon: "mdi-calendar-multiple-check",
        text: "Campaigns",
        link: "/admin/campaigns"
      },
      {
        icon: "mdi-water",
        text: "Donation Posts",
        link: "/admin/BloodDonationPosts"
      },
      {
        icon: "mdi-account",
        text: "User Profile",
        link: "/admin/userProfile"
      }

      // { icon: "mdi-message-text", text: "Notifications" }
    ]
  }),
  methods: {
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
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      loggedIn: "loggedIn",
      userRole: "role"
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
    this.userData = localStorage.userdata;
  },
  mounted() {
    this.dashboardRole = localStorage.role;
  }
};
</script>
