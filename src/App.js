import DropArea from "./components/DropArea";

import "./App.css";

export default function App() {
  return (
    <div>
      <header>
        <div className="header-left">
          <a href="/" className="header-brand">
            Foodie
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

        <div class="card">
          <div class="card-left">
            <img src="" alt="Food" id="card-image" />
          </div>
          <div class="card-right">
            <h1 class="card-title">Food Title</h1>
            <hr />
            <table class="card-table">
              <tr>
                <td class="card-label">Calories</td>
                <td class="card-value">100</td>
              </tr>
              <tr>
                <td class="card-label">Protein</td>
                <td class="card-value">20g</td>
              </tr>
              <tr>
                <td class="card-label">Saturated Fat</td>
                <td class="card-value">5g</td>
              </tr>
              <tr>
                <td class="card-label">Trans Fat</td>
                <td class="card-value">100</td>
              </tr>
              <tr>
                <td class="card-label">Cholesterol</td>
                <td class="card-value">20g</td>
              </tr>
              <tr>
                <td class="card-label">Sodium</td>
                <td class="card-value">5g</td>
              </tr>
              <tr>
                <td class="card-label">Potassium</td>
                <td class="card-value">100</td>
              </tr>
              <tr>
                <td class="card-label">Dietary Fibre</td>
                <td class="card-value">20g</td>
              </tr>
              <tr>
                <td class="card-label">Sugars</td>
                <td class="card-value">5g</td>
              </tr>
              <tr>
                <td class="card-label">Vitamin A</td>
                <td class="card-value">5g</td>
              </tr>
              <tr>
                <td class="card-label">Vitamin C</td>
                <td class="card-value">5g</td>
              </tr>
              <tr>
                <td class="card-label">Iron</td>
                <td class="card-value">5g</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
