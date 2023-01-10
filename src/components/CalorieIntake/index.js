import Today from "./Today";

import "./Today.css";

export default function CalorieIntake() {
  return (
    <aside className="align-items-center d-flex flex-column">
      <h3 className="fw-800">Calorie Intake</h3>
      <Today />
      <section>
        <h4 className="fw-bold text-primary">Past 5 Days</h4>
      </section>
    </aside>
  );
}
