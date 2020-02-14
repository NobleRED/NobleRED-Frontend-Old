<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Register New Campaign</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form1">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                name="organizerID"
                label="Organizer ID"
                placeholder="XXXX"
                id="organizerID"
                v-model="formData.organizerID"
                type="text"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                name="organizerName"
                label="Organizer Name"
                placeholder="John Doe"
                id="organizerName"
                v-model="formData.organizerName"
                type="text"
                :rules="nameRules"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                name="address"
                label="Address"
                placeholder="Address"
                id="address"
                v-model="formData.address"
                type="text"
                :rules="adrsRules"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                name="contactno"
                label="Contact No"
                placeholder="Contact No"
                v-model="formData.contactNo"
                type="text"
                :rules="phnRules"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                name="province"
                label="Province"
                placeholder="Province"
                id="province"
                v-model="formData.province"
                :items="provinces"
                :rules="requiredRule"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                name="district"
                label="District"
                placeholder="District"
                id="district"
                :items="districts"
                :rules="requiredRule"
                required
                v-model="formData.district"
                outlined
                style="background-color: transparent;"
                small
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" justify="center">
              <!-- <v-text-field
                name="date"
                label="Date"
                placeholder
                id="date"
                type="date"
                :rules="requiredRule"
                v-model="formData.date"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>-->
              <v-date-picker
                v-model="formData.date"
                color="grey darken-3"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
              ></v-date-picker>
            </v-col>

            <v-col cols="12" sm="6">
              <!-- <v-text-field
                name="time"
                label="Time"
                placeholder
                id="time"
                type="time"
                :rules="requiredRule"
                v-model="formData.time"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>-->
              <v-time-picker
                v-model="formData.time"
                :landscape="$vuetify.breakpoint.smAndUp"
                ampm-in-title
                color="grey darken-3"
                full-width
              ></v-time-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <router-link to="/admin/campaigns" tag="v-btn">
                <v-btn type="submit" @click="onSubmit" color="primary">Submit</v-btn>
              </router-link>
              <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <qrcode :value="value" color="color" />
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>

    <!-- <v-card
        width="50%"
        height="100%"
        :title="formData.district + districtKeyword"
        :sub-title="formData.province + provinceKeyword"
        img-src="https://i.ibb.co/4fmcVct/blood-donation-campaign.jpg"
        img-alt="Image"
        img-top
        border-variant="secondary"
      >
        <v-card-text>
          A Blood Donation Campaign organized by
          <b>{{formData.organizerName}}</b>
          will be held on
          <b>{{formData.date}}</b> at
          <b>{{formData.address}}</b> from
          <b>{{formData.time}}</b> onwards.
        </v-card-text>
    </v-card>-->
  </v-container>
</template>

<script>
//import firebase from "../plugins/firebaseConfig";
import axios from "axios";
import Qrcode from "vue-qrcode";

var moment = require("moment");
moment().format();

export default {
  name: "NewCampaignForm",
  components: {
    Qrcode
  },
  data() {
    return {
      value: "",
      color: { dark: "#FFFFFF", light: "#000000" },
      show: true,
      date: "",
      latitude: "",
      longitude: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      adrsRules: [v => !!v || "Address is required"],
      phnRules: [
        v => !!v || "Contact no is required",
        v => /\d{10}/.test(v) || "Contact No must have 10 digits"
      ],
      requiredRule: [v => !!v || "Required"],
      provinceKeyword: " Province ",
      districtKeyword: " District ",
      provinces: [
        "Central",
        "Eastern",
        "North Central",
        "Northern",
        "North Western",
        "Sabaragamuwa",
        "Southern",
        "Uva",
        "Western"
      ],
      districts: [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullaitivu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya"
      ],
      formData: {
        organizerID: "",
        organizerName: "",
        address: "",
        province: "",
        district: "",
        date: new Date().toISOString().substr(0, 10),
        time: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      var _this = this;
      // using moment to get current date and time
      var now = moment().format();
      console.log("time :" + now);
      // this.getCoords();

      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: _this.formData.address,
            key: "AIzaSyBFcoqCscxtpmLZup4lQCrf7ZcQEk_UAeY"
          }
        })
        .then(function(response) {
          // log full response
          console.log(" ressss", response.data.results[0].geometry.location);

          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;

          axios
<<<<<<< HEAD
            .post("http://localhost:4200/api/campaigns/new", {
=======
            .post("http://localhost:4200/api/campaigns", {
>>>>>>> a48051d15d23b0bf46b49bee505079cd25d843c3
              organizerID: _this.formData.organizerID,
              organizerName: _this.formData.organizerName,
              address: _this.formData.address,
              province: _this.formData.province,
              district: _this.formData.district,
              date: _this.formData.date,
              time: _this.formData.time,
              publishedDateTime: now,
              lat: lat,
              lng: lng,
              imgSrc:
                "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fcampaign_posts%2Fblood%20donation%20campaign.jpg?alt=media&token=35210ae9-78da-466b-aed2-866891e068e3"
            })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              _this.value = docRef.id;
              this.$router.push({
                name: "adminMap"
              });
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });

          /*

          firebase.db
            .collection("posts")
            .doc("campaign_posts")
            .collection("campaign_posts")
            .add({
              organizerID: _this.formData.organizerID,
              organizerName: _this.formData.organizerName,
              address: _this.formData.address,
              province: _this.formData.province,
              district: _this.formData.district,
              date: _this.formData.date,
              time: _this.formData.time,
              publishedDateTime: now,
              lat: lat,
              lng: lng,
              imgSrc:
                "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fcampaign_posts%2Fblood%20donation%20campaign.jpg?alt=media&token=35210ae9-78da-466b-aed2-866891e068e3"
            })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              _this.value = docRef.id;
              this.$router.push("/admin/map");
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });



      axios
        .post("http://localhost:4200/api/campaignreq", {
             organizerID: _this.formData.organizerID,
              organizerName: _this.formData.organizerName,
              address: _this.formData.address,
              province: _this.formData.province,
              district: _this.formData.district,
              date: _this.formData.date,
              time: _this.formData.time,
              publishedDateTime: now,
              lat: lat,
              lng: lng,
              imgSrc:
                "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fcampaign_posts%2Fblood%20donation%20campaign.jpg?alt=media&token=35210ae9-78da-466b-aed2-866891e068e3"
        })
         .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              _this.value = docRef.id;
              this.$router.push("/admin/map");
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });

            */
        });
    },
    reset() {
      // reset function to clear text fields of the form
      this.$refs.form1.reset();
      this.formData.date = new Date().toISOString().substr(0, 10);
      this.formData.time = "";
    }
  }
};
</script>
