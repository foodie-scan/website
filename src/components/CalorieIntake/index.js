import Past5Days from "./Past5Days";
import Today from "./Today";

import "./Today.css";

export default function CalorieIntake() {
  return (
    <aside className="align-items-center d-flex flex-column">
      <h3 className="fw-800">Calorie Intake</h3>
      <Today />
      <Past5Days />
    </aside>
  );
}
