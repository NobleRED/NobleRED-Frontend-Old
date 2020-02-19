/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */g
<template>
  <v-container>
    <section>
      <v-btn
        small
        color="success"
        to="/newCampaignForm"
        align-center
        v-if="role == 'Organizer' || role == 'Admin'"
      >
        <v-icon class="pr-1">mdi-plus</v-icon>Create new blood donation campaign
      </v-btn>

      <v-layout column wrap class="mt-1 my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap justify-center>
              <v-flex
                col12
                md3
                v-for="campaign_post in campaign_posts"
                :key="campaign_post.publishedDateTime"
                :cols="campaign_post.flex"
              >
                <v-card class="elevation-0" outlined>
                  <v-img
                    src="../assets/blood donation campaign.jpg"
                    class="white--text align-end"
                    position="center center"
                  ></v-img>
                  <v-card-text>
                    <b>Organizer :</b>
                    {{ campaign_post.organizerName }}
                    <br />
                    <b>Date :</b>
                    {{ campaign_post.date }}
                    <br />
                    <b>Time :</b>
                    {{ campaign_post.time }}
                    <br />
                    <b>Address :</b>
                    {{ campaign_post.address }}
                    <v-spacer></v-spacer>
                    <v-slot:footer>
                      <small class="text-muted">{{ campaign_post.publishedDateTimeAgo }}</small>
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
// import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "CampaignPosts",

  data() {
    return {
      role: "",
      campaign_posts: []
    };
  },
  methods: {
    loadCampaignPosts: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/campaigns/accepted")
        .then(response => {
          // push data to the array
          _this.campaign_posts = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    }
  },
  mounted() {
    this.role = localStorage.role;
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadCampaignPosts();
  }
};
</script>
