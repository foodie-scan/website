import { useEffect, useState } from "react";

import CalorieIntake from "./CalorieIntake";
import DropArea from "./DropArea";
import RecentFoods from "./RecentFoods";

export default function Content() {
  const [calorie_intake, setCalorieIntake] = useState({});
  const [recent_foods, setRecentFoods] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(
    function () {
      (async function () {
        const { recent_food, calorie_history } =
          await getRecentFoodAndCalories();
        setCalorieIntake(calorie_history);
        setRecentFoods(recent_food);
      })();
    },
    [update]
  );

  return (
    <div className="align-items-center align-items-lg-start d-flex flex-column flex-lg-row gap-5 mb-5 w-100">
      <DropArea setUpdate={setUpdate} />
      <CalorieIntake data={calorie_intake} />
      <RecentFoods data={recent_foods} />
    </div>
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
  return await response.json();
}
