import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);
// const id = "calorie-intake-p5d";

export default function Past5Days() {
  return (
    <section>
      <h4 className="fw-bold text-center text-primary">Past 5 Days</h4>
      <Line
        data={{
          datasets: [
            {
              borderColor: "#20c798",
              borderWidth: 3,
              data: [1200, 1900, 1300, 1500, 900],
              fill: false,
              label: "Calories",
              tension: 0.1
            }
          ],
          labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan"]
        }}
      />
    </section>
  );
}
