<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Pie,
  data() {
    return {
      donors: [],
      countAPos: 0,
      countANeg: 0,
      countBPos: 0,
      countBNeg: 0,
      countABPos: 0,
      countABNeg: 0,
      countOPos: 0,
      countONeg: 0
    };
  },
  beforeMount() {},
  mounted() {
    // Overwriting base render method with actual data.

    this.getData().then(x => {
      console.log(x);

      this.renderChart({
        labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        datasets: [
          {
            backgroundColor: [
              "#003f5c",
              "#2f4b7c",
              "#665191",
              "#a05195",
              "#d45087",
              "#f95d6a",
              "#ff7c43",
              "#ffa600"
            ],
            data: [
              this.countAPos,
              this.countANeg,
              this.countBPos,
              this.countBNeg,
              this.countABPos,
              this.countABNeg,
              this.countOPos,
              this.countONeg
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
          .get("http://localhost:4200/api/donors")
          .then(response => {
            // push data to the array
            _this.donors = response.data;
            // console.log(_this.donors);
            // response.data.forEach(element => {
            //   this.donors.push(element);
            // });

            for (var i = 0; i < _this.donors.length; i++) {
              console.log(_this.donors[i].bloodType);
              if (_this.donors[i].bloodType == "A+") {
                _this.countAPos = _this.countAPos + 1;
              } else if (_this.donors[i].bloodType == "A-") {
                _this.countANeg = _this.countANeg + 1;
              } else if (_this.donors[i].bloodType == "B+") {
                _this.countBPos = _this.countBPos + 1;
              } else if (_this.donors[i].bloodType == "B-") {
                _this.countBNeg = _this.countBNeg + 1;
              } else if (_this.donors[i].bloodType == "AB+") {
                _this.countABPos = _this.countABPos + 1;
              } else if (_this.donors[i].bloodType == "AB-") {
                _this.countABNeg = _this.countABNeg + 1;
              } else if (_this.donors[i].bloodType == "O+") {
                _this.countOPos = _this.countOPos + 1;
              } else if (_this.donors[i].bloodType == "O-") {
                _this.countONeg = _this.countONeg + 1;
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