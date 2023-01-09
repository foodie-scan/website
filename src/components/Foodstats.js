import "./Foodstats.css";
export default function Foodstats({ stats_json, food_title }) {
  return (
    <div className="d-flex">
      <div className="image-container">
        <span>this is the img</span>
        <img src="" alt="" />
      </div>
      <div className="content-container">
        <h1 className="card-title ">{food_title}</h1>
        <hr />
        <table className="card-table">
          <tr>
            <td className="card-label">Calories</td>
            <td className="card-value">{stats_json.calories}</td>
          </tr>
          <tr>
            <td className="card-label">Protein</td>
            <td className="card-value">{stats_json.protein}</td>
          </tr>
          <tr>
            <td className="card-label">Saturated Fat</td>
            <td className="card-value">{stats_json.saturated_Fat}</td>
          </tr>
          <tr>
            <td className="card-label">Trans Fat</td>
            <td className="card-value">{stats_json.trans_Fat}</td>
          </tr>
          <tr>
            <td className="card-label">Cholesterol</td>
            <td className="card-value">{stats_json.cholesterol}</td>
          </tr>
          <tr>
            <td className="card-label">Sodium</td>
            <td className="card-value">{stats_json.sodium}</td>
          </tr>
          <tr>
            <td className="card-label">Potassium</td>
            <td className="card-value">{stats_json.potassium}</td>
          </tr>
          <tr>
            <td className="card-label">Dietary Fibre</td>
            <td className="card-value">{stats_json.dietary_Fibre}</td>
          </tr>
          <tr>
            <td className="card-label">Sugars</td>
            <td className="card-value">{stats_json.sugars}</td>
          </tr>
          <tr>
            <td className="card-label">Vitamin A</td>
            <td className="card-value">{stats_json.vitamin_A}</td>
          </tr>
          <tr>
            <td className="card-label">Vitamin C</td>
            <td className="card-value">{stats_json.vitamin_C}</td>
          </tr>
          <tr>
            <td className="card-label">Iron</td>
            <td className="card-value">{stats_json.iron}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
