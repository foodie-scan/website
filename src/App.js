import DropArea from "./components/DropArea";
import Foodstats from "./components/Foodstats";
import sample_food from "./sample_food.json";
import RecentFood from "./components/RecentFood";

import "./App.css";

export default function App() {
  return (
    <>
      <header>
        <div className="header-left my-5">
          <a href="/" className="header-brand">
            Foodie scan
          </a>
        </div>
      </header>
      <div className="d-flex flex-row w-100">
        <div className="side-container">
          <h1>Left side</h1>
          {/* <RecentFood name="burger" stats_json={sample_food} /> */}
        </div>

        <div className="align-items-center d-flex flex-column middle-container">
          <DropArea />

          <div className="card">
            <Foodstats
              className="w-100"
              food_title={"burger"}
              stats_json={sample_food}
            />
          </div>
        </div>

        <div className="side-container">
          <h1>Right side</h1>
          {/* <RecentFood name="burger" stats_json={sample_food} /> */}
        </div>
      </div>
    </>
  );
}
