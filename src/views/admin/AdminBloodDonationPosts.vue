/* eslint-disable vue/require-v-for-key */
<template>
  <v-container>
    <v-card width="100%" height="100%">
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Blood Needed Posts</v-toolbar-title>
        <v-text-field v-model="search" label="Search" single-line hide-details class="ml-5"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn small color="success" class="ml-3" to="/newBloodDonationForm">
          <v-icon class="pr-1">mdi-plus</v-icon>Add Blood Need Post
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="blood_need_posts"
        :search="search"
        :loading="loading"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.userID }}</td>
            <td>
              <v-edit-dialog
                :return-value.sync="row.item.userName"
                @save="save(row.item.postID)"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ row.item.userName }}
                <template v-slot:input>
                  <v-text-field
                    v-model="row.item.userName"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td>
              <v-edit-dialog
                :return-value.sync="row.item.contact"
                @save="save(row.item.postID)"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ row.item.contact }}
                <template v-slot:input>
                  <v-text-field
                    v-model="row.item.contact"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>

            <td>
              <v-edit-dialog
                :return-value.sync="row.item.bloodType"
                @save="save(row.item.postID)"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ row.item.bloodType }}
                <template v-slot:input>
                  <v-text-field
                    v-model="row.item.bloodType"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td>{{ row.item.publishedDateTimeAgo }}</td>
            <td>
<<<<<<< Updated upstream
              <v-btn class="ma-1" text icon small color="error" @click="ondelete(row.item.postID)">
=======
              <v-btn class="ma-1" text icon small color="primary">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="ma-1"
                text
                icon
                small
                color="error"
                @click="deletePosts(row.item)"
              >
>>>>>>> Stashed changes
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import firebase from "../../plugins/firebaseConfig";

export default {
  name: "NeededPostDetailsTable",

  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      search: "",
      loading: true,
      dialog: false,
      headers: [
        { text: "User ID", value: "userID" },
        { text: "User Name", value: "userName" },
        { text: "Contact Number", value: "contact" },
        { text: "Blood Type", value: "bloodType" },
        { text: "Ago", value: "publishedDateTimeAgo" },
        { text: "Delete", value: "" }
      ],
      blood_need_posts: [],
<<<<<<< Updated upstream
      detailsArray: []
=======
      selectedDocument: []
>>>>>>> Stashed changes
    };
  },
  methods: {
    loadPosts: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/blood_needed_posts")
        .then(response => {
          // push data to the array
          _this.blood_need_posts = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
<<<<<<< Updated upstream
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    save(id) {
      firebase.db
        .collection("posts-blood_needed")
        .doc(id)
        .update({
          userName: this.id.userName,
          contact: this.id.contact,
          bloodType: this.id.bloodType
        })
        .then(function() {
          console.log("Updated successfully");
          this.$router.push("/admin/BloodDonationPosts");
        })
        .catch(function(error) {
          console.log("Error occured", error);
        });
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    close() {
      console.log("Dialog closed");
    },

    ondelete: function(doc) {
      firebase.db
        .collection("posts-blood_needed")
        .doc(doc)
        .delete()
        .then(function() {
          console.log("Successfully Deleted ");
        })
        .catch(function(error) {
          console.log("Error occured", error);
        });
      this.$router.push("/admin/BloodDonationPosts");
=======
    deletePosts: function(post_id) {
      console.log(post_id);
      this.selectedDocument = post_id;
      axios
        .delete(
          "http://localhost:4200pi/posts/deleteNeedPosts/" +
            this.selectedDocument.postID
        )
        .then(function() {
          this.router.push({
            name: "AdminBloodDonationPosts"
          });
        });
>>>>>>> Stashed changes
    }
  },

  beforeMount() {
    // to call the function on load of the page
    this.loadPosts();
  }
};
</script>
