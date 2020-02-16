<template>
  <v-container>
    <v-container class="mt-10">
      <v-row justify="center">
        <v-col cols="12">
          <v-tabs fixed-tabs background-color="light-black" dark>
            <v-tab to="/admin/charts/donor">Donors</v-tab>
            <v-tab to="/admin/charts/campaign">Campaigns</v-tab>
            <v-tab to="/admin/charts/organizers">Campaign Organizers</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <router-view></router-view>

        <!-- <router-view></router-view>
      
      <v-col cols="12" sm="6">
        <v-card class="mx-auto">
            <v-toolbar flat color="grey darken-3" dark>
              <v-spacer></v-spacer>
              <v-toolbar-title>Registered Donors by Blood Type</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <Doughnutchart></Doughnutchart>
              <Piechart></Piechart>
              <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
            </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto">
            <v-toolbar flat color="grey darken-3" dark>
              <v-toolbar-title>Registerd Blood Donors in This Month</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
               
              <Piechart></Piechart>
              <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
            </v-card-text>
          </v-card>
        </v-col>-->
      </v-row>
    </v-container>
    <!-- <v-container>
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
            <v-toolbar-title
              >Registerd Blood Donors in This Month</v-toolbar-title
            >
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
    </v-container>-->
  </v-container>
</template>

<script>
// import AdminChartsDonor from "../admin/AdminChartsDonor";
// import Piechart from "../../components/Piechart";
// import Doughnutchart from "../../components/Doughnutchart";

export default {
  components: {
    // Piechart,
    //  Doughnutchart
    // AdminChartsDonor
  },
  data() {
    return {
      dataArray: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    };
  }
};
</script>
