/* eslint-disable no-unused-vars */ /* eslint-disable no-unused-vars */
<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Registered Blood Donation Campaigns</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/donor/signup">
          <v-icon class="pr-1">mdi-plus</v-icon>Add New Campaign
        </v-btn>
      </v-toolbar>
      <v-container id="campaignMap"></v-container>
    </v-card>
  </v-container>
</template>

<script>
const google = window.google;
export default {
  name: "map",
  data() {
    return {
      marker1: "",
      marker2: "",
      marker3: "",
      marker4: "",
      marker5: ""
    };
  },
  mounted: function() {
    var coords = { lat: 6.8868, lng: 79.9187 };
    var coords1 = { lat: 6.0402, lng: 80.220642 };
    var coords2 = { lat: 6.927079, lng: 79.861244 };
    var coords3 = { lat: 7.09115, lng: 79.999634 };
    var coords4 = { lat: 8.31219, lng: 80.418716 };

    var map = new google.maps.Map(document.getElementById("campaignMap"), {
      zoom: 8,
      center: coords,
      scrollwheel: true
    });

    this.marker1 = new google.maps.Marker({
      position: coords1,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Sri Lanka"
    });

    this.marker2 = new google.maps.Marker({
      position: coords2,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Sri Lanka"
    });

    this.marker3 = new google.maps.Marker({
      position: coords3,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Sri Lanka"
    });

    this.marker4 = new google.maps.Marker({
      position: coords4,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Sri Lanka"
    });
  },
  addCoordinate: function() {}
};
</script>

<style scoped>
#campaignMap {
  height: 500px;
  width: 100%;
  padding: 10px;
}
</style>
