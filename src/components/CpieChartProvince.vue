<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Pie,
  data() {
    return {
      donors: [],
      countCentral: 0,
      countWestern: 0,
      countSouthern: 0,
      countNorthern: 0,
      countEastern: 0,
      countNorthCentral: 0,
      countNorthWestern: 0,
      countSabaragamuwa: 0,
      countUva: 0
    };
  },
  beforeMount() {},
  mounted() {
    // Overwriting base render method with actual data.

    this.getData().then(x => {
      console.log(x);

      this.renderChart({
        labels: ["Central", "Western", "Southern", "Northern", "Eastern", "North-Central", "North-Western", "Sabaragamuwa","Uva"],
        datasets: [
          {
            backgroundColor: [
              "darkgreen",
              "indigo",
              "orangered",
              "yellow",
              "darkred",
              "crimson",
              "darkblue",
              "purple",
              "steelblue"
            ],
            data: [
              this.countCentral,
              this.countWestern,
              this.countSouthern,
              this.countNorthern,
              this.countEastern,
              this.countNorthCentral,
              this.countNorthWestern,
              this.countSabaragamuwa,
              this.countUva
            ]
          }
        ]
      });
    });
  },
  methods: {
    getData: function() {
      return new Promise((resolve, reject) => {
        var _this = this;

        // calling th API and get data
        axios
          .get("http://localhost:4200/api/campaigns/accepted")
          .then(response => {
            // push data to the array
            _this.campaigns = response.data;
            // console.log(_this.donors);
            // response.data.forEach(element => {
            //   this.donors.push(element);
            // });
            
          

            for (var i = 0; i < _this.campaigns.length; i++) {
              console.log(_this.campaigns.province);
              if (_this.campaigns[i].province == "Western") {
                _this.countWestern = _this.countWestern + 1;
              } else if (_this.campaigns[i].province == "Central") {
                _this.countCentral = _this.countCentral + 1;
              } else if (_this.campaigns[i].province == "Southern") {
                _this.countSouthern = _this.countSouthern + 1;
              } else if (_this.campaigns[i].province == "Northern") {
                _this.countNorthern = _this.countNorthern + 1;
              } else if (_this.campaigns[i].province == "Eastern") {
                _this.countEastern = _this.countEastern + 1;
              } else if (_this.campaigns[i].province == "North Central") {
                _this.countNorthCentral = _this.countNorthCentral + 1;
              } else if (_this.campaigns[i].province == "North Western") {
                _this.countNorthWestern = _this.countNorthWestern + 1;
              } else if (_this.campaigns[i].province == "Sabaragamuwa") {
                _this.countSabaragamuwa = _this.countSabaragamuwa + 1;
              }else if (_this.campaigns[i].province == "Uva") {
                _this.countUva = _this.countUva + 1;
              }
            }
            // _this.loading = false;
            resolve(true);
          })
          .catch(e => {
            console.log("Error: " + e);
            reject(e);
          });
      });

      // console.log("here");
      // console.log(this.donors);

      // this.donors.forEach(function(item) {
      //   console.log(item.bloodType);
      // });
    }
  }
};
</script>
