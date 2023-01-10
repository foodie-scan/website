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

export default function Past5Days({ data, labels }) {
  return (
    <section>
      <h4 className="fw-bold text-center text-primary">Past 5 Days</h4>
      <Line
        data={{
          datasets: [
            {
              borderColor: "#20c798",
              borderWidth: 3,
              data,
              fill: false,
              label: "Calories",
              tension: 0.1
            }
          ],
          labels
        }}
      />
    </section>
  );
}
