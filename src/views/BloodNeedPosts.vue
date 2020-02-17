/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */g
<template>
  <v-container class="mt-10 mb-10">
    <section>
      <v-btn small color="success" class="mt-10" to="/newBloodDonationForm" align-center>
        <v-icon class="pr-1">mdi-plus</v-icon>Add New Blood Need Post
      </v-btn>

      <v-layout column wrap class="mt-1 my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap justify-center>
              <v-flex
                col12
                md3
                v-for="blood_need_post in blood_need_posts"
                :key="blood_need_post.publishedDateTime"
                :cols="blood_need_post.flex"
              >
                <v-card class="elevation-0" outlined>
                  <v-img
                    :src="blood_need_post.imgSrc"
                    class="white--text align-end"
                    position="center center"
                  ></v-img>
                  <v-card-text>
                    Urgently required
                    <b>{{ blood_need_post.bloodType }}</b> type of blood for patient.
                    Volunteers please come forward and help us. If you are willing to
                    donate blood please contact
                    <b>{{ blood_need_post.userName }}</b> via
                    <b>{{ blood_need_post.phoneNumber }}</b>
                    <b>. DONATE BLOOD AND SAVE LIFE</b>
                    <v-spacer></v-spacer>
                    <v-slot:footer>
                      <small class="text-muted">
                        {{
                        blood_need_post.publishedDateTimeAgo
                        }}
                      </small>
                    </v-slot:footer>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "BloodNeedPosts",

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
