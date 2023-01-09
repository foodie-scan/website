import FoodItem from "./FoodItem.js";
// import sample_food from "./../sample_food.json";
export default function RecentFood({ foods_array }) {
  const items = [];
  for (const food of foods_array) {
    items.push(<FoodItem key={food.id} {...food} />);
  }
  return (
    <div className="d-flex">
      <h1>Recent Food</h1>
      {items}
      {/* <FoodItem name={"burger"} stats_array={sample_food} /> */}
    </div>
  );
}
