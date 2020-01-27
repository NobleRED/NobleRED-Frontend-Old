<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Register New Organizer</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form1">
        <v-card-text>
          <v-row>
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
            <v-col cols="12" sm="6">
              <v-text-field
                name="contactPerson"
                label="Contact Person"
                placeholder="John Doe"
                id="contactPerson"
                v-model="formData.contactPerson"
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
            <v-col cols="12" md="6">
              <v-text-field
                name="NIC"
                label="NIC No of Contact Person"
                placeholder="97XXXXXXXV"
                id="contactPersonNIC"
                v-model="formData.contactPersonNIC"
                type="text"
                :rules="nicRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="email"
                label="Email"
                placeholder="Email"
                id="email"
                v-model="formData.email"
                type="email"
                :rules="mailRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <router-link to="/admin/campaigns" tag="v-btn">
                <v-btn type="submit" @click="onSubmit" color="primary"
                  >Submit</v-btn
                >
              </router-link>
              <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
//import firebase from "../plugins/firebaseConfig";
import axios from "axios";

var moment = require("moment");
moment().format();

export default {
  name: "NewCampaignForm",
  data() {
    return {
      value: "",
      show: true,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],
      adrsRules: [v => !!v || "Address is required"],
      phnRules: [
        v => !!v || "Contact no is required",
        v => /\d{10}/.test(v) || "Contact No must have 10 digits"
      ],
      nicRules: [
        v => !!v || "NIC is required",
        v =>
          /^(\d).(\w(v?))/.test(v) || "NIC must include digits, may include v"
      ],
      mailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      requiredRule: [v => !!v || "Required"],
      formData: {
        organizerID: "",
        organizerName: "",
        contactPerson: "",
        contactPersonNIC: "",
        contactNo: "",
        address: "",
        email: ""
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

      axios
        .post("http://localhost:4200/api/campaignreq", {
          organizerName: _this.formData.organizerName,
          contactPerson: _this.formData.contactPerson,
          contactPersonNIC: _this.formData.contactPersonNIC,
          contactNo: _this.formData.contactNo,
          address: _this.formData.address,
          email: _this.formData.email,
          createdAt: now
          // role:
          // status:
          //   date: _this.formData.date,
          //   time: _this.formData.time,
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          _this.value = docRef.id;
          this.$router.push("/admin/map");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
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
