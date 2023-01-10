import { useEffect, useRef } from "react";
import JustGage from "justgage";

const id = "calorie-intake-today";

export default function Today() {
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
          value: 2250
        });
      }
    },
    [gauge_ref]
  );

  return (
    <section>
      <h4 className="fw-bold text-center text-primary">Today</h4>
      <div className="mx-auto" id={id}></div>
    </section>
  );
}
