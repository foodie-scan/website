import { useEffect, useState } from "react";

import CalorieIntake from "./CalorieIntake";
import DropArea from "./DropArea";
import RecentFoods from "./RecentFoods";

export default function Content() {
  const [calorie_intake, setCalorieIntake] = useState({});
  const [recent_foods, setRecentFoods] = useState([]);
  useEffect(function () {
    (async function () {
      const { recent_food, calorie_history } = await getRecentFoodAndCalories();
      setCalorieIntake(calorie_history);
      setRecentFoods(recent_food);
    })();
  }, []);

  return (
    <div className="d-flex gap-5 mb-5 w-100">
      <RecentFoods />
      <DropArea />
      <CalorieIntake calorie_intake={calorie_intake} />
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
