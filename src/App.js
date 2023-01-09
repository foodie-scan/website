import DropArea from "./components/DropArea";
import Foodstats from "./components/Foodstats";
import sample_food from "./sample_food.json";

import "./App.css";

export default function App() {
  return (
    <div>
      <header>
        <div className="header-left">
          <a href="/" className="header-brand">
            Foodie scan
          </a>
        </div>
      </header>
      <div id="middle-container">
        <form method="post" encType="multipart/form-data">
          <div>
            <input
              type="file"
              id="image-file"
              name="file"
              accept="image/jpeg,image/png"
              multiple
            />
          </div>
        </form>

        <DropArea />

        <div className="card">
          <div className="card-left">
            <img alt="Food" id="card-image" />
          </div>
          <div className="card-right">
            <Foodstats food_title={"burger"} stats_json={sample_food} />
          </div>
        </div>
      </div>
    </div>
  );
}
