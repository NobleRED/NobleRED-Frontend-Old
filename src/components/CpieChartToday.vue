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

      <v-data-table :headers="headers1" :items="campaignsToday" :loading="loading">
        <template v-slot:item="row">
          <tr>
            <td>{{row.item.organizerName}}</td>
            <td>{{row.item.address}}</td>
            <td>{{row.item.time}}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CampaignDetailsTable",
  components: {

  },
  data() {
    return {
      loading: true,

      headers1: [
        { text: "Organizer Name", value: "organizerName" },
        { text: "Address", value: "address" },
        { text: "Time", value: "time" }
      ],
      campaigns: [],
      campaignsToday: []
      
    };
  },
  methods: {
    
    loadCampaigns: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/campaignstoday")
        .then(response => {
          // push data to the array
          _this.campaignsToday = response.data;
          
         
          

          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadCampaigns();
  }
};
</script>
