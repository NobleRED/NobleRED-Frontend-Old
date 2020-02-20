/* eslint-disable prettier/prettier */
<template>
  <v-container bg fill-height grid-list-md text-xs-center class="mt-2">
    <v-layout row wrap align-center>
      <v-flex :class="`d-flex justify-center text-center`">
        <v-card :loading="loading" class="mx-auto my-12 mt-10" max-width="300">
          <v-avatar color="grey" size="300" style="align: center">
            <v-img :src="user.photoURL" alt="Profile Pic"></v-img>
          </v-avatar>

          <v-card-text>
            <vrow>
              <vcol>
                <h2>{{ user.displayName }}</h2>
                <div class="subtitle-1">{{ user.email }}</div>
                <b>
                  <h4 class="subtitle-1">Last donated date - {{ lastDonatedDate }}</h4>
                </b>
              </vcol>
            </vrow>

            <v-row v-if="isEligible">
              <v-col>
                <h2 style="color:#4CAF50">You are eligible to donate blood</h2>
              </v-col>
            </v-row>
            <div v-if="!isEligible">
              <v-row>
                <v-col>
                  <h2 style="color:#B71C1C;">You are not eligible to donate blood until</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h1 style="color:#B71C1C;">{{ nextEligibleDate }}</h1>
                </v-col>
              </v-row>
            </div>

            <!-- <v-row align="right" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>-->
            <v-row class="mb-n2">
              <v-col cols="12">
                <h3 style="color:">Select your last blood donated date below</h3>
              </v-col>
            </v-row>
            <v-row class="mb-n2">
              <v-col cols="12">
                <v-date-picker
                  v-model="lastDonatedDate"
                  color="#B71C1C"
                  full-width
                  :landscape="$vuetify.breakpoint.smAndUp"
                  :max="now"
                ></v-date-picker>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn
                  color="#B71C1C"
                  dark
                  @click="updateLastDonatedDate()"
                >Update the last blood donated date</v-btn>
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-col cols="12">
                <v-btn
                  color="#B71C1C"
                  dark
                  @click="getNextEligibleDate()"
                >Get your next eligible date</v-btn>
              </v-col>
            </v-row>-->
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from "../../plugins/firebaseConfig";
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      user: "user",
      loggedIn: "loggedIn"
    })
  }
};
</script>

<style></style>
