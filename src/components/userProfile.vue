<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex :class="`d-flex justify-center text-center`">
        <v-card :loading="loading" class="mx-auto my-12 mt-0">
          <v-avatar color="grey" size="300" style="align: center">
            <v-img :src="user.photoURL" alt="Profile Pic"></v-img>
          </v-avatar>

          <v-card-text>
            <v-row>
              <v-col>
                <h2>{{ user.displayName }}</h2>

                <div class="subtitle-1">{{ user.email }}</div>
                <b>
                  <h4 class="subtitle-1">
                    Last donated date - {{ lastDonatedDate }}
                  </h4>
                </b>
              </v-col>
            </v-row>

            <v-row v-if="isEligible">
              <v-col>
                <h2 style="color:#4CAF50">You are eligible to donate blood</h2>
              </v-col>
            </v-row>
            <div v-if="!isEligible">
              <v-row>
                <v-col>
                  <h2 style="color:#B71C1C;">
                    You are not eligible to donate blood until
                  </h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h1 style="color:#B71C1C;">{{ nextEligibleDate }}</h1>
                </v-col>
              </v-row>
            </div>

            <!-- <v-row align="right" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>-->
            <v-row class="mb-n2">
              <v-col cols="12">
                <h3 style="color:">
                  Select your last blood donated date below
                </h3>
              </v-col>
            </v-row>
            <v-row class="mb-n2">
              <v-col cols="12">
                <v-date-picker
                  v-model="lastDonatedDate"
                  color="#B71C1C"
                  full-width
                  :landscape="$vuetify.breakpoint.smAndUp"
                  :max="now"
                ></v-date-picker>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="#B71C1C" dark @click="updateLastDonatedDate()"
                  >Update the last blood donated date</v-btn
                >
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-col cols="12">
                <v-btn
                  color="#B71C1C"
                  dark
                  @click="getNextEligibleDate()"
                >Get your next eligible date</v-btn>
              </v-col>
            </v-row>-->
          </v-card-text>

          <v-card-actions></v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "../plugins/firebaseConfig";
import { mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  name: "UserProfile",
  data() {
    return {
      now: "",
      lastDonatedDate: "",
      nextEligibleDate: "",
      isEligible: false
    };
  },
  methods: {
    allowedMonths() {
      this.now = moment().format("YYYY-MM-DD");
      console.log(this.now);
    },
    getNextEligibleDate() {
      if (this.lastDonatedDate == "") {
        this.isEligible = true;
      } else {
        var day = moment(this.lastDonatedDate);
        this.nextEligibleDate = moment(day)
          .add(4, "months")
          .format("YYYY-MM-DD");

        var today = moment();
        var difference = today.diff(moment(this.nextEligibleDate));
        if (difference >= 0) {
          this.isEligible = true;
        } else {
          this.isEligible = false;
        }
      }

      console.log("dif", this.isEligible);
    },
    getUserData() {
      var uid = localStorage.uid;
      axios
        .get("http://localhost:4200/api/donors/" + uid)
        .then(response => {
          if (response.status == 200) {
            this.lastDonatedDate = response.data.lastDonatedDate;
            console.log("dateeee", response.data);
            this.getNextEligibleDate();
          }

          // console.log("Role : ", this.$store.getters.role);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    updateLastDonatedDate() {
      var userid = localStorage.userid;
      firebase.db
        .collection("users-donor")
        .doc(userid)
        .update({
          lastDonatedDate: this.lastDonatedDate
        })
        .then(() => {
          console.log("Updated");
          this.$router.push("/");
        });
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      loggedIn: "loggedIn"
    })
  },
  created() {},
  mounted() {
    this.allowedMonths();
    this.getUserData();
  }
};
</script>

<style></style>
