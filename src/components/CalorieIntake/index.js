import PastDays from "./PastDays";
import Today from "./Today";

import "./index.css";

export default function CalorieIntake({ data }) {
  const date = new Date();

  return (
    <aside
      className="align-items-center d-flex flex-column"
      id="calorie-intake"
    >
      <h3 className="fw-800">Calorie Intake</h3>
      <Today data={data[formatYYYYMMDD(date)]} />
      <PastDays
        data={Object.values(data)}
        labels={Object.keys(data).map(function (date_str) {
          const date = new Date(date_str);
          return formatMMMDD(date);
        })}
      />
    </aside>
  );
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

/**
 * @param {Date} date
 */
function formatMMMDD(date) {
  return `${months[date.getMonth()]} ${padNum2Zero(date.getDate())}`;
}

/**
 * @param {Date} date
 */
function formatYYYYMMDD(date) {
  return `${date.getFullYear()}-${padNum2Zero(
    date.getMonth() + 1
  )}-${padNum2Zero(date.getDate())}`;
}

/**
 * @param {number} num
 */
function padNum2Zero(num) {
  return num.toString().padStart(2, "0");
}
