/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donors</v-toolbar-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
          class="ml-5"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newDonorForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Donor
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="donors"
        :search="search"
        :loading="loading"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import firebase from "../../plugins/firebaseConfig";
// import NewCampaignForm from "../NewCampaignForm";

export default {
  name: "DonorDetailsTable",
  components: {
    // NewCampaignForm
  },
  data() {
    return {
      search: "",
      loading: true,
      dialog: false,
      headers: [
        { text: "Donor ID", value: "donorID" },
        { text: "First Name", value: "fname" },
        { text: "Last Name", value: "lname" },
        { text: "Blood Type", value: "bloodType" },
        { text: "Address", value: "address" },
        { text: "Contact No", value: "contactNo" },
        { text: "NIC", value: "nic" },
        { text: "DOB", value: "dob" },
        { text: "Email Address", value: "email" },
        { text: "Last Donated Date", value: "lastDonatedDate" },
        { text: "Registered", value: "registeredDateTimeAgo" },
        { text: "Status", value: "status" }
      ],
      donors: []
    };
  },
  methods: {
    loadDonors: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/donors")
        .then(response => {
          // push data to the array
          _this.donors = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    updateDOnor(item) {
      var selected = item;
      this.dialog = true;
      firebase.db
        .collection("campaigns-requests")
        .doc(selected.requestID.toString())
        .update({
          status: "accepted"
        })
        .then(() => {
          console.log("Updated");
          this.$router.go("/admin/campaigns");
        });
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadDonors();
  }
};
</script>
