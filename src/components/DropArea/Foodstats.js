import "./Foodstats.css";

export default function Foodstats({ src, stats, title }) {
  return (
    <div className="border border-2 border-black card flex-row gap-4 mb-3 px-4 py-3 w-100">
      <div className="align-items-center d-flex">
        <img
          src={src}
          className="img-fluid rounded-2"
          alt={title}
          height={224}
          width={224}
        />
      </div>
      <div className="card-body my-1 p-0">
        <h5 className="fw-800 card-title">{title}</h5>
        <hr id="foodstats-divider" />
        <table className="card-table">
          <tr>
            <td className="card-label">Energy</td>
            <td className="card-value">{stats.calories}</td>
          </tr>
          <tr>
            <td className="card-label">Protein</td>
            <td className="card-value">{stats.protein}</td>
          </tr>
          <tr>
            <td className="card-label">Saturated Fat</td>
            <td className="card-value">{stats.saturated_Fat}</td>
          </tr>
          <tr>
            <td className="card-label">Trans Fat</td>
            <td className="card-value">{stats.trans_Fat}</td>
          </tr>
          <tr>
            <td className="card-label">Cholesterol</td>
            <td className="card-value">{stats.cholesterol}</td>
          </tr>
          <tr>
            <td className="card-label">Sodium</td>
            <td className="card-value">{stats.sodium}</td>
          </tr>
          <tr>
            <td className="card-label">Potassium</td>
            <td className="card-value">{stats.potassium}</td>
          </tr>
          <tr>
            <td className="card-label">Dietary Fibre</td>
            <td className="card-value">{stats.dietary_Fibre}</td>
          </tr>
          <tr>
            <td className="card-label">Sugars</td>
            <td className="card-value">{stats.sugars}</td>
          </tr>
          <tr>
            <td className="card-label">Vitamin A</td>
            <td className="card-value">{stats.vitamin_A}</td>
          </tr>
          <tr>
            <td className="card-label">Vitamin C</td>
            <td className="card-value">{stats.vitamin_C}</td>
          </tr>
          <tr>
            <td className="card-label">Iron</td>
            <td className="card-value">{stats.iron}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
