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
export default function RecentFood({ food, src, stats }) {
  function RecentFood({ header }) {
    return (
      <tr>
        <th className="pe-3">{header}</th>
        <td align="right">{stats[header]}</td>
      </tr>
    );
  }

  return (
    <div className="align-items-center border border-1 border-dark bg-white card flex-column flex-xxl-row gap-3 px-3 py-2 shadow w-100">
      <div className="align-items-center d-flex">
        <img
          src={src}
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
              <RecentFood header="Energy" />
              <RecentFood header="Protein" />
              <RecentFood header="Saturated Fat" />
              <RecentFood header="Trans Fat" />
            </tbody>
          </table>
        </small>
      </div>
    </div>
  );
}
