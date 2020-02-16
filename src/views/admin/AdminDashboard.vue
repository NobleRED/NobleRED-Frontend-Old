<template>
  <v-app id="inspire" class="textStyle">
    <v-navigation-drawer
      style="background-color: #B71C1C; "
      :dark="true"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :fixed="true"
      :mini-variant="$vuetify.breakpoint.smAndDown"
      app
    >
      <v-flex :class="`d-flex justify-center pt-5 `" style="background-color:#424242">
        <p style="font-size:24px; color:white" class="font-weight-medium">Admin</p>
      </v-flex>

      <v-list dense>
        <v-list-item-group v-model="item" color="light">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Content of the pages -->
    <v-content>
      <v-container fluid>
        <v-row align="center">
          <router-view></router-view>
          <router-view name="donor"></router-view>
          <!-- Default chart view -->
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Appbar from "./Appbar";
// import { bus } from "../main";
export default {
  components: {
    // Appbar
  },
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: true,
    item: 1,
    items: [
      { icon: "mdi-chart-pie", text: "Dashboard", link: "/admin/charts" },
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
      // {
      //   icon: "mdi-chevron-up",
      //   "icon-alt": "mdi-chevron-down",
      //   text: "Posts",
      //   model: false,
      //   children: [
      //     { icon: "mdi-chart-pie", text: "Donation Posts" },
      //     { icon: "mdi-calendar-multiple-check", text: "Campaign Posts" }
      //   ]
      // },
      {
        icon: "mdi-map-marker-multiple",
        text: "Blood Donation Campaigns",
        link: "/admin/map"
      },
      {
        icon: "mdi-water",
        text: "Donation Posts",
        link: "/admin/BloodDonationPosts"
      },
      {
        icon: "mdi-calendar-multiple-check",
        text: "Campaign Posts",
        link: "/admin/campaigns"
      },
      {
        icon: "mdi-account-switch",
        text: "Medical Teams",
        link: "/admin/medicalteams"
      },
      { icon: "mdi-message-text", text: "Notifications" }
    ]
  })
  // methods: {
  //   sendToPage(item) {}
  // }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans&display=swap");

.textStyle {
  font-family: "DM Sans", sans-serif;
}
</style>
