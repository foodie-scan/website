import { useEffect, useState } from "react";

import Food2NutritionContext from "../contexts/Food2Nutrition";

export default function Food2NutritionProvider({ children }) {
  const [food2nutrition, setFood2nutrition] = useState();

  useEffect(function () {
    (async function () {
      const food2nutrition = await getFood2nutrition();
      setFood2nutrition(food2nutrition.body);
    })();
  }, []);

  return (
    <Food2NutritionContext.Provider value={food2nutrition}>
      {children}
    </Food2NutritionContext.Provider>
  );
}

async function getFood2nutrition() {
  const response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test/nutrition_values",
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return await response.json();
}
