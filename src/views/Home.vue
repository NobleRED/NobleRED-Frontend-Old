/* eslint-disable prettier/prettier */
<template >
  <v-app>
    <v-content>
      <section>
        <Particles></Particles>
        <v-divider dark></v-divider>
      </section>

      <section class="ma-5">
        <v-card
          class="mx-auto pa-3"
          light
          max-width="600"
          outlined
          color="transparent"
        >
          <v-flex :class="`d-flex justify-center`">
            <v-img
              src="../assets/noblered logo 30x100.png"
              max-width="100"
              max-height="30"
              class="mt-3 mb-0"
            ></v-img>
          </v-flex>
          <v-card-text class="headline"
            >" NobleRED is a platform for the noble sri lankans, who are willing
            to donate blood or willing to sacrifice their time and money to
            organize blood donation campaigns. "</v-card-text
          >
        </v-card>
      </section>

      <a id="campaignsMap">
        <section>
          <v-layout column align-center>
            <div class="mt-3 text-xs-center pt-3">
              <h2 class="headline" style="color:#B71C1C;">See where you can donate blood</h2>
            </div>
            <div class="mb-0 text-xs-center pb-3" style="color:#616161;">
              <span class="subheading">Registered blood donation campaigns</span>
            </div>
          </v-layout>
          <Map></Map>
        </section>
      </a>

      <section>
        <v-layout column align-center>
          <div class="mt-7 text-xs-center pt-3">
            <h2 class="headline" style="color:#B71C1C;">You can save a life</h2>
          </div>
          <div class="mb-0 text-xs-center pb-3" style="color:#616161;">
            <span class="subheading">Recently added blood required posts</span>
          </div>
        </v-layout>
        <v-layout column wrap class="mt-1 my-5" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap justify-center>
                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      :src="blood_need_posts[0].imgSrc"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      Urgently required
                      <b>{{ blood_need_posts[0].bloodType }}</b> type of blood
                      for patient. Volunteers please come forward and help us.
                      If you are willing to donate blood please contact
                      <b>{{ blood_need_posts[0].userName }}</b> via
                      <b>{{ blood_need_posts[0].phoneNumber }}</b>
                      <b>. DONATE BLOOD AND SAVE LIFE</b>
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{ blood_need_posts[0].publishedDateTimeAgo }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      :src="blood_need_posts[1].imgSrc"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      Urgently required
                      <b>{{ blood_need_posts[1].bloodType }}</b> type of blood
                      for patient. Volunteers please come forward and help us.
                      If you are willing to donate blood please contact
                      <b>{{ blood_need_posts[1].userName }}</b> via
                      <b>{{ blood_need_posts[1].phoneNumber }}</b>
                      <b>. DONATE BLOOD AND SAVE LIFE</b>
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{ blood_need_posts[1].publishedDateTimeAgo }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      :src="blood_need_posts[2].imgSrc"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      Urgently required
                      <b>{{ blood_need_posts[2].bloodType }}</b> type of blood
                      for patient. Volunteers please come forward and help us.
                      If you are willing to donate blood please contact
                      <b>{{ blood_need_posts[2].userName }}</b> via
                      <b>{{ blood_need_posts[2].phoneNumber }}</b>
                      <b>. DONATE BLOOD AND SAVE LIFE</b>
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{ blood_need_posts[2].publishedDateTimeAgo }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      :src="blood_need_posts[3].imgSrc"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      Urgently required
                      <b>{{ blood_need_posts[3].bloodType }}</b> type of blood
                      for patient. Volunteers please come forward and help us.
                      If you are willing to donate blood please contact
                      <b>{{ blood_need_posts[3].userName }}</b> via
                      <b>{{ blood_need_posts[3].phoneNumber }}</b>
                      <b>. DONATE BLOOD AND SAVE LIFE</b>
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{ blood_need_posts[3].publishedDateTimeAgo }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-layout column align-center>
          <div class="mt-0 mb-3 text-xs-center" style="color:#616161;">
            <v-btn dark small color="#B71C1C" to="/bloodNeedPost">View More</v-btn>
          </div>
        </v-layout>
      </section>

      <section>
        <v-layout column align-center>
          <div class="mt-7 text-xs-center pt-3">
            <h2 class="headline" style="color:#B71C1C;">
              More about campaigns
            </h2>
          </div>
          <div class="mb-0 text-xs-center pb-3" style="color:#616161;">
            <span class="subheading"
              >Recently added blood donation campaigns</span
            >
          </div>
        </v-layout>
        <v-layout column wrap class="mt-1 my-5" align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap justify-center>
                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      src="../assets/blood donation campaign.jpg"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      <b>Organizer :</b>
                      {{campaign_posts[0].organizerName}}
                      <br />
                      <b>Date :</b>
                      {{campaign_posts[0].date}}
                      <br />
                      <b>Address :</b>
                      {{campaign_posts[0].address}}
                      <br />
                      <b>Time :</b>
                      {{campaign_posts[0].time}}
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{
                          campaign_posts[0].publishedDateTimeAgo
                          }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      src="../assets/blood donation campaign.jpg"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      <b>Organizer :</b>
                      {{campaign_posts[1].organizerName}}
                      <br />
                      <b>Date :</b>
                      {{campaign_posts[1].date}}
                      <br />
                      <b>Address :</b>
                      {{campaign_posts[1].address}}
                      <br />
                      <b>Time :</b>
                      {{campaign_posts[1].time}}
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{
                          campaign_posts[1].publishedDateTimeAgo
                          }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      src="../assets/blood donation campaign.jpg"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      <b>Organizer :</b>
                      {{campaign_posts[2].organizerName}}
                      <br />
                      <b>Date :</b>
                      {{campaign_posts[2].date}}
                      <br />
                      <b>Address :</b>
                      {{campaign_posts[2].address}}
                      <br />
                      <b>Time :</b>
                      {{campaign_posts[2].time}}
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{
                          campaign_posts[2].publishedDateTimeAgo
                          }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex col12 md3>
                  <v-card class="elevation-0" outlined>
                    <v-img
                      src="../assets/blood donation campaign.jpg"
                      class="white--text align-end"
                      position="center center"
                    ></v-img>
                    <v-card-text>
                      <b>Organizer :</b>
                      {{campaign_posts[3].organizerName}}
                      <br />
                      <b>Date :</b>
                      {{campaign_posts[3].date}}
                      <br />
                      <b>Address :</b>
                      {{campaign_posts[3].address}}
                      <br />
                      <b>Time :</b>
                      {{campaign_posts[3].time}}
                      <v-spacer></v-spacer>
                      <v-slot:footer>
                        <small class="text-muted">
                          {{
                          campaign_posts[3].publishedDateTimeAgo
                          }}
                        </small>
                      </v-slot:footer>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-layout column align-center>
          <div class="mt-0 mb-3 text-xs-center" style="color:#616161;">
            <v-btn dark small color="#B71C1C" to="/campaignPosts">View More</v-btn>
          </div>
        </v-layout>
      </section>

      <section>
        <v-layout column align-center>
          <div class="mt-7 text-xs-center pt-3">
            <h2 class="headline" style="color:#B71C1C;">
              Want to become an organizer?
            </h2>
          </div>
          <div class="mb-0 text-xs-center pb-3" style="color:#616161;">
            <span class="subheading"
              >This is the procedure to become an organizer</span
            >
          </div>
        </v-layout>
        <v-container>
          <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
            >
              <v-card :color="item.color" dark>
                <v-card-title class="title">{{ item.topic }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>{{ item.details }}</p>
                  <v-btn :color="item.color" class="mx-0" outlined
                    >Button</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import Particles from "../components/Particles";
import Map from "../views/visitor/VisitorMap";

import axios from "axios";

export default {
  name: "home",
  components: {
    Particles,

    Map
  },
  data() {
    return {
      blood_need_posts: [],
      campaign_posts: [],
      items: [
        {
          color: "red darken-4",
          icon: "mdi-pencil-box-outline",
          topic: "Go to the NBTS",
          details:
            "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
        },
        {
          color: "red darken-4",
          icon: " mdi-timer-sand",
          topic: "Wait for the confirmation",
          details:
            "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
        },
        {
          color: "red darken-4",
          icon: "mdi-trophy-variant",
          topic: "Now you are an organizer",
          details:
            "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
        },
        {
          color: "red darken-4",
          icon: " mdi-map-marker-radius",
          topic: "Let's organize a campaign",
          details:
            "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
        }
      ]
    };
  },
  methods: {
    loadBloodNeededPosts: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/bloodneededposts/lastfour")
        .then(response => {
          // push data to the array
          _this.blood_need_posts = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    },
    loadCampaignPosts: function() {
      // to access "this" variable in the file
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/campaignposts/lastfour")
        .then(response => {
          // push data to the array
          _this.campaign_posts = response.data;
          _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
    }
  },
  beforeMount() {
    // to call the function on load of the page
    this.loadBloodNeededPosts();
    this.loadCampaignPosts();
  }
};
</script>

<style scoped></style>
