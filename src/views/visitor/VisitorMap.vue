<template>
  <div>
    <div id="campaignMap" class="campaignMap"></div>
  </div>
</template>

<script>
import axios from "axios";
const google = window.google;
var map;
// var infowindow;
var srilankan_bounds = {
  north: 10.02,
  south: 5.715,
  west: 79.4,
  east: 82
};
var sl_center = {
  lat: 7.8731,
  lng: 80.7718
};
export default {
  name: "VisitorMap",
  data() {
    return {
      search: "",
      campaigns: [],
      userType: "admin",
      pos: [],
      image: "blue.png"
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
              campaign.time
          });
        });
      })
      .catch(e => {
        console.log("Error: " + e);
      });

    map = new google.maps.Map(document.getElementById("campaignMap"), {
      zoom: 6,
      center: sl_center,
      gestureHandling: "cooperative",
      //map doesn't go away from sri lanka
      restriction: {
        latLngBounds: srilankan_bounds,
        strictBounds: false
      }
    });
    // var _this = this;
    new google.maps.Geocoder();
  },
  methods: {
    loadMarkers: function() {
      //to access "this" variable in the file
      var _this = this;

      //calling the API and get data
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
    //calling the function when the page loads
    this.loadMarkers();
    // this.handleLocationError();
  }
};
</script>

<style scoped>
#campaignMap {
  height: 560px;
  width: 100%;
  padding: 10px;
}
</style>
