<template>
  <v-container>
    <v-card width="100%" height="100%">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>New Blood Need Post Form</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col cols="12" sm="6">
          <v-form ref="form1">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12">
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
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
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
                <v-col cols="12" sm="12">
                  <v-text-field
                    name="contact"
                    label="Contact No"
                    placeholder="Contact No"
                    v-model="formData.contact"
                    type="tel"
                    :rules="phnRules"
                    required
                    outlined
                    style="background-color: transparent;"
                    small
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
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
                <v-col cols="12" sm="12">
                  <v-btn type="submit" @click="onSubmit" color="primary">Submit</v-btn>
                  <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card
            v-if="formData.bloodType == ''"
            width="90%"
            height="80%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood_requesting_campaign.png?alt=media&token=2bb0c346-559d-46b0-924b-8cd21357db5d"
            img-alt="Image"
            img-top
            border-variant="secondary"
          ></v-card>
          <v-card
            v-if="formData.bloodType == 'A+'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20A%2B.jpg?alt=media&token=efe377c0-fa5c-4047-a130-3d601384a336"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>
          <v-card
            v-if="formData.bloodType == 'A-'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20A-.jpg?alt=media&token=a1ba920d-0522-4e66-877a-68d8bbd0e8ae"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>

          <v-card
            v-if="formData.bloodType == 'B+'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20B%2B.jpg?alt=media&token=c13b9eba-b47a-4cc6-b0fb-0e1077b735b8"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>

          <v-card
            v-if="formData.bloodType == 'B-'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20B-.jpg?alt=media&token=56349c4c-9879-4f35-be71-a4384860d538"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>
          <v-card
            v-if="formData.bloodType == 'AB-'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20AB-.jpg?alt=media&token=db39abab-301d-48f1-86a9-290c92f717c2"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>
          <v-card
            v-if="formData.bloodType == 'AB+'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20AB%2B.jpg?alt=media&token=b4e06190-69b2-4492-89b3-38a5fb3e080c"
            img-alt="Image"
            img-top
            border-variant="secondary"
          >
            <v-card-text>
              Urgently required
              <b>{{ formData.bloodType }}</b> type of blood for patient.
              Volunteers please come forward and help us. If you are willing to
              donate blood please contact
              <b>{{ formData.userName }}</b> via
              <b>{{ formData.contact }}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
            </v-card-text>
          </v-card>
          <v-card
            v-if="formData.bloodType == 'O+'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20O%2B.jpg?alt=media&token=5bbd7bf4-bd54-435c-ae12-9ad94d0066e6"
            img-alt="Image"
            img-top
            border-variant="secondary"
          ></v-card>
          <v-card
            v-if="formData.bloodType == 'O-'"
            width="90%"
            height="90%"
            :title="formData.bloodType"
            img="https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20O-.jpg?alt=media&token=e8ca3834-f6ea-4cca-89f4-e60a1788e47a"
            img-alt="Image"
            img-top
            border-variant="secondary"
          ></v-card>
          <v-card-text>
            Urgently required
            <b>{{ formData.bloodType }}</b> type of blood for patient.
            Volunteers please come forward and help us. If you are willing to
            donate blood please contact
            <b>{{ formData.userName }}</b> via
            <b>{{ formData.contact }}</b>
            <b>. DONATE BLOOD AND SAVE LIFE</b>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../plugins/firebaseConfig";
import Axios from "axios";

var moment = require("moment");
moment().format();

export default {
  name: "NewBloodDonationForm",
  data() {
    return {
      show: true,
      date: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 50 || "Name must be less than 50 characters"
      ],

      phnRules: [
        v => !!v || "Contact no is required",
        v => /\d{10}/.test(v) || "Contact No must have 10 digits"
      ],
      requiredRule: [v => !!v || "Required"],

      bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      formData: {
        userID: "",
        userName: "",
        bloodType: "",
        contact: "",
        publishedDateTime: "",
        PostID: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //var _this = this;
      // using moment to get current date and time
      var now = moment().format();
      console.log("time :" + now);
      var nextPostID;

      Axios.get("http://localhost:4200/api/posts/nextId").then(respone => {
        nextPostID = respone.data;
        firebase.db
          .collection("posts-blood_needed")
          .doc(nextPostID)
          .set({
            userID: this.formData.userID,
            userName: this.formData.userName,
            bloodType: this.formData.bloodType,
            contact: this.formData.contact,
            publishedDateTime: now,
            postID: nextPostID,
            imgSrc: this.select_image(this.formData.bloodType)
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            this.$router.push({
              name: "/admin/BloodDonationPosts"
            });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      });

      this.$router.push("/");
    },
    reset() {
      // reset function to clear text fields of the form
      this.$refs.form1.reset();
    },
    //function to get relevent blood type image to the request form
    select_image(blood_type) {
      switch (blood_type) {
        case "A+":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20A%2B.jpg?alt=media&token=efe377c0-fa5c-4047-a130-3d601384a336";

        case "A-":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20A-.jpg?alt=media&token=a1ba920d-0522-4e66-877a-68d8bbd0e8ae";

        case "B+":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20B%2B.jpg?alt=media&token=c13b9eba-b47a-4cc6-b0fb-0e1077b735b8";

        case "B-":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20B-.jpg?alt=media&token=56349c4c-9879-4f35-be71-a4384860d538";

        case "AB+":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20AB%2B.jpg?alt=media&token=b4e06190-69b2-4492-89b3-38a5fb3e080c";

        case "AB-":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20AB-.jpg?alt=media&token=db39abab-301d-48f1-86a9-290c92f717c2";

        case "O+":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20O%2B.jpg?alt=media&token=5bbd7bf4-bd54-435c-ae12-9ad94d0066e6";

        case "O-":
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood%20needed%20O-.jpg?alt=media&token=e8ca3834-f6ea-4cca-89f4-e60a1788e47a";

        default:
          return "https://firebasestorage.googleapis.com/v0/b/noble-red-9d387.appspot.com/o/website_graphics%2Fblood_needed_posts%2Fblood_requesting_campaign.png?alt=media&token=2bb0c346-559d-46b0-924b-8cd21357db5d";
      }
    }
  }
};
</script>
