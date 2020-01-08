<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="blood_need_post in blood_need_posts"
            :key="blood_need_post.publishedDateTime"
            :cols="blood_need_post.flex"
            class="v-flex">
           <v-card class="v-flex auto"  dark=true>
              <v-img
                :src="blood_need_post.imgSrc"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
                
              >
              </v-img>
             <v-card-text>
                Urgently required
              <b>{{blood_need_post.bloodType}}</b> type of blood
              for patient.
              Volunteers please come forward and help us.
              If you are willing to donate blood please contact
              <b>{{blood_need_post.userName}}</b> via
              <b>{{blood_need_post.phoneNumber}}</b>
              <b>. DONATE BLOOD AND SAVE LIFE</b>
          
            <template v-slot:footer>
              <small class="text-muted">{{blood_need_post.publishedDateTimeAgo}}</small>
            </template>
             </v-card-text>

              </v-card>

            </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "BloodNeedPost",

  data() {
    return {
      blood_need_posts: []
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
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadPosts();
  }
};
</script>


