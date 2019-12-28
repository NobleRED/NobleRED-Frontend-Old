<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Pie,
  data() {
    return {
      donors: []
    };
  },
  beforeMount() {
    this.getData();
  },
  mounted() {
    // Overwriting base render method with actual data.

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
          data: [40, 20, 37, 20, 10, 40, 10, 5]
        }
      ]
    });
  },
  methods: {
    getData: function() {
      var _this = this;

      // calling th API and get data
      axios
        .get("http://localhost:4200/api/donors")
        .then(response => {
          // push data to the array
          _this.donors = response.data;
          // _this.loading = false;
        })
        .catch(e => {
          console.log("Error: " + e);
        });
      console.log("here");
      // console.log(_this.donors);
      // for (var i = 0; i < _this.donors.length; i++) {
      //   console.log(_this.donors[i].bloodType);
      // }
      this.donors.forEach(function(item) {
        console.log(item.bloodType);
      });
      console.log("here2");
    }
  }
};
</script>