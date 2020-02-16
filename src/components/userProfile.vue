<template>
  <v-container bg fill-height grid-list-md text-xs-center class="mt-2">
    <v-layout row wrap align-center>
      <v-flex :class="`d-flex justify-center text-center`">
        <v-card :loading="loading" class="mx-auto my-12 mt-10" max-width="300">
          <v-avatar color="grey" size="300" style="align: center">
            <v-img :src="user.photoURL" alt="Profile Pic"></v-img>
          </v-avatar>

          <v-card-text>
            <h2>{{ user.displayName }}</h2>

            <div class="subtitle-1">
              {{ user.email }}
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
            </v-row> -->
            <div class="subtitle-1">
              Next Eligible Date : 2020-03-06
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">
              Edit
            </v-btn>
          </v-card-actions>
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
