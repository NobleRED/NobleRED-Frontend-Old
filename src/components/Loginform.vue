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
              <p style="font-size:24px; color:#616161" class="font-weight-medium">Log In</p>
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
                    <v-btn block type="submit" @click="loginUser()" color="secondary">Login</v-btn>
                  </v-col>
                </v-row>

                <v-flex :class="`d-flex justify-center`">
                  <!-- <p style="font-size:12px; color:#616161" class="font-weight-medium"></p> -->
                  OR
                </v-flex>

                <v-row class="pl-2 pr-2">
                  <v-col cols="12">
                    <v-btn block outlined light color="secondary" @click="signInWithGoogle()">
                      <!-- <span class="mdi mdi-google">&nbsp; &nbsp; Sign In With Google</span> -->
                      <!-- <v-img src="../assets/google logo.png" aspect-ratio="1"></!-->

                      <v-avatar size="16px" item>
                        <v-img src="../assets/google logo.png" />
                      </v-avatar>
                      <pre class="tab"> Sign In With Google</pre>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-flex :class="`d-flex justify-center`">
                  <!-- <p style="font-size:12px; color:#616161" class="font-weight-medium"></p> -->
                  <v-btn
                    small
                    text
                    @click="goToRegistration"
                    color="error"
                    href="/donor/signup"
                  >Don't have an account?</v-btn>
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
// import emailjs from "emailjs-com";
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
  methods: {
    loginUser() {
      event.preventDefault();
      console.log("email: " + this.username + "password" + this.password);
      var user;
      firebase.auth
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          console.log("User verified");
          // console.log(cred.user);

          user = firebase.auth.currentUser;
          // if (user) {
          //   console.log("user det:" + JSON.stringify(user));
          // } else {
          //   console.log("no user detected");
          // }
          var uid = user.uid;
          // console.log("uid:" + uid);

          axios
            .get("http://localhost:4200/api/admins/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "admin") {
                  console.log("admin");
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.adminID;
                  console.log(response);
                  // push data to the array
                  this.$session.start();
                  this.$session.set("jwt", response.data);
                  // console.log(response.data.fname);
                  localStorage.userdata = JSON.stringify(response.data);
                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }

              // console.log("Role : ", this.$store.getters.role);
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          axios
            .get("http://localhost:4200/api/donors/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "donor") {
                  console.log("donor");
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.donorID;
                  console.log(response);
                  // push data to the array
                  this.$session.start();
                  this.$session.set("jwt", response.data);
                  // console.log(response.data.fname);
                  localStorage.userdata = JSON.stringify(response.data);
                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }

              // console.log("Role : ", this.$store.getters.role);
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          axios
            .get("http://localhost:4200/api/organizers/" + uid)
            .then(response => {
              if (response.status == 200) {
                console.log(response);
                if (response.data.role == "organizer") {
                  console.log("organizer");
                  this.$store.commit("updateRole", response.data.role);
                  bus.$emit("sendUserRole", response.data.role);
                  localStorage.role = response.data.role;
                  localStorage.userid = response.data.organizerID;
                  console.log(response);
                  // push data to the array
                  this.$session.start();
                  this.$session.set("jwt", response.data);
                  // console.log(response.data.fname);
                  localStorage.userdata = JSON.stringify(response.data);
                  bus.$emit("changeLoginStatus", true);
                  bus.$emit("sendUserData", response.data);
                }
              }
              // // push data to the array
              // this.$session.start();
              // this.$session.set("jwt", response.data);
              // // console.log(response.data.fname);
              // localStorage.userdata = JSON.stringify(response.data);
              // localStorage.role = response.data.role;

              // this.$store.commit("updateRole", response.data.role);
              // bus.$emit("changeLoginStatus", true);
              // bus.$emit("sendUserRole", response.data.role);
              // bus.$emit("sendUserData", response.data);

              // console.log("Role : ", this.$store.getters.role);
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          // localStorage.user = user;
          localStorage.loginstatus = true;
          // this.$store.commit("addSession", user);
          // this.$store.commit("updateLoggedIn", true);

          this.$router.push("/");

          // console.log("Login status: ", this.$store.getters.loggedIn);

          // start the session
          // this.$session.start();
          // this.$store.state.user = user;

          // store the token in the session
          // this.$session.set("user", user);
          // this.$session.set("loggedIn", true);

          // redirect to the home page
          // this.$router.push({
          //   name: "home"
          // });
        })
        .catch(function(error) {
          var errorCode = error.code;
          // var errorMessage = error.message;

          console.log("Error, User not verified : " + errorCode);
          alert("Invalid Username or Password");

          // this.$router.push({
          //   name: "login"
          // });
        });

      // getthe user details token

      // console.log(this.$session.getAll());
      // console.log(this.$session.get("user").email);
    },
    signInWithGoogle() {
      var provider = firebase.provider;
      // provider.addScope("profile");
      // provider.addScope("email");

      firebase.auth
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // The signed-in user info.
          // var user = result.user;
          // this.$session.start();
          // localStorage.userdata = JSON.stringify(result.user);
          // this.$session.set("jwt", result.data);
          // bus.$emit("changeLoginStatus", true);
          // bus.$emit("sendUserData", user);
          // localStorage.loginstatus = true;
          // console.log(user);
          console.log(result);
          this.$router.replace("/");
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          // eslint-disable-next-line no-unused-vars
          var errorCode = error.code;
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line no-unused-vars
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line no-unused-vars
          var credential = error.credential;
          // ...
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
