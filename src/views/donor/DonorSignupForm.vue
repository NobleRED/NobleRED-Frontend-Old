/* eslint-disable prettier/prettier */
<template>
  <v-container>
    <v-card width="100%" height="100%">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Create A Donor Account</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                name="firstName"
                label="First Name"
                placeholder="John"
                id="fname"
                v-model="formData.fname"
                type="text"
                :rules="nameRules"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                id="lname"
                v-model="formData.lname"
                type="text"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="NIC"
                label="NIC No"
                placeholder="97XXXXXXXV"
                id="nic"
                v-model="formData.nic"
                type="text"
                :rules="nicRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="dob"
                label="Date of Birth"
                id="dob"
                v-model="formData.dob"
                type="date"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="address"
                label="Address"
                placeholder="Address"
                id="address"
                v-model="formData.inputAddress"
                type="text"
                :rules="adrsRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="contactno"
                label="Contact No"
                placeholder="Contact No"
                v-model="formData.contactNo"
                type="text"
                :rules="phnRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <!-- <p>{{ radios || 'null' }}</p>	 -->
              <v-radio-group
                label="Gender"
                v-model="formData.radios"
                :mandatory="true"
                row
              >
                <v-radio label="Male" value="male"></v-radio>
                <v-radio label="Female" value="female"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row>
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
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.bloodtype"
                :items="bloodTypes"
                :rules="bloodtypeRules"
                label="Blood Type"
                placeholder="Blood Type"
                required
                outlined
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="password"
                label="Password"
                placeholder="Password"
                id="password"
                v-model="formData.password"
                type="password"
                :rules="pswdRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                id="confirmPassword"
                v-model="formData.password1"
                type="password"
                :rules="[comparePasswords, pswdRules]"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-col cols="12" md="6">
            <v-btn type="submit" @click="addDonor" color="primary"
              >Sign up</v-btn
            >
            <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
          </v-col>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../../plugins/firebaseConfig";
import emailjs from "emailjs-com";
import axios from "axios";

var moment = require("moment");
moment().format();

export default {
  name: "DonorSignupForm",
  data() {
    return {
      formData: {
        uidtemp: "",
        fname: "",
        lname: "",
        nic: "",
        dob: "",
        inputAddress: "",
        contactNo: "",
        radios: "",
        img: "",
        email: "",
        password: "",
        password1: "",
        bloodtype: ""
      },

      bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      nicRules: [
        v => !!v || "NIC is required",
        v =>
          /^(\d).(\w(v?))/.test(v) || "NIC must include digits, may include v"
      ],
      adrsRules: [v => !!v || "Address is required"],
      phnRules: [
        v => !!v || "Contact no is required",
        v => /\d{10}/.test(v) || "Contact No must have 10 digits"
      ],
      mailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      bloodtypeRules: [v => !!v || "Blood Type is required"],
      pswdRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    comparePasswords() {
      return this.formData.password !== this.formData.password1
        ? "Passwords do not match"
        : "";
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    sendEmail: parameters => {
      emailjs
        .sendForm("gmail", "template_4Iavwfir", parameters, "YOUR_USER_ID")
        .then(
          result => {
            console.log("SUCCESS!", result.status, result.text);
          },
          error => {
            console.log("FAILED...", error);
          }
        );
    },
    addDonor() {
      var that = this;
      event.preventDefault();
      var now = moment().format();

      var uidTemp = "";
      var sendToLogin = false;
      firebase.auth
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then(function(data) {
          data.user
            .updateProfile({
              displayName: that.formData.fname + " " + that.formData.lname
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
          sendToLogin = true;
          var nextDonorID;

          axios
            .get("http://localhost:4200/api/donors/nextid")
            .then(response => {
              nextDonorID = response.data;
              console.log("send to login", sendToLogin);
              console.log(nextDonorID);

              if (sendToLogin == true) {
                firebase.db
                  .collection("users-donor")
                  .doc(nextDonorID)
                  .set({
                    uid: uidTemp,
                    fname: that.formData.fname,
                    lname: that.formData.lname,
                    email: that.formData.email,
                    nic: that.formData.nic,
                    dob: that.formData.dob,
                    address: that.formData.inputAddress,
                    contactNo: that.formData.contactNo,
                    gender: that.formData.radios,
                    bloodType: that.formData.bloodtype,
                    role: "Donor",
                    donorID: nextDonorID,
                    status: "1",
                    lastDonatedDate: "",
                    createdAt: now
                  })
                  .then(function() {
                    // console.log("Document written with ID: ", docRef.id);
                    emailjs.send("gmail", "template_4Iavwfir", {
                      reply_to: "nobleredlk@gmail.com",
                      from_name: "NobleRED",
                      to_name: that.formData.fname + " " + that.formData.lname,
                      message_html:
                        "HI, Thank you for registering with NobleRED",
                      DonorEmail: that.formData.email
                    });
                    console.log(that.formData);
                    this.$router.push("/");
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });

                // firebase.db
                //   .collection("users-donor")
                //   .add({
                //     uid: uidTemp,
                //     fname: that.formData.fname,
                //     lname: that.formData.lname,
                //     email: that.formData.email,
                //     nic: that.formData.nic,
                //     dob: that.formData.dob,
                //     address: that.formData.inputAddress,
                //     contactNo: that.formData.contactNo,
                //     gender: that.formData.radios,
                //     bloodType: that.formData.bloodtype,
                //     role: "Donor",
                //     donorID: nextDonorID,
                //     status: "1",
                //     createdAt: now
                //   })
                //   .then(function(docRef) {
                //     console.log("Document written with ID: ", docRef.id);
                //     emailjs.send("gmail", "template_4Iavwfir", {
                //       reply_to: "nobleredlk@gmail.com",
                //       from_name: "NobleRED",
                //       to_name: that.formData.fname + " " + that.formData.lname,
                //       message_html:
                //         "HI, Thank you for registering with NobleRED",
                //       DonorEmail: that.formData.email
                //     });
                //     console.log(that.formData);
                //     this.$router.push("/");
                //   })
                //   .catch(function(error) {
                //     console.error("Error adding document: ", error);
                //   });
              } else {
                this.$router.push("/signup/donor");
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
    }
  }
};
</script>
