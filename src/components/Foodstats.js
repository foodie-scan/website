export default function Foodstats({ stats_json, food_title }) {
  return (
    <>
      <h1 className="card-title">{food_title}</h1>
      <hr />
      <table className="card-table">
        <tr>
          <td className="card-label">Calories</td>
          <td className="card-value">{stats_json.Calories}</td>
        </tr>
        <tr>
          <td className="card-label">Protein</td>
          <td className="card-value">{stats_json.Protein}</td>
        </tr>
        <tr>
          <td className="card-label">Saturated Fat</td>
          <td className="card-value">{stats_json.Saturated_Fat}</td>
        </tr>
        <tr>
          <td className="card-label">Trans Fat</td>
          <td className="card-value">{stats_json.Trans_Fat}</td>
        </tr>
        <tr>
          <td className="card-label">Cholesterol</td>
          <td className="card-value">{stats_json.Cholesterol}</td>
        </tr>
        <tr>
          <td className="card-label">Sodium</td>
          <td className="card-value">{stats_json.Sodium}</td>
        </tr>
        <tr>
          <td className="card-label">Potassium</td>
          <td className="card-value">{stats_json.Potassium}</td>
        </tr>
        <tr>
          <td className="card-label">Dietary Fibre</td>
          <td className="card-value">{stats_json.Dietary_Fibre}</td>
        </tr>
        <tr>
          <td className="card-label">Sugars</td>
          <td className="card-value">5{stats_json.Sugars}</td>
        </tr>
        <tr>
          <td className="card-label">Vitamin A</td>
          <td className="card-value">{stats_json.Vitamin_A}</td>
        </tr>
        <tr>
          <td className="card-label">Vitamin C</td>
          <td className="card-value">{stats_json.Vitamin_C}</td>
        </tr>
        <tr>
          <td className="card-label">Iron</td>
          <td className="card-value">{stats_json.Iron}</td>
        </tr>
      </table>
    </>
  );
}
