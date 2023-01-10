import RecentFood from "./RecentFood.js";

import "./RecentFoods.css";

export default function RecentFoods({ data }) {
  return (
    <aside
      className="justify-content-center d-flex flex-row flex-lg-column flex-wrap gap-4"
      id="recent-foods"
    >
      <h3 className="fw-800 text-center text-lg-start w-100">Recent Food</h3>
      {data
        .sort((a, b) => new Date(b.food_timestamp) - new Date(a.food_timestamp))
        .map(function ({ food, food_timestamp }) {
          return (
            <RecentFood
              food={food}
              key={food_timestamp}
              timestamp={food_timestamp}
            />
          );
        })}
    </aside>
  );
}
