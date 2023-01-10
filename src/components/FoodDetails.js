import { useEffect, useRef, useState } from "react";

const id = "food-details";

export default function FoodDetails() {
  const modal = useRef();
  const modal_close = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    modal.current?.addEventListener("show.bs.modal", (ev) => {
      const btn = ev.relatedTarget;
      const data = btn.getAttribute("data-bs-data");
      if (data) {
        setData(JSON.parse(data));
      }
    });
  }, []);

  function Foodstat({ header }) {
    const foodstat = data?.info?.[header];
    return foodstat ? (
      <tr>
        <th className="pe-4">{header}</th>
        <td align="right">{foodstat}</td>
      </tr>
    ) : (
      <></>
    );
  }

  return (
    <div className="modal fade" id={id} ref={modal} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="fw-bold modal-title text-info">{data?.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              ref={modal_close}
              title="Cancel"
            />
          </div>
          <div className="align-items-center d-flex flex-column modal-body px-4">
            <img
              src={data?.info?.URL}
              className="img-fluid mx-auto rounded-2"
              alt={data?.name}
              height={240}
              width={240}
            />
            <hr id="food-details-divider" />
            <table className="table table-hover table-striped">
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark rounded-2"
              onClick={() => modal_close.current?.click()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
