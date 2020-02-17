<template>
  <v-app class="textStyle">
    <Appbar></Appbar>
    <v-content class="mb-10 pt-0">
      <router-view v-if="!dashBoard"></router-view>
    </v-content>
    <Footer></Footer>

    <div v-if="loggedIn && dashBoard">
      <div v-if="userRole === 'admin'">
        <!-- <Appbar></Appbar> -->
        <AdminDashboard></AdminDashboard>
      </div>
      <div v-else-if="userRole === 'donor'">
        <DonorDashboard></DonorDashboard>
      </div>
      <div v-else-if="userRole === 'organizer'">
        <OrganizerDashboard></OrganizerDashboard>
      </div>
    </div>
    <div v-if="!loggedIn"></div>
  </v-app>
</template>

<script>
import AdminDashboard from "./views/admin/AdminDashboard";
import DonorDashboard from "./views/donor/DonorDashboard";
import OrganizerDashboard from "./views/organizer/OrganizerDashboard";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { bus } from "./main";
// import Home from "./views/Home";

export default {
  name: "App",
  components: {
    AdminDashboard,
    DonorDashboard,
    OrganizerDashboard,
    Appbar,
    Footer
    // Home
  },

  data: () => ({
    userRole: "admin",
    loggedIn: true,
    dashBoard: false
  }),
  created() {
    this.dashBoard = false;
  },
  mounted() {
    bus.$on("changeDashboardStatus", () => {
      this.dashBoard = !this.dashBoard;
    });
    bus.$on("sendUserRole", data => {
      this.userRole = data;
    });
    bus.$on("changeLoginStatus", data => {
      this.loggedIn = data;
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans&display=swap");

.textStyle {
  font-family: "DM Sans", sans-serif;
}
</style>
