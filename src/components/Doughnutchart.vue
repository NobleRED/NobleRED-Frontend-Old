<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      datasets: [
        {
          backgroundColor: [
            "#34035c",
            "#680061",
            "#94005f",
            "#bb0057",
            "#da2c4a",
            "#f05539",
            "#fd7d24",
            "#ffa600"
          ],
          data: [6, 4, 15, 10, 8, 9, 2, 0]
        }
      ]
    });
  }
};
</script>
