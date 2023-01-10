import { useEffect } from "react";

import RecentFood from "./RecentFood.js";

export default function RecentFoods() {
  useEffect(function () {
    // getRecentFoodAndCalories();
  }, []);

  const items = [];

  return (
    <aside>
      <h3 className="fw-800 mb-3">Recent Food</h3>
      {items}
      <RecentFood food="Carrot Cake" stats={{}} />
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
