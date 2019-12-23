<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" max-width="400">
          <v-toolbar flat color="grey darken-3" dark>
            <v-toolbar-title>Registered Donors by Blood Type</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Piechart></Piechart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" max-width="400">
          <v-toolbar flat color="grey darken-3" dark>
            <v-toolbar-title>Registerd Blood Donors in This Month</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Doughnutchart></Doughnutchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" max-width="400">
          <v-toolbar flat color="grey darken-3" dark>
            <v-toolbar-title>Registered Campaigns - Province Wise</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Piechart></Piechart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto" max-width="400">
          <v-toolbar flat color="grey darken-3" dark>
            <v-toolbar-title>Registerd Blood Donors in This Month</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Doughnutchart></Doughnutchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Piechart from "../../components/Piechart";
import Doughnutchart from "../../components/Doughnutchart";
export default {
  components: {
    Piechart,
    Doughnutchart
  },
  data() {
    return {
      dataArray: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    };
  }
};
</script>