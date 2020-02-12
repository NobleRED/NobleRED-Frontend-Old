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
        <v-img src="../assets/noblered logo 30x100.png" alt="Vuetify" />
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
    <v-btn outlined small color="#C62828">Sign In</v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon large v-show="loggedIn">
      <v-avatar size="32px" item>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/user_pro_pic%2FPSX_20181208_195134.jpg?alt=media&token=fab833a7-50d9-4efe-a40c-0b43f61c2757"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
// import { bus } from "../main";
export default {
  name: "Appbar",
  data() {
    return {
      drawer: null,
      loggedIn: true
    };
  },
  props: {}
};
</script>
