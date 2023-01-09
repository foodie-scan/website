import { useState } from "react";

/**
 * @param {JSX.IntrinsicElements["div"]} props
 */
export default function DropArea(props) {
  const [class_name, setClassName] = useState("");
  const [label, setLabel] = useState("Drop files here");
  const [src, setSrc] = useState("");

  return (
    <div
      className={class_name}
      id="drop-area"
      onDragEnter={function (e) {
        e.preventDefault();
        setClassName("dragging");
      }}
      onDragLeave={function (e) {
        e.preventDefault();
        setClassName("");
      }}
      onDragOver={function (e) {
        e.preventDefault();
      }}
      onDrop={async function (e) {
        try {
          e.preventDefault();
          const data_url = await resizeDataUrl(
            await blobToDataUrl(e.dataTransfer.files[0])
          );
          await inference(data_url);
          setClassName("dragging");
          //display image in drop zone
          setSrc(data_url);
        } catch (error) {
          console.error(error);
          setLabel("Something went wrong, please try again");
        }
      }}
      {...props}
    >
      {src ? <></> : <span className="label">{label}</span>}
      <img alt="Preview" src={src} />
    </div>
  );
}

const MAX_SIZE = 256;

/**
 * Resizes image using its data url
 *
 * @param {string} data_url
 */
async function resizeDataUrl(data_url) {
  return new Promise((resolve) => {
    let image = new Image();
    image.onload = () => {
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
 * @param {Blob} blob
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

async function inference(base64str) {
  console.log(base64str);
  const payload = {
    base64str
  };

  const response = await fetch(
    "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );
  const nutritionData = await response.json();
  console.log(nutritionData);
  updateNutritionCard(nutritionData);
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
