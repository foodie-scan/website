import CalorieIntake from "./components/CalorieIntake";
import DropArea from "./components/DropArea";
import RecentFoods from "./components/RecentFoods";

import "./App.css";

export default function App() {
  return (
    <div id="container" className="mx-auto">
      <header className="align-items-center d-flex justify-content-center mt-2">
        <a
          className="fw-800 header-brand text-decoration-none text-primary"
          href="/"
        >
          Foodie
          <svg
            className="ms-2"
            xmlns="http://www.w3.org/2000/svg"
            width="81"
            height="81"
            viewBox="0 0 109 123"
          >
            <g id="Group_6" data-name="Group 6" transform="translate(0 1.75)">
              <line
                id="Line_1"
                data-name="Line 1"
                x2="109"
                transform="translate(0 52.07)"
                fill="#fa8a10"
                stroke="#1a1818"
                strokeMiterlimit="10"
                strokeWidth="6"
              />
              <g
                id="Group_1"
                data-name="Group 1"
                transform="translate(4.712 87.412)"
              >
                <line
                  id="Line_2"
                  data-name="Line 2"
                  y1="19.071"
                  transform="translate(1.207)"
                  fill="none"
                  stroke="#1a1818"
                  strokeMiterlimit="10"
                  strokeWidth="6"
                />
                <line
                  id="Line_3"
                  data-name="Line 3"
                  x2="18.561"
                  transform="translate(0 17.821)"
                  fill="none"
                  stroke="#1a1818"
                  strokeMiterlimit="10"
                  strokeWidth="6"
                />
              </g>
              <g
                id="Group_2"
                data-name="Group 2"
                transform="translate(85.97 87.412)"
              >
                <line
                  id="Line_4"
                  data-name="Line 4"
                  y1="19.071"
                  transform="translate(17.355)"
                  fill="none"
                  stroke="#1a1818"
                  strokeMiterlimit="10"
                  strokeWidth="6"
                />
                <line
                  id="Line_5"
                  data-name="Line 5"
                  x1="18.561"
                  transform="translate(0 17.821)"
                  fill="none"
                  stroke="#1a1818"
                  strokeMiterlimit="10"
                  strokeWidth="6"
                />
              </g>
              <g id="Group_5" data-nam fe="Group 5" transform="translate(4.59)">
                <g
                  id="Group_3"
                  data-name="Group 3"
                  transform="translate(81.258)"
                >
                  <line
                    id="Line_6"
                    data-name="Line 6"
                    y2="19.071"
                    transform="translate(17.355)"
                    fill="none"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                  />
                  <line
                    id="Line_7"
                    data-name="Line 7"
                    x1="18.561"
                    transform="translate(0 1.25)"
                    fill="none"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                  />
                </g>
                <g id="Group_4" data-name="Group 4">
                  <line
                    id="Line_8"
                    data-name="Line 8"
                    y2="19.071"
                    transform="translate(1.207)"
                    fill="none"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                  />
                  <line
                    id="Line_9"
                    data-name="Line 9"
                    x2="18.561"
                    transform="translate(0 1.25)"
                    fill="none"
                    stroke="#1a1818"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                  />
                </g>
              </g>
              3
            </g>
          </svg>
        </a>
      </header>
      <hr className="border-0 mb-5 mx-auto" id="top-divider" />
      <div className="d-flex gap-5 mb-5 w-100">
        <RecentFoods />

        <DropArea />

        <CalorieIntake />
      </div>
    </div>
  );
}
