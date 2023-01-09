import { useCallback, useState } from "react";

import "./index.css";
import Foodstats from "./Foodstats";

function stopEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * @param {JSX.IntrinsicElements["div"]} props
 */
export default function DropArea() {
  const [data_url, setDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [foodstats, setFoodstats] = useState();
  const processImage = useCallback(async function (blob) {
    setLoading(true);
    let data_url = await blobToDataUrl(blob);
    data_url = await resizeImage(data_url);
    const { class_name, img_url, nutrition_info } = await inference(
      data_url.replace(/^data:image\/\w+;base64,/, "")
    );
    setLoading(false);
    setDataUrl(data_url);
    setFoodstats({ src: img_url, stats: nutrition_info, title: class_name });
  }, []);

  return (
    <main className="align-items-center d-flex flex-column">
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

const MAX_SIZE = 256;

/**
 * Resizes image using its data url
 *
 * @param {string} data_url
 * @returns {Promise<string>}
 */
function resizeImage(data_url) {
  return new Promise((resolve) => {
    let image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      let { height, width } = image;

      //the operators below ensure aspect ratios are kept
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      canvas.width = MAX_SIZE;
      canvas.height = MAX_SIZE;
      const ctx = canvas.getContext("2d"); //define 2 dimensional rendering context
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, MAX_SIZE, MAX_SIZE);
      ctx.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
    image.src = data_url;
  });
}

/**
 *
 * @param {string} base64str - Data URL w/o /^data:image\/\w+;base64,/
 * @returns {{
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
 * }}
 */
async function inference(base64str) {
  const inference_response = await fetch(
    "https://vs744x1swk.execute-api.us-east-1.amazonaws.com/LIA_deploy",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ base64str })
    }
  );
  const class_name = await inference_response.json();

  const nutrition_response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ class_name })
    }
  );
  const nutrition = await nutrition_response.json();
  return { class_name, ...nutrition };
}

async function getRecentFoodAndCalories() {
  const response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const apiResponse = await response.json();
  console.log(apiResponse);
  //TODO: Create the below functions
  // displayCalories(apiResponse);
  // displayRecentFoods(apiResponse);
}
