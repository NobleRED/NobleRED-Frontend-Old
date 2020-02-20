<template>
  <v-container>
    <v-card width="100%" height="100%">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Organizers</v-toolbar-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
          class="ml-5"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newOrganizerForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Organizer
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="organizers"
        :search="search"
        :loading="loading"
      >
        <template v-slot:item="row">
          <tr @click="showAlert(row.item)">
            <td>{{ row.item.organizerID }}</td>
            <td>{{ row.item.organizerName }}</td>
            <td>{{ row.item.contactPerson }}</td>
            <td>{{ row.item.contactPersonNIC }}</td>
            <td>{{ row.item.address }}</td>
            <td>{{ row.item.contactNo }}</td>
            <td>{{ row.item.email }}</td>
            <td>{{ row.item.registeredDateTimeAgo }}</td>
            <td>{{ row.item.status }}</td>
            <!-- <td>
              <v-btn class="mx-2" fab dark x-small color="primary">
                <v-icon dark>mdi-account-box</v-icon>
              </v-btn>
            </td>-->
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
  name: "OrganizerDetailsTable",
  components: {
    // NewCampaignForm
  },
  data() {
    return {
      search: "",
      loading: true,
      headers: [
        { text: "Organizer ID", value: "organizerID" },
        { text: "Organizer Name", value: "organizerName" },
        { text: "Conatact Person", value: "contactPerson" },
        { text: "Conatact Person NIC", value: "contactPersonNIC" },
        { text: "Address", value: "address" },
        { text: "Contact No", value: "contactNo" },
        { text: "Email Address", value: "email" },
        { text: "Registered At", value: "registeredDateTimeAgo" },
        { text: "Status", value: "status" }
      ],
      organizers: []
    };
  },
  methods: {
    loadOrganizers: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/organizers")
        .then(response => {
          // push data to the array
          _this.organizers = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    showAlert(a) {
      if (event.target.classList.contains("btn__content")) return;
      alert("Alert! \n" + a.name);
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadOrganizers();
  }
};
</script>
