/* eslint-disable prettier/prettier */
<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex :class="`d-flex justify-center text-center`">
        <v-card :loading="loading" class="mx-auto my-12 mt-0">
          <v-avatar color="grey" size="300" style="align: center">
            <v-img :src="user.photoURL" alt="Profile Pic"></v-img>
          </v-avatar>

          <v-card-text>
            <v-row>
              <v-col>
                <h2>{{ user.displayName }}</h2>
                <div class="subtitle-1">{{ user.email }}</div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions></v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  data() {
    return {
      now: "",
      lastDonatedDate: "",
      nextEligibleDate: "",
      isEligible: false
    };
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
