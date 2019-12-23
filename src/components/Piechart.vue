<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
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
  }
};
</script>