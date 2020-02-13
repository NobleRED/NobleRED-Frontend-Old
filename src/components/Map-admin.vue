<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
          class="ml-5"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          v-if="userType === 'admin' || userType === 'organizer'"
          small
          color="success"
          class="ml-3"
          to="/donor/newcampaign"
        >
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>
      <v-container id="campaignMap"></v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
const google = window.google;
var map;
// var campaigns;
// var geocoder;
var infowindow;
// var __this = this;
// var userType;
// var _this_;
// var pos;
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
      search: "",
      campaigns: [],
      userType: "admin",
      pos: [],
      image: "blue.png"
      // loading: true //organizer
    };
  },
  mounted: function() {
    // calling the api and getting the markers
    axios
      .get("http://localhost:4200/api/campaigns/accepted")
      .then(response => {
        // push data to campaigns array
        this.campaigns = response.data;
        this.campaigns.forEach(campaign => {
          new google.maps.Marker({
            position: { lat: campaign.lat, lng: campaign.lng },
            map: map,
            animation: google.maps.Animation.DROP,
            title:
              "Address: " +
              campaign.address +
              "\nDate: " +
              campaign.date +
              "\nTime: " +
              campaign.time,
            icon:
              "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F1Gray.png?alt=media&token=d395b5c4-160a-443e-bee3-3833ee3bd235"
          });
        });
      })
      .catch(e => {
        console.log("Error: " + e);
      });

    map = new google.maps.Map(document.getElementById("campaignMap"), {
      zoom: 12,
      // center: adrs.center,
      scrollwheel: true,
      //map doesn't go away from sri lanka
      restriction: {
        latLngBounds: srilankan_bounds,
        strictBounds: false
      }
    });
    var _this = this;
    // var infowindow = new google.maps.InfoWindow();

    // geocoder =
    new google.maps.Geocoder();

    // HTML5 GEOLOCATION
    if (navigator.geolocation) {
      // infowindow = new google.maps.InfoWindow();
      navigator.geolocation.getCurrentPosition(
        function(position) {
          _this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // _this_ = this;
          // __this.infoWindow.setPosition(pos);
          // __this.infoWindow.setContent("Your Location");
          // __this.infoWindow.open(map);
          map.setCenter(_this.pos);
          new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            map: map,
            center: _this.pos,
            radius: 5000
          });
          new google.maps.Marker({
            position: { lat: _this.pos.lat, lng: _this.pos.lng },
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Campaign Marker",
            icon:
              "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2Fperson1.png?alt=media&token=064f0817-3fcc-4b9d-9416-e06cd9c0c2b5",
            size: new google.maps.Size(20, 32)
          });
          console.log("HEReeeeeeeE", _this.pos);
        },
        function() {
          // handleLocationError(true, infowindow, map.getCenter());
        }
      );
    } else {
      // if browser doesn't support Geolocation
      this.handleLocationError(false, infowindow, map.getCenter());
    }

    // if (userType === "organizer" || userType === "donor") {
  },
  methods: {
    loadMarkers: function() {
      //to access "this" variable in the file
      var _this = this;

      //calling the API and get data
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
    handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  },
  beforeMount() {
    //calling the function when the page loads
    this.loadMarkers();
    // this.handleLocationError();
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
