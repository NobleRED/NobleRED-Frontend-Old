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
        <v-text-field
          v-model="search1"
          label="Search"
          single-line
          hide-details
          class="ml-5"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/admin/newcampaign">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers1"
        :items="campaigns"
        :search="search1"
        :loading="loading"
      >
        <template v-slot:item="row">
          <tr @click="showAlert(row.item)">
            <td>{{ row.item.organizerID }}</td>
            <td>{{ row.item.organizerName }}</td>
            <td>{{ row.item.address }}</td>
            <td>{{ row.item.district }}</td>
            <td>{{ row.item.province }}</td>
            <td>{{ row.item.date }}</td>
            <td>{{ row.item.time }}</td>
            <td>{{ row.item.publishedDateTimeAgo }}</td>
            <td>
              <v-btn class="ma-1" text icon small color="primary">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ma-1" text icon small color="error">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-card width="100%" height="100%" class="mt-5">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Blood Donation Campaigns Requests</v-toolbar-title>
        <v-text-field
          v-model="search2"
          label="Search"
          single-line
          hide-details
          class="ml-5"
        ></v-text-field>
      </v-toolbar>

      <v-data-table
        :headers="headers2"
        :items="campaignRequests"
        :search="search2"
        :loading="loading"
      >
        <template v-slot:item="row">
          <tr @click="openDialog(row.item)">
            <td>{{ row.item.organizerID }}</td>
            <td>{{ row.item.organizerName }}</td>
            <td>{{ row.item.address }}</td>
            <td>{{ row.item.district }}</td>
            <td>{{ row.item.province }}</td>
            <td>{{ row.item.date }}</td>
            <td>{{ row.item.time }}</td>
            <td>{{ row.item.publishedDateTimeAgo }}</td>
            <td>
              <v-btn
                class="ma-1"
                text
                icon
                small
                color="success"
                @click="acceptCampaign(row.item)"
              >
                <v-icon dark>mdi-check</v-icon>
              </v-btn>
              <v-btn class="ma-1" text icon small color="error">
                <v-icon dark>mdi-close</v-icon>
              </v-btn>
            </td>
            <v-dialog v-model="dialog" max-width="400">
              <v-card>
                <v-card-title class="headline"
                  >Review the Campaign Request</v-card-title
                >
                <v-card-text>
                  <b>Organizer Name</b>
                  - {{ selectedRequest.organizerName }}
                  <br />
                  <b>Address of the Campaign</b>
                  <br />
                  {{ selectedRequest.address }}
                  <br />
                  <b>{{ selectedRequest.province }}</b> Province
                  <b>{{ selectedRequest.district }}</b> District
                  <br />
                  <b>Requested Date</b>
                  - {{ selectedRequest.date }}
                  <br />
                  <v-btn
                    color="primary"
                    @click="dialog = false"
                    outlined
                    x-small
                    >Check Medical Team Availability</v-btn
                  >
                  <br />
                  Request made {{ selectedRequest.publishedDateTimeAgo }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-1"
                    color="error"
                    small
                    @click="acceptCampaign(row.item)"
                    >Cancel</v-btn
                  >
                  <v-btn
                    class="ma-1"
                    color="success"
                    small
                    @click="dialog = false"
                    >Accept</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </tr>
        </template>
      </v-data-table>
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
      dialog: false,
      selectedRequest: [],
      headers1: [
        { text: "Organizer ID", value: "organizerID" },
        { text: "Organizer Name", value: "organizerName" },
        { text: "Address", value: "address" },
        { text: "District", value: "district" },
        { text: "Province", value: "province" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Ago", value: "publishedDateTimeAgo" },
        { text: "Change/Delete", value: "" }
      ],
      headers2: [
        { text: "Organizer ID", value: "organizerID" },
        { text: "Organizer Name", value: "organizerName" },
        { text: "Address", value: "address" },
        { text: "District", value: "district" },
        { text: "Province", value: "province" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Ago", value: "publishedDateTimeAgo" },
        { text: "Accept/Reject", value: "" }
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
        .get("http://localhost:4200/api/campaigns/requests")
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
        .get("http://localhost:4200/api/campaigns/accepted")
        .then(response => {
          // push data to the array
          _this.campaigns = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    openDialog(item) {
      this.selectedRequest = item;
      this.dialog = true;
    },
    acceptCampaign(item) {
      this.selectedRequest = item;
      axios
        .post(
          "http://localhost:4200/api/campaigns/accept/" +
            this.selectedRequest.campaignID,
          {}
        )
        .then(function() {
          console.log("success!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
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
