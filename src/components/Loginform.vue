/* eslint-disable prettier/prettier */
<template>
  <v-app>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex>
          <v-card class="mx-auto" max-width="350" outlined>
            <v-flex :class="`d-flex justify-center`">
              <v-img
                src="../assets/noblered logo 30x100.png"
                max-width="100"
                max-height="30"
                class="mt-7 mb-3"
              ></v-img>
            </v-flex>
            <v-flex :class="`d-flex justify-center`">
              <p
                style="font-size:24px; color:#616161"
                class="font-weight-medium"
              >
                Log In
              </p>
            </v-flex>
            <v-form ref="form1">
              <v-card-text>
                <v-row class="mb-n2">
                  <v-col cols="12">
                    <v-text-field
                      name="username"
                      label=" Enter your email address"
                      id="username"
                      type="text"
                      v-model="username"
                      :rules="inputRulesUser"
                      required
                      outlined
                      style="background-color: transparent;"
                      color="secondary"
                      class="pl-2 pr-2 mb-n5 mt-n5"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mb-n5">
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label=" Enter your password"
                      id="password"
                      type="password"
                      v-model="password"
                      :rules="inputRulespass"
                      required
                      outlined
                      style="background-color: transparent;"
                      color="secondary"
                      class="pl-2 pr-2 mb-n5 mt-n3"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="pl-2 pr-2">
                  <v-col cols="12">
                    <v-btn
                      block
                      type="submit"
                      @click="loginUser()"
                      color="secondary"
                      >Login</v-btn
                    >
                  </v-col>
                </v-row>

                <!-- <v-flex :class="`d-flex justify-center`">OR</v-flex> -->

                <!-- <v-row class="pl-2 pr-2">
                  <v-col cols="12">
                    <v-btn block outlined light color="secondary" @click="signInWithGoogle()">
                <span class="mdi mdi-google">&nbsp; &nbsp; Sign In With Google</span>-->
                <!-- <v-img src="../assets/google logo.png" aspect-ratio="1"></!-->

                <!-- <v-avatar size="16px" item>
                        <v-img src="../assets/google logo.png" />
                      </v-avatar>
                      <pre class="tab"> Sign In With Google</pre>
                    </v-btn>
                  </v-col>
                </v-row>-->

                <v-flex :class="`d-flex justify-center`">
                  <!-- <p style="font-size:12px; color:#616161" class="font-weight-medium"></p> -->
                  <v-btn
                    small
                    text
                    @click="goToRegistration"
                    color="error"
                    href="/newDonorForm"
                    >Don't have an account?</v-btn
                  >
                </v-flex>
              </v-card-text>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "../plugins/firebaseConfig";
import axios from "axios";
import { bus } from "../main";

export default {
  name: "Loginform",
  data() {
    return {
      username: "",
      password: "",
      uid: "",
      user: "",
      inputRulesUser: [v => v.length > 0 || ""],
      inputRulespass: [v => v.length >= 8 || ""]
    };
  },
  mounted() {},
  methods: {
    loginUser() {
      event.preventDefault();
      console.log("email: " + this.username + "password" + this.password);
      var user;
      firebase.auth
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          console.log("User verified");

          user = firebase.auth.currentUser;
          var uid = user.uid;
          localStorage.uid = uid;
          this.$session.set("uid", uid);

          axios
            .get("http://localhost:4200/api/admins/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "Admin") {
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.adminID;
                  console.log(response);

                  this.$session.start();
                  this.$session.set("loginstatus", true);
                  this.$session.set(
                    "username",
                    response.data.fname + " " + response.data.lname
                  );
                  localStorage.username =
                    response.data.fname + " " + response.data.lname;

                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          axios
            .get("http://localhost:4200/api/donors/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "Donor") {
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.donorID;
                  localStorage.username =
                    response.data.fname + " " + response.data.lname;
                  console.log(response);

                  this.$session.start();
                  this.$session.set("loginstatus", true);
                  this.$session.set(
                    "username",
                    response.data.fname + " " + response.data.lname
                  );

                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          axios
            .get("http://localhost:4200/api/organizers/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "Organizer") {
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.organizerID;
                  localStorage.username = response.data.organizerName;
                  console.log(response);

                  this.$session.start();
                  this.$session.set("loginstatus", true);
                  this.$session.set("username", response.data.organizerName);

                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          localStorage.loginstatus = true;
          this.$router.push("/");
        })
        .catch(function(error) {
          var errorCode = error.code;
          console.log("Error, User not verified : " + errorCode);
          alert("Invalid Username or Password");
        });
    },

    goToRegistration() {},
    reset() {
      // reset function to clear text fields of the form
      this.$refs.form1.reset();
    }
  }
};
</script>
