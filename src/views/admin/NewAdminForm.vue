<template>
  <v-container class="mt-10">
    <v-card width="100%" height="100%" class="mt-10">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Admin Registration</v-toolbar-title>
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
                v-model="formData.fullname"
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
            <v-btn type="submit" @click="addAdmin" color="primary"
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
  name: "AdminRegistrationForm",
  data() {
    return {
      formData: {
        uidtemp: "",
        fullname: "",
        nic: "",
        email: "",
        password: "",
        password1: ""
      },

      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
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
    addAdmin() {
      var that = this;
      event.preventDefault();
      var now = moment().format();

      var uidTemp = "";
      var sendToLogin = false;
      var nextAdminID;

      firebase.auth
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then(function(data) {
          data.user
            .updateProfile({
              displayName: that.formData.fullname + " " + that.formData.lname
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

          axios
            .get("http://localhost:4200/api/admins/nextid")
            .then(response => {
              // push data to the array
              nextAdminID = response.data;
              console.log("send to login", sendToLogin);

              console.log("send to login", sendToLogin);
              if (sendToLogin == true) {
                firebase.db
                  .collection("users-admin")
                  .add({
                    uid: uidTemp,
                    fullname: that.formData.fullname,
                    email: that.formData.email,
                    nic: that.formData.nic,
                    role: "admin",
                    status: "1",
                    adminID: nextAdminID,
                    createdAt: now
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
                    this.$router.push("/login");
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });
              } else {
                this.$router.push("");
              }
            })
            .catch(e => {
              console.log("Error: " + e);
            });
          // var r = confirm("Error in sign up!");
          // if (r == true) {
          //   this.router.push("/login");
          // } else {
          //   this.router.push("/signup/donor");
          // }
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
