import FoodItem from "./FoodItem.js";
import sample_food from "./../sample_food.json";
export default function RecentFood() {
  return (
    <>
      <h1>Recent Food</h1>
      <FoodItem name={"burger"} stats_array={sample_food} />
    </>
  );
}
