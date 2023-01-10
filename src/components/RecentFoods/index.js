import RecentFood from "./RecentFood.js";

export default function RecentFoods({ data }) {
  return (
    <aside>
      <h3 className="fw-800 mb-3">Recent Food</h3>
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
