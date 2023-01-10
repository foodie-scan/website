import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Food2NutritionProvider from "./providers/Food2Nutrition";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Food2NutritionProvider>
      <App />
    </Food2NutritionProvider>
  </React.StrictMode>
);
