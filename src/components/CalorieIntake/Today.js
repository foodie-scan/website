import { useEffect, useRef } from "react";
import JustGage from "justgage";

import "./Today.css";

const id = "calorie-intake-today";

export default function Today({ data }) {
  const gauge_ref = useRef();
  useEffect(
    function () {
      if (!gauge_ref.current) {
        // eslint-disable-next-line no-undef
        gauge_ref.current = new JustGage({
          id,
          levelColors: ["#FA8305", "#13EBAD", "#FA053E"],
          max: 3000,
          min: 1500,
          relativeGaugeSize: true,
          value: 0
        });
      }
    },
    [gauge_ref]
  );

  useEffect(
    function () {
      if (data) gauge_ref.current.refresh(data);
    },
    [data, gauge_ref]
  );

  return (
    <section>
      <h4 className="fw-bold text-center text-primary">Today</h4>
      <div className="mx-auto" id={id}></div>
    </section>
  );
}
