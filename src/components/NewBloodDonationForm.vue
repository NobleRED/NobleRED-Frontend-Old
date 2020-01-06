<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Blood Needed Post</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form1">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                name="userID"
                label="User ID"
                placeholder="XXXX"
                id="userID"
                v-model="formData.userID"
                type="text"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                name="userName"
                label="User Name"
                placeholder="John Doe"
                id="userName"
                v-model="formData.userName"
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
                placeholder="No. 5, Flower Road, Colombo"
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
                name="contact"
                label="Contact No"
                placeholder="Contact No"
                v-model="formData.contact"
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
                name="bloodType"
                label="Blood Type"
                placeholder="Blood Type"
                id="bloodType"
                v-model="formData.bloodType"
                :items="bloodTypes"
                :rules="requiredRule"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-btn type="submit" @click="onSubmit" color="primary">Submit</v-btn>
              <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
            </v-col>
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
import firebase from "../plugins/firebaseConfig";
var moment = require("moment");
moment().format();

export default {
  name: "NewCampaignForm",
  data() {
    return {
      show: true,
      date: "",
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

      bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      formData: {
        userID: "",
        userName: "",
        address: "",
        bloodType: "",
        contat: "",
        time: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      // using moment to get current date and time
      var now = moment().format();
      console.log("time :" + now);

      // firebase function call to add data to the database
      firebase.db
        .collection("posts")
        .doc("blood_needed_posts")
        .collection("blood_needed_posts")
        .add({
          userID: this.formData.userID,
          userName: this.formData.userName,
          address: this.formData.address,
          bloodType: this.formData.bloodType,
          contact: this.formData.contact,
          publishedDateTime: now,
          imgSrc:
            "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood_requesting_campaign.png?alt=media&token=2bb0c346-559d-46b0-924b-8cd21357db5d"
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    reset() {
      // reset function to clear text fields of the form
      this.$refs.form1.reset();
    }
  }
};
</script>