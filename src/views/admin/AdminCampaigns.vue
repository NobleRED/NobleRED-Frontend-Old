/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>
        <v-text-field v-model="search1" label="Search" single-line hide-details class="ml-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newCampaignForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>

      <v-data-table :headers="headers1" :items="campaigns" :search="search1" :loading="loading">
        <template v-slot:item="row">
          <tr>
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
        <v-text-field v-model="search2" label="Search" single-line hide-details class="ml-5"></v-text-field>
      </v-toolbar>

      <v-data-table
        :headers="headers2"
        :items="campaignRequests"
        :search="search2"
        :loading="loading"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.requestID }}</td>
            <td>{{ row.item.organizerID }}</td>
            <td>{{ row.item.organizerName }}</td>
            <td>{{ row.item.address }}</td>
            <td>{{ row.item.district }}</td>
            <td>{{ row.item.province }}</td>
            <td>{{ row.item.date }}</td>
            <td>{{ row.item.time }}</td>
            <td>{{ row.item.publishedDateTimeAgo }}</td>
            <td>
              <v-btn class="ma-1" text icon small color="success" @click="acceptCampaign(row.item)">
                <v-icon dark>mdi-check</v-icon>
              </v-btn>
              <v-btn class="ma-1" text icon small color="error">
                <v-icon dark>mdi-close</v-icon>
              </v-btn>
            </td>
            <!-- <v-dialog v-model="dialog" max-width="400">
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

                  Request made {{ selectedRequest.publishedDateTimeAgo }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-1"
                    color="error"
                    small
                    @click="dialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    class="ma-1"
                    color="success"
                    small
                    @click="acceptCampaign(row.item)"
                    >Accept</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>-->
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import firebase from "../../plugins/firebaseConfig";
var moment = require("moment");
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
        { text: "Request ID", value: "requestID" },
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
      var selected = item;
      var now = moment().format();
      // var _this = this;
      // console.log(this.selectedRequest.organizerID);
      // axios
      //   .post(
      //     "http://localhost:4200/api/campaigns/accept/" + this.selectedRequest
      //   )
      //   .then(function() {
      //     console.log("success!");
      //   })
      //   .catch(function(error) {
      //     console.error("Error updating document: ", error);
      //   });

      firebase.db
        .collection("campaigns")
        .add({
          organizerID: selected.organizerID,
          organizerName: selected.organizerName,
          address: selected.address,
          contactNo: selected.contactNo,
          province: selected.province,
          district: selected.district,
          date: selected.date,
          time: selected.time,
          publishedDateTime: now,
          lat: selected.lat,
          lng: selected.lng
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      firebase.db
        .collection("campaigns-requests")
        .doc(selected.requestID.toString())
        .update({
          status: "accepted"
        })
        .then(() => {
          console.log("Updated");
        });

      this.$router.go("/");
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadCampaignRequests();
    this.loadCampaigns();
  }
};
</script>
