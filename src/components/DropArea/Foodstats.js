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
  function FoodstatsRow({ header }) {
    return (
      <tr>
        <th className="pe-4">{header}</th>
        <td align="right">{stats[header]}</td>
      </tr>
    );
  }

  return (
    <div className="align-items-center bg-white border border-2 border-success card flex-column flex-xl-row gap-4 px-4 py-3 w-100">
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
        <h5 className="card-title fw-800 text-center">{food}</h5>
        <hr id="foodstats-divider" />
        <table className="table">
          <tbody>
            <FoodstatsRow header="Energy" />
            <FoodstatsRow header="Protein" />
            <FoodstatsRow header="Saturated Fat" />
            <FoodstatsRow header="Trans Fat" />
            <FoodstatsRow header="Cholesterol" />
            <FoodstatsRow header="Sodium" />
            <FoodstatsRow header="Potassium" />
            <FoodstatsRow header="Dietary Fibre" />
            <FoodstatsRow header="Sugars" />
            <FoodstatsRow header="Vitamin A" />
            <FoodstatsRow header="Vitamin C" />
            <FoodstatsRow header="Iron" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
