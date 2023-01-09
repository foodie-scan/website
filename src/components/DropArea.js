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
          setClassName("dragging");
          const userImg = await blobToDataUrl(e.dataTransfer.files[0]);
          await inference(userImg);
          //display image in drop zone
          const resized = await reduce_image_file_size(userImg);
          setSrc(resized);
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

// js file to handle image reszing and preview output
async function reduce_image_file_size(
  base64Str,
  MAX_WIDTH = 580,
  MAX_HEIGHT = 380
) {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      //the operators below ensure aspect ratios are kept
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d"); //define 2 dimensional rendering context
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
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

  // const response = await fetch(
  //   "https://sv06w3n01b.execute-api.us-east-1.amazonaws.com/LIA_stage_test",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(payload)
  //   }
  // );
  // const nutritionData = await response.json();
  // console.log(nutritionData);
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
