<template>
  <v-app class="textStyle">
    <AppBarDashboard></AppBarDashboard>
  </v-app>
</template>

 <script>
import AppBarDashboard from "./components/AppBarDashboard";

export default {
  name: "App",
  components: {
    AppBarDashboard
  },

  data: () => ({}),
  created() {},
  mounted() {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans&display=swap");

.textStyle {
  font-family: "DM Sans", sans-serif;
}
</style>
