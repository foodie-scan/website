import { useContext } from "react";

import Food2NutritionContext from "../../contexts/Food2Nutrition";

import "./RecentFood.css";

/**
 * @param {{
 *  src: string,
 *  stats: Record<
 *    | "Energy"
 *    | "Protein"
 *    | "Saturated Fat"
 *    | "Trans Fat",
 *    string
 *  >,
 *  title: string
 * }} props
 * @returns
 */
export default function RecentFood({ food, timestamp }) {
  const food2nutrition = useContext(Food2NutritionContext);
  const info = food2nutrition?.[food];

  function Foodstat({ header }) {
    return (
      <tr>
        <th className="pe-3">{header}</th>
        <td align="right">{info?.[header]}</td>
      </tr>
    );
  }

  return (
    <button
      className="border border-1 border-dark bg-white card d-flex p-0 shadow-sm"
      data-bs-toggle="modal"
      data-bs-target="#food-details"
      data-bs-data={JSON.stringify({ name: food, info })}
    >
      <div className="align-items-center d-flex flex-column flex-xxl-row gap-2 px-3 pt-2">
        <div className="align-items-center d-flex flex-grow-1">
          <img
            src={info?.URL}
            className="img-fluid rounded-2"
            alt={food}
            height={80}
            width={80}
          />
        </div>
        <div className="card-body my-1 p-0">
          <h6 className="card-title fw-800 text-center text-info">{food}</h6>
          <hr className="recent-food-divider" />
          <small className="">
            <table className="table table-hover">
              <tbody>
                <Foodstat header="Energy" />
                <Foodstat header="Protein" />
                <Foodstat header="Saturated Fat" />
                <Foodstat header="Trans Fat" />
              </tbody>
            </table>
          </small>
        </div>
      </div>
      <small className="card-footer text-center text-muted w-100">
        {timestamp}
      </small>
    </button>
  );
}
