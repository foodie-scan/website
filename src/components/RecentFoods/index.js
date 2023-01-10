import RecentFood from "./RecentFood.js";

export default function RecentFoods() {
  const items = [];

  return (
    <aside>
      <h3 className="fw-800 mb-3">Recent Food</h3>
      {items}
      <RecentFood food="Carrot Cake" stats={{}} />
    </aside>
  );
}
