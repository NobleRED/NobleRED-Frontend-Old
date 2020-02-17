<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Registered Blood Donation Campaigns Province
              Wise</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <CpieChartProvince></CpieChartProvince>
            <v-btn @click="allowDownloadCampaign" x-medium color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" sm="6">
        <v-card class="mx-auto">
          <v-toolbar flat color="grey darken-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Today Campaigns</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <cpieChartToday></cpieChartToday>
            <v-btn @click="allowDownloadCampaignToday" x-medium color="success" dark>Get PDF Copy</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CpieChartProvince from "../../components/CpieChartProvince.vue";
import CpieChartToday from "../../components/CpieChartToday.vue";
import jspdf from 'jspdf'
import 'jspdf-autotable'
import axios from "axios";
export default {
  components: {
    CpieChartProvince,
    CpieChartToday
  },
  data(){
    return{
      campaigns:[],
      campaignsToday:[]
    }
  },
  methods:{
    getCampaigns(){
        // console.log("Akila");
        
        axios
        .get("http://localhost:4200/api/campaigns/accepted")
        .then(response => {
          // push data to the array
          this.campaigns = response.data;
        
          console.log(this.campaigns);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
        // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];

    },
    exportPdf_CampaignList(){
        // alert("akila");
        
        var coloumns=[
          {title:"Organizer Name",dataKey:"organizerName"},
          {title:"Date",dataKey:"date"},
          {title:"Time",dataKey:"time"},
          {title:"Address",dataKey:"address"},
          {title:"Province",dataKey:"province"}
          
        ];

        var doc=new jspdf('p','pt');
        doc.autoTable(coloumns,this.campaigns);
        doc.save('campaigns.pdf');
    },
    getCampaignsToday(){
        // console.log("Akila");
        
        axios
        .get("http://localhost:4200/api/campaignstoday")
        .then(response => {
          // push data to the array
          this.campaignsToday = response.data;
        
          console.log(this.campaignsToday);
        })
        .catch(e => {
          console.log("Error: " + e);
        });
        // this.donors=[{name:"Akila",bloodType:"B+",cNumber:"077049",address:"256-A,Beliatta"}];

    },
    exportPdf_Today_CampaignList(){
        // alert("akila");
        
        var coloumns=[
          {title:"Organizer Name",dataKey:"organizerName"},
          {title:"Campaign ID",dataKey:"campaignID"},
          {title:"Time",dataKey:"time"},
          {title:"Address",dataKey:"address"},
          {title:"Province",dataKey:"province"}
          
        ];

        var doc=new jspdf('p','pt');
        doc.autoTable(coloumns,this.campaignsToday);
        doc.save('Today_campaigns.pdf');
      },
      allowDownloadCampaign(){
        var r = confirm("Allow Download PDF ?");
        if (r == true) {
          this.exportPdf_CampaignList();
        } else {
          console.log("You pressed Cancel!");
        }
      },
      allowDownloadCampaignToday(){
        var r = confirm("Allow Download PDF ?");
        if (r == true) {
          this.exportPdf_Today_CampaignList();
        } else {
          console.log("You pressed Cancel!");
        }
      },
  },
  beforeMount(){
    this.getCampaigns ();
    this.getCampaignsToday ();
  }
  
};
</script>
