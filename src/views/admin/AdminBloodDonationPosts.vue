<template>
  <v-container class="mt-10">
    <!-- <b-button variant="success" v-b-modal.newCampaignForm class="mb-5 mt-5">Add New Campaign</b-button>
    <div class="text-center">
      <b-spinner
        variant="secondary"
        style="width: 3rem; height: 3rem;"
        label="loadSpinner"
        v-show="spinner"
      ></b-spinner>
    </div>
    <b-modal
      id="newCampaignForm"
      size="xl"
      title="New Blood Donation Campaign"
      class="modalTitle"
      centered
    >
      <NewCampaignForm></NewCampaignForm>
    </b-modal>-->
    <v-card width="100%" height="100%" class="mt-10 mb-7">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Blood Needed Posts</v-toolbar-title>
        <v-text-field v-model="search" label="Search" single-line hide-details class="ml-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newBloodDonationForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add Blood Need Post
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="blood_need_posts"
        :search="search"
        :loading="loading"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NeededPostDetailsTable",

  data() {
    return {
      search: "",
      loading: true,
      dialog: false,
      headers: [
        { text: "User ID", value: "userID" },
        { text: "User Name", value: "userName" },
        { text: "Contact Number", value: "contact" },
        { text: "Blood Type", value: "bloodType" },
        { text: "Ago", value: "publishedDateTimeAgo" }
      ],
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
