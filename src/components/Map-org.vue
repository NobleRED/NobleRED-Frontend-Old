<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn small color="success" class="ml-3" @click="addCampaign">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn> -->
        <v-btn small color="success" class="ml-3" to="/donor/newcampaign">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>
      <v-container id="campaignMap"></v-container>
    </v-card>
  </v-container>
</template>

<script>
const google = window.google;
var map;
var srilankan_bounds = {
  north: 10.02,
  south: 5.715,
  west: 79.4,
  east: 82
};

export default {
  name: "CampaignMap",
  data() {
    return {
      tempMarker: "",
      marker1: "",
      marker2: "",
      marker3: "",
      marker4: "",
      marker5: ""
    };
  },
  mounted: function() {
    var campaignMarkers = {
      coords0: { center: { lat: 6.8868, lng: 79.9187 } },
      coords1: { center: { lat: 6.0402, lng: 80.220642 } },
      coords2: { center: { lat: 6.927079, lng: 79.861244 } },
      coords3: { center: { lat: 7.09115, lng: 79.999634 } },
      coords4: { center: { lat: 8.31219, lng: 80.418716 } }
    };
    var adrs = { center: { lat: 8.31219, lng: 80.418716 } };
    map = new google.maps.Map(document.getElementById("campaignMap"), {
      zoom: 13.25,
      center: adrs.center,
      scrollwheel: true,
      //map doesn't go away from sri lanka
      restriction: {
        latLngBounds: srilankan_bounds,
        strictBounds: false
      }
    });

    // geocoder =
    new google.maps.Geocoder();

    // var radius =
    new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map: map,
      center: adrs.center,
      radius: 4000
    });

    for (var campaign in campaignMarkers) {
      new google.maps.Marker({
        position: campaignMarkers[campaign].center,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Campaign Marker",
        color: "#0000FF"
      });
    }
    new google.maps.Marker({
      // icon: {
      //   path: "../assets/blue.png"
      // },
      position: adrs.center,
      map: map,
      // animation: google.maps.Animation.DROP,
      title: "Your Home",
      // label: "Home",
      fillColor: "yellow"
    });
  }
};
</script>

<style scoped>
#campaignMap {
  height: 500px;
  width: 100%;
  padding: 10px;
}
</style>
