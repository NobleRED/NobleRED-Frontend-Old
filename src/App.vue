<template>
  <v-app class="textStyle">
    <div v-if="loggedIn">
      <div v-if="userType === 'admin'">
        <Appbar></Appbar>
        <AdminDashboard></AdminDashboard>
      </div>
      <div v-else-if="userType === 'donor'">
        <Appbar></Appbar>
        <DonorDashboard></DonorDashboard>
      </div>
      <div v-else-if="userType === 'organizer'">
        <Appbar></Appbar>
        <OrganizerDashboard></OrganizerDashboard>
      </div>
    </div>
  </v-app>
</template>

<script>
import AdminDashboard from "./views/admin/AdminDashboard";
import DonorDashboard from "./views/donor/DonorDashboard";
import OrganizerDashboard from "./views/organizer/OrganizerDashboard";
import Appbar from "./components/Appbar";

export default {
  name: "App",

  components: {
    AdminDashboard,
    DonorDashboard,
    OrganizerDashboard,
    Appbar
  },

  data: () => ({
    userType: "admin",
    loggedIn: true
  }),
  created() {
    // this.userType = this.$store.getters.session.role;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans&display=swap");

.textStyle {
  font-family: "DM Sans", sans-serif;
}
</style>
