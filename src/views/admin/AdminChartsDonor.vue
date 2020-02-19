<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Registered Donors by Blood Type</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <piechart></piechart>
            <v-btn @click="exportPdf_AplusList" x-medium color="#003f5c" dark
              >A+</v-btn
            >
            <v-btn @click="exportPdf_AminList" x-medium color="#2f4b7c" dark
              >A-</v-btn
            >
            <v-btn @click="exportPdf_BplusList" x-medium color="#665191" dark
              >B+</v-btn
            >
            <v-btn @click="exportPdf_BminList" x-medium color="#a05195" dark
              >B-</v-btn
            >
            <v-btn @click="exportPdf_ABplusList" x-medium color="#d45087" dark
              >AB+</v-btn
            >
            <v-btn @click="exportPdf_ABminList" x-medium color="#f95d6a" dark
              >AB-</v-btn
            >
            <v-btn @click="exportPdf_OplusList" x-medium color="#ff7c43" dark
              >O+</v-btn
            >
            <v-btn @click="exportPdf_OminList" x-medium color="#ffa600" dark
              >O-</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Registerd Blood Donors By Gender Wise</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <DoughnutGender></DoughnutGender>
            <v-container>
              <v-row>
                <v-btn @click="exportPdf_MaleList" x-medium color="blue" dark
                  >Male List</v-btn
                >
                <v-btn
                  @click="exportPdf_FemaleList"
                  x-medium
                  color="#d45087"
                  dark
                  >Female List</v-btn
                >
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Piechart from "../../components/Piechart.vue";
import DoughnutGender from "../../components/DoughnutGender.vue";
import jspdf from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default {
  components: {
    Piechart,
    DoughnutGender
  },

  data() {
    return {
      donorsmale: [],
      donorsfemale: [],
      donorsAplus: [],
      donorsAmin: [],
      donorsABplus: [],
      donorsABmin: [],
      donorsOplus: [],
      donorsOmin: []
    };
  },

  methods: {
    exportPdf_MaleList() {
      // alert("akila");

      var _this = this;

      var coloumns = [
        { title: "Name", dataKey: "fname" },
        { title: "Blood Type", dataKey: "bloodType" },
        { title: "Contact Number", dataKey: "contactNo" },
        { title: "Address", dataKey: "address" }
      ];

      var doc = new jspdf("p", "pt");
      doc.autoTable(coloumns, _this.donorsmale);
      doc.save("donorMale.pdf");
    },
    exportPdf_FemaleList() {
      // alert("akila");

      var coloumns = [
        { title: "Name", dataKey: "fname" },
        { title: "Blood Type", dataKey: "bloodType" },
        { title: "Contact Number", dataKey: "contactNo" },
        { title: "Address", dataKey: "address" }
      ];

      var doc = new jspdf("p", "pt");
      doc.autoTable(coloumns, this.donorsfemale);
      doc.save("donorsFemale.pdf");
    },
    getMaledonor() {
      console.log("Akila");

      axios
        .get("http://localhost:4200/api/donorsmale")
        .then(response => {
          // push data to the array
          this.donorsmale = response.data;

          console.log(this.donorsmale);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];
    },
    getFemaledonor() {
      console.log("Akila");

      axios
        .get("http://localhost:4200/api/donorsfemale")
        .then(response => {
          // push data to the array
          this.donorsfemale = response.data;

          console.log(this.donorsfemale);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];
    },
    exportPdf_AplusList() {
      // alert("akila");

      var coloumns = [
        { title: "Name", dataKey: "fname" },
        { title: "Blood Type", dataKey: "bloodType" },
        { title: "Contact Number", dataKey: "contactNo" },
        { title: "Address", dataKey: "address" }
      ];

      var doc = new jspdf("p", "pt");
      doc.autoTable(coloumns, this.donorsAplus);
      doc.save("donorsA+.pdf");
    },
    getAplusdonor() {
      console.log("Akila");

      axios
        .get("http://localhost:4200/api/donorsAplus")
        .then(response => {
          // push data to the array
          this.donorsAplus = response.data;

          console.log(this.donorsAplus);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];
    },
    exportPdf_AminList() {
      // alert("akila");

      var coloumns = [
        { title: "Name", dataKey: "fname" },
        { title: "Blood Type", dataKey: "bloodType" },
        { title: "Contact Number", dataKey: "contactNo" },
        { title: "Address", dataKey: "address" }
      ];

      var doc = new jspdf("p", "pt");
      doc.autoTable(coloumns, this.donorsAmin);
      doc.save("donorsA-.pdf");
    },
    getAmindonor() {
      console.log("Akila");

      axios
        .get("http://localhost:4200/api/donorsAmin")
        .then(response => {
          // push data to the array
          this.donorsAmin = response.data;

          console.log(this.donorsAmin);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];
    }
  },
  beforeMount() {
    this.getMaledonor();
    this.getFemaledonor();
    this.getAplusdonor();
    this.getAmindonor();
    this.getBplusdonor();
    this.getBmindonor();
    this.getABplusdonor();
    this.getABmindonor();
    this.getOplusdonor();
    this.getOmindonor();
  }
};
</script>
