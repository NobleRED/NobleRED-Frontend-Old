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
<<<<<<< HEAD
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <router-view></router-view>
          <router-view name="donor"></router-view> <!-- Default chart view -->
        </v-row>
      </v-container>
    </v-content>
=======

    <v-content>
      <v-container class="" fluid> 
        <v-row align="center" justify="center">
        
          <router-view></router-view>
          <!-- <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn :href="source" icon large target="_blank" v-on="on">
                <v-icon large>mdi-code-tags</v-icon>
              </v-btn>
            </template>
            <span>Source</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                href="https://codepen.io/johnjleider/pen/MNYLdL"
                target="_blank"
                v-on="on"
              >
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span>Codepen</span>
          </v-tooltip> -->
        </v-row>
      </v-container>
    </v-content>

    <!-- Content of the pages -->

    <!-- <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="business" placeholder="Company" />
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mail" placeholder="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="notes" placeholder="Notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
>>>>>>> 40dddcb2da474375b82f046724d842328a58fa39
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
<<<<<<< HEAD
      {
        icon: "mdi-human",
        text: "Campaign Organizers",
        link: "/admin/organizers"
      },
=======
      { icon: "mdi-human", text: "Campaign Organizers" },
>>>>>>> 40dddcb2da474375b82f046724d842328a58fa39
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
<<<<<<< HEAD
      {
        icon: "mdi-account-switch",
        text: "Medical Teams",
        link: "/admin/medicalteams"
      },
=======
>>>>>>> 40dddcb2da474375b82f046724d842328a58fa39
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
