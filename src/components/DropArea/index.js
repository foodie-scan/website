import { useCallback, useState } from "react";

import Foodstats from "./Foodstats";

import "./index.css";

function stopEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * @param {JSX.IntrinsicElements["div"]} props
 */
export default function DropArea({ setUpdate }) {
  const [data_url, setDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [foodstats, setFoodstats] = useState();
  const processImage = useCallback(
    async function (blob) {
      setLoading(true);
      let data_url = await blobToDataUrl(blob);
      const { class_name, img_url, nutrition_info } = await inference(data_url);
      setLoading(false);
      setDataUrl(data_url);
      setFoodstats({ food: class_name, src: img_url, stats: nutrition_info });
      setUpdate((update) => !update);
    },
    [setUpdate]
  );

  return (
    <main className="align-items-center d-flex flex-column" id="droparea">
      <div
        className="bg-white border-dark mb-5 placeholder-glow position-relative"
        id="droparea-container"
      >
        <input
          accept="image/jpeg, f/png"
          className="h-100 position-absolute w-100"
          id="droparea-file-input"
          type="file"
          onChange={(e) => processImage(e.target.files[0])}
        />
        <div
          className={`position-relative${loading ? " placeholder" : ""}`}
          id="droparea-preview"
          onDragOver={stopEvent}
          onDrop={async function (e) {
            stopEvent(e);
            await processImage(e.dataTransfer.files[0]);
          }}
          style={{ backgroundImage: `url(${data_url})` }}
        >
          {data_url || loading ? (
            <></>
          ) : (
            <label
              className="fs-5 position-absolute start-50 text-black text-center top-50 w-100"
              htmlFor="droparea-file-input"
              id="droparea-label"
            >
              <span className="fs-4">Drag or Click</span>
              <br />
              to upload images
            </label>
          )}
        </div>
      </div>
      {foodstats ? <Foodstats className="w-100" {...foodstats} /> : <></>}
    </main>
  );
}

/**
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToDataUrl(blob) {
  return new Promise(function (resolve, reject) {
    const file_reader = new FileReader();
    file_reader.onload = function () {
      resolve(file_reader.result);
    };
    file_reader.onerror = function (e) {
      reject(e);
    };
    file_reader.readAsDataURL(blob);
  });
}

/**
 *
 * @param {string} image - Data URL
 * @returns {Promise<{
 *  class_name: string,
 *  img_url: string,
 *  nutrition_info: Record<
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
 *  >
 * }>}
 */
async function inference(image) {
  const response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image })
    }
  );
  const json = await response.json();
  return json;
}
