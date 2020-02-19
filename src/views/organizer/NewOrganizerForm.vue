<template>
  <v-container>
    <v-card width="100%" height="100%">
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
                <v-btn type="submit" @click="addOrganizer()" color="primary"
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
import firebase from "../../plugins/firebaseConfig";
import axios from "axios";
import generator from "generate-password";

var moment = require("moment");
moment().format();

export default {
  name: "NewCampaignForm",
  data() {
    return {
      value: "",
      show: true,
      nextOrganizerID: "",
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
    addOrganizer() {
      var that = this;
      event.preventDefault();
      var now = moment().format();
      //   axios
      //     .post("http://localhost:4200/api/signup/donor", {
      //       firstName: this.$data.fname,
      //       lastName: this.$data.lname,
      //       nic: this.$data.nic,
      //       dob: this.$data.dob,
      //       address: this.$data.inputAddress,
      //       contactNo: this.$data.contactNo,
      //       radios: this.$data.radios,
      //       img: this.$data.img,
      //       email: this.$data.email,
      //       password: this.$data.password
      //     })
      //     .then(function(response) {
      //       console.log(response);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // }
      //////////////////////
      var uidTemp = "";
      var sendToLogin = false;
      var password = generator.generate({
        length: 10,
        numbers: true
      });

      firebase.auth
        .createUserWithEmailAndPassword(this.formData.email, password)
        .then(function(data) {
          data.user
            .updateProfile({
              displayName: that.formData.organizerName
            })
            .then(() => {});

          data.user
            .updateProfile({
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/user_pro_pic%2Favatar_clipart.png?alt=media&token=e4bb25ca-b8a0-43c4-ac73-f261e5e41576"
            })
            .then(() => {});

          console.log("uid", data.user.uid);
          uidTemp = data.user.uid;
          var nextOrganizerID;
          sendToLogin = true;

          axios
            .get("http://localhost:4200/api/organizers/nextid")
            .then(response => {
              // push data to the array
              nextOrganizerID = response.data;
              console.log("send to login", sendToLogin);

              if (sendToLogin == true) {
                firebase.db
                  .collection("users-organizer")
                  .doc(nextOrganizerID)
                  .set({
                    uid: uidTemp,
                    organizerID: nextOrganizerID,
                    organizerName: that.formData.organizerName,
                    contactPerson: that.formData.contactPerson,
                    contactPersonNIC: that.formData.contactPersonNIC,
                    contactNo: that.formData.contactNo,
                    address: that.formData.address,
                    email: that.formData.email,
                    createdAt: now,
                    role: "Organizer",
                    password: password,
                    status: 1
                  })
                  .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    var template_params = {
                      reply_to: "nobleredlk@gmail.com",
                      from_name: "NobleRED",
                      to_name: that.formData.email,
                      message_html:
                        "You have successfully registered with the NobleRED! Thank you for being 'Noble'"
                    };

                    this.sendEmail(template_params);
                    this.$router.go("/");
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });
              } else {
                this.$router.go("/");
              }
            })
            .catch(e => {
              console.log("Error: " + e);
            });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log("Error occured : ", errorCode, errorMessage);
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
