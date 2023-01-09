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
  const processImage = useCallback(async function (blob) {
    let data_url = await blobToDataUrl(blob);
    data_url = await resizeImage(data_url);
    await inference(data_url.replace(/^data:image\/\w+;base64,/, ""));
    setDataUrl(data_url);
  }, []);

  return (
    <>
      <div className="border-dark mb-5" id="droparea-container">
        <input
          accept="image/jpeg, f/png"
          id="droparea-file-input"
          type="file"
          onChange={(e) => processImage(e.target.files[0])}
        />
        <div
          className={data_url ? "has-image" : ""}
          id="droparea-preview"
          onDragOver={stopEvent}
          onDrop={async function (e) {
            stopEvent(e);
            await processImage(e.dataTransfer.files[0]);
          }}
          style={{ backgroundImage: `url(${data_url})` }}
        >
          <label
            className="fs-5 text-center w-100"
            htmlFor="droparea-file-input"
            id="droparea-label"
          >
            <span className="fs-4">Drag or Click</span>
            <br />
            to upload images
          </label>
        </div>
      </div>
      <Foodstats className="w-100" src={data_url} stats={{}} title={"Burger"} />
    </>
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

async function inference(image_array) {
  const inference_response = await fetch(
    "https://vs744x1swk.execute-api.us-east-1.amazonaws.com/LIA_deploy",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ base64str: image_array })
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
  console.log(await nutrition_response.json());
  // updateNutritionCard(nutritionData);
}

function updateNutritionCard(data) {
  //TODO: update in recent foods
  getRecentFoodAndCalories();
  console.log(data.nutrition_info);
  var nutritionCard = `
          <div className="card">
            <div className="card-left">
                <img src="${data.img_url}" alt="Food image" id="card-image">
            </div>
            <div className="card-right">
                <h1 className="card-title">${data.nutrition_info["food"]}</h1>
                <hr>
                <table id="card-table">
                </table>
            </div>
          </div>`;

  document
    .getElementById("middle-container")
    .insertAdjacentHTML("beforeend", nutritionCard);
  delete data.nutrition_info.food;

  for (const [key, value] of Object.entries(data.nutrition_info)) {
    var nutritionRow = `
    <tr>
        <td className="card-label">${key}</td>
        <td className="card-value">${value}</td>
    </tr>`;

    try {
      document
        .getElementById("card-table")
        .insertAdjacentHTML("beforeend", nutritionRow);
    } catch (error) {
      console.log(error);
    }
  }
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
