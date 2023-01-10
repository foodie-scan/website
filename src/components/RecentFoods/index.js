import { useEffect } from "react";

import FoodItem from "./FoodItem.js";

export default function RecentFoods() {
  useEffect(function () {
    // getRecentFoodAndCalories();
  }, []);

  const items = [];

  return (
    <aside>
      <h3 className="fw-800">Recent Food</h3>
      {items}
      {/* <FoodItem name={"burger"} stats_array={sample_food} /> */}
    </aside>
  );
}

async function getRecentFoodAndCalories() {
  const response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const apiResponse = await response.json();
  console.log(apiResponse);
  //TODO: Create the below functions
  // displayCalories(apiResponse);
  // displayRecentFoods(apiResponse);
}
