import "./Foodstats.css";

/**
 * @param {{
 *  src: string,
 *  stats: Record<
 *    | "Cholesterol"
 *    | "Dietary Fiber"
 *    | "Energy"
 *    | "Iron"
 *    | "Potassium"
 *    | "Protein"
 *    | "Saturated Fat"
 *    | "Sodium"
 *    | "Sugars"
 *    | "Trans Fat"
 *    | "Vitamin A"
 *    | "Vitamin C",
 *    string
 *  >,
 *  title: string
 * }} props
 * @returns
 */
export default function Foodstats({ food, src, stats }) {
  function Foodstat({ header }) {
    return (
      <tr>
        <th className="pe-4">{header}</th>
        <td align="right">{stats[header]}</td>
      </tr>
    );
  }

  return (
    <div className="align-items-center bg-white border border-2 border-black card flex-column flex-xl-row gap-4 px-4 py-3 shadow-lg w-100">
      <div className="align-items-center d-flex">
        <img
          src={src}
          className="img-fluid rounded-2"
          alt={food}
          height={224}
          width={224}
        />
      </div>
      <div className="card-body my-1 p-0">
        <h5 className="card-title fw-800 text-center text-info">{food}</h5>
        <hr id="foodstats-divider" />
        <table className="table">
          <tbody>
            <Foodstat header="Energy" />
            <Foodstat header="Protein" />
            <Foodstat header="Saturated Fat" />
            <Foodstat header="Trans Fat" />
            <Foodstat header="Cholesterol" />
            <Foodstat header="Sodium" />
            <Foodstat header="Potassium" />
            <Foodstat header="Dietary Fiber" />
            <Foodstat header="Sugars" />
            <Foodstat header="Vitamin A" />
            <Foodstat header="Vitamin C" />
            <Foodstat header="Iron" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
