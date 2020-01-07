<template>
  <v-card class="mx-auto" max-width="300" max-height="300">
    <v-row>
      <v-col cols="12" v-for="blood_need_post in blood_need_posts" :key="blood_need_post.bloodType">
        <v-card>
          <v-layout>
            <v-flex>
              <v-img :src="blood_need_post.imgSrc" max-height="300" max-width="300"></v-img>
              <v-card-text>
                Urgently required
                <b>{{blood_need_post.bloodType}}</b> type of blood
                for patient.
                Volunteers please come forward and help us.
                If you are willing to donate blood please contact
                <b>{{blood_need_post.userName}}</b> via
                <b>{{blood_need_post.phoneNumber}}</b>
                <b>. DONATE BLOOD AND SAVE LIFE</b>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "BloodNeedPost",

  data() {
    return {
      blood_need_posts: []
    };
  },
  methods: {
    loadPosts: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/blood_needed_posts")
        .then(response => {
          // push data to the array
          _this.blood_need_posts = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadPosts();
  }
};
</script>


