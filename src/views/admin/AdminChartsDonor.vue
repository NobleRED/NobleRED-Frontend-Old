<template>
    <v-container>
        <v-row>
          <v-col cols="6" sm="6">
      <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Registered Donors by Blood Type</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <piechart></piechart>
            <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6">
      <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Registerd Blood Donors By Gender Wise</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <DoughnutGender></DoughnutGender>
            <v-btn x-large color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
    </v-col>
        </v-row>
    </v-container>
</template>



<script>

import Piechart from "../../components/Piechart.vue"
import DoughnutGender from "../../components/DoughnutGender.vue"
export default {
    components:{
        Piechart,
        DoughnutGender
    }
  
};
</script>

