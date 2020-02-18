<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Registered Blood Donation Campaigns Province
              Wise</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <CpieChartProvince></CpieChartProvince>
            <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>

            <v-toolbar-title>Today Campaigns</v-toolbar-title>

/**
            <v-toolbar-title
              >Registerd Blood Donors By Gender Wise</v-toolbar-title
            >
            **/

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <cpieChartToday></cpieChartToday>
            <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CpieChartProvince from "../../components/CpieChartProvince.vue";
import CpieChartToday from "../../components/CpieChartToday.vue";
export default {
  components: {
    CpieChartProvince,
    CpieChartToday
  }
};
</script>
