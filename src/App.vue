<template>
  <v-app class="textStyle">
    <Appbar></Appbar>
    <Dashboard></Dashboard>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard";
import Appbar from "./components/Appbar";

export default {
  name: "App",

  components: {
    Dashboard,
    Appbar
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans&display=swap");

.textStyle {
  font-family: "DM Sans", sans-serif;
}
</style>
