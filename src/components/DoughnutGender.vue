<script>
import { Doughnut } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Doughnut,
  data() {
    return {
      donors: [],
      females:[],
      countMale: 0,
      countFemale: 0
    };
  },
  beforeMount() {},
  mounted() {
    // Overwriting base render method with actual data.

    this.getData().then(x => {
      console.log(x);

      this.renderChart({
        labels: ["Male", "Female"],
        datasets: [
          {
            backgroundColor: ["blue", "#d45087"],
            data: [this.countMale, this.countFemale]
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
              if (_this.donors[i].gender == "male") {
                _this.countMale = _this.countMale + 1;
              } else if (_this.donors[i].gender == "female") {
                _this.countFemale = _this.countFemale + 1;
                
                
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
