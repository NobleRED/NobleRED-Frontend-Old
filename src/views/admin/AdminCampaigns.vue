<template>
  <v-container>
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
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>
        <v-text-field v-model="search1" label="Search" single-line hide-details class="ml-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newcampaign">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>

      <v-data-table :headers="headers1" :items="campaigns" :search="search1" :loading="loading"></v-data-table>
    </v-card>

    <v-card width="100%" height="100%" class="mt-5">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Blood Donation Campaigns Requests</v-toolbar-title>
        <v-text-field v-model="search2" label="Search" single-line hide-details class="ml-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newcampaign">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers2"
        :items="campaignRequests"
        :search="search2"
        :loading="loading"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
// import NewCampaignForm from "../NewCampaignForm";

export default {
  name: "CampaignDetailsTable",
  components: {
    // NewCampaignForm
  },
  data() {
    return {
      search1: "",
      search2: "",
      loading: true,
      headers1: [
        { text: "Organizer ID", value: "organizerID" },
        { text: "Organizer Name", value: "organizerName" },
        { text: "Address", value: "address" },
        { text: "District", value: "district" },
        { text: "Province", value: "province" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Ago", value: "publishedDateTimeAgo" }
      ],
      headers2: [
        { text: "Organizer ID", value: "organizerID" },
        { text: "Organizer Name", value: "organizerName" },
        { text: "Address", value: "address" },
        { text: "District", value: "district" },
        { text: "Province", value: "province" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Ago", value: "publishedDateTimeAgo" }
      ],
      campaignRequests: [],
      campaigns: []
    };
  },
  methods: {
    loadCampaignRequests: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/campaignreq")
        .then(response => {
          // push data to the array
          _this.campaignRequests = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    loadCampaigns: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/campaigns")
        .then(response => {
          // push data to the array
          _this.campaigns = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadCampaignRequests();
    this.loadCampaigns();
  }
};
</script>
