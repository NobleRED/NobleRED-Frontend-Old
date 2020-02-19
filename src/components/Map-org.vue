<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newCampaignForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>
      <v-container id="campaignMap"></v-container>
    </v-card>
    <v-card class="mt-10 mb-10">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2Fperson1.png?alt=media&token=064f0817-3fcc-4b9d-9416-e06cd9c0c2b5"
      />Your Location
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F1Gray.png?alt=media&token=d395b5c4-160a-443e-bee3-3833ee3bd235"
      />Last four months
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F2Red.png?alt=media&token=0d30ef6d-91bc-4bc2-a0f2-71419f46d633"
      />today to four months
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F3Orange.png?alt=media&token=6071cb4b-5ab2-473d-8ad1-72158f789b27"
      />after four months upto eight months
      <img
        src="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F4Yellow.png?alt=media&token=20c6df3f-9327-48f5-8789-8793f61e197e"
      />after eight months
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
const google = window.google;
var map;
var infowindow;
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
      image: "blue.png",
      colors: [
        "1Gray.png?alt=media&token=d395b5c4-160a-443e-bee3-3833ee3bd235",
        "2Red.png?alt=media&token=0d30ef6d-91bc-4bc2-a0f2-71419f46d633",
        "3Orange.png?alt=media&token=6071cb4b-5ab2-473d-8ad1-72158f789b27",
        "4Yellow.png?alt=media&token=20c6df3f-9327-48f5-8789-8793f61e197e"
      ]
    };
  },
  mounted: function() {
    // calling the api and getting the markers
    axios
      .get("http://localhost:4200/api/maps/greymarkers")

      .then(response => {
        // push data to campaigns array
        this.campaigns = response.data;
        this.campaigns.forEach(campaign => {
          var Deff = campaign.dateDeff;
          var i;
          if (Deff <= 4 && Deff > 0) {
            i = 0;
          } else if (Deff <= 0 && Deff > -4) {
            i = 1;
          } else if (parseInt(Deff) <= -4 && parseInt(Deff) > -8) {
            i = 2;
          } else if (Deff <= -8) {
            i = 3;
          }
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
              "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2F" +
              this.$data.colors[i]
          });
        });
      })
      .catch(e => {
        console.log("Error: " + e);
      });

    map = new google.maps.Map(document.getElementById("campaignMap"), {
      zoom: 12,
      scrollwheel: true,
      //map doesn't go away from sri lanka
      restriction: {
        latLngBounds: srilankan_bounds,
        strictBounds: false
      }
    });
    var _this = this;
    // var infowindow = new google.maps.InfoWindow();
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

            title: "Your Location",

            icon:
              "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fmarker-icons%2Fperson1.png?alt=media&token=064f0817-3fcc-4b9d-9416-e06cd9c0c2b5",
            size: new google.maps.Size(20, 32)
          });
          console.log("HEReeeeeeeE", _this.pos);
        },
        function() {
          this.handleLocationError(true, infowindow, map.getCenter());
        }
      );
    } else {
      // if browser doesn't support Geolocation
      this.handleLocationError(false, infowindow, map.getCenter());
    }
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
    this.handleLocationError();
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
