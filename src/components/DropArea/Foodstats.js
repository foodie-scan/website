import "./Foodstats.css";

function FoodstatsRow({ data, header }) {
  return (
    <tr>
      <th className="pe-4">{header}</th>
      <td align="right">{data}</td>
    </tr>
  );
}

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
export default function Foodstats({ src, stats, title }) {
  return (
    <div className="align-items-center bg-white border border-2 border-black card flex-column flex-xl-row gap-4 px-4 py-3 w-100">
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
        <h5 className="card-title fw-800 text-center">{title}</h5>
        <hr id="foodstats-divider" />
        <table className="table">
          <tbody>
            <FoodstatsRow data={stats.Energy} header="Energy" />
            <FoodstatsRow data={stats.Protein} header="Protein" />
            <FoodstatsRow
              data={stats["Saturated Fat"]}
              header="Saturated Fat"
            />
            <FoodstatsRow data={stats["Trans Fat"]} header="Trans Fat" />
            <FoodstatsRow data={stats.Cholesterol} header="Cholesterol" />
            <FoodstatsRow data={stats.Sodium} header="Sodium" />
            <FoodstatsRow data={stats.Potassium} header="Potassium" />
            <FoodstatsRow
              data={stats["Dietary Fiber"]}
              header="Dietary Fibre"
            />
            <FoodstatsRow data={stats.Sugars} header="Sugars" />
            <FoodstatsRow data={stats["Vitamin A"]} header="Vitamin A" />
            <FoodstatsRow data={stats["Vitamin C"]} header="Vitamin C" />
            <FoodstatsRow data={stats.Iron} header="Iron" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
