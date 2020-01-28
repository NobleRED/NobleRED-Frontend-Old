<template>
  <v-container>
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
          <v-row>
            <v-col cols="12">
              <v-text-field
                name="username"
                label=" Enter your email address"
                id="username"
                type="text"
                v-model="username"
                required
                outlined
                style="background-color: transparent;"
                color="secondary"
                class="pl-2 pr-2 mb-n5 mt-n5"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                name="password"
                label=" Enter your password"
                id="password"
                type="password"
                v-model="password"
                required
                outlined
                style="background-color: transparent;"
                color="secondary"
                class="pl-2 pr-2 mb-n5 mt-n3"
              ></v-text-field>
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
          <v-row>
            <v-col cols="12">
              <v-flex :class="`d-flex justify-center`">
                <v-btn small type="submit" @click="loginUser()" color="secondary">Login</v-btn>
                <v-btn small @click="reset()" color="error" class="ml-2">Reset</v-btn>
              </v-flex>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../plugins/firebaseConfig";
import axios from "axios";

export default {
  name: "Loginform",
  data() {
    return {
      username: "",
      password: "",
      uid: "",
      user: ""
    };
  },
  created() {
    this.$session.set("view", "login");
    this.$session.set("showLoginForm", true);
  },
  beforeDestroy() {
    this.$session.set("view", "user");
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
            .get("http://localhost:4200/api/donors/" + uid)
            .then(response => {
              // push data to the array
              console.log(response.data);
              console.log();
              this.$store.commit("updateRole", response.data.role);
            })
            .catch(e => {
              console.log("Error: " + e);
            });

          this.$store.commit("addSession", user);
          this.$store.commit("updateLoggedIn", true);

          // console.log(this.$store.getters.loggedIn);
          // console.log(this.$store.getters.session.role);

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
    goToRegistration() {},
    reset() {
      // reset function to clear text fields of the form
      this.$refs.form1.reset();
    }
  }
};
</script>