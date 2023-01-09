const dropArea = document.getElementById("drop-area");
const input = document.getElementById("image-file");
const dragSpan = document.getElementById("label");

dropArea.addEventListener("dragenter", handleDragEnter);
dropArea.addEventListener("dragleave", handleDragLeave);
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("drop", handleDrop);
input.addEventListener("onchange", handleDrop);

var base64str;

//----------------------------------------- Image upload logic ----------------------------------------- //
function handleDragEnter(e) {
  e.preventDefault();
  dropArea.classList.add("dragging");
}

function handleDragLeave(e) {
  e.preventDefault();
  dropArea.classList.remove("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  dropArea.classList.remove("dragging");
  const fileList = e.dataTransfer.files;
  resized = preview_image(fileList[0]);
  resized.then((result) => {
    if (result.success) {
      dragSpan.remove();
      inference(result.img);
    } else {
      dragSpan.innerHTML = "Something went wrong, please try again";
    }
  });
}

//----------------------------------------- UI updates ----------------------------------------- //
function updateNutritionCard(data) {
  //TODO: update in recent foods
  getRecentFoodAndCalories();
  console.log(data.nutrition_info);
  var nutritionCard = `
          <div class="card">
            <div class="card-left">
                <img src="${data.img_url}" alt="Food image" id="card-image">
            </div>
            <div class="card-right">
                <h1 class="card-title">${data.nutrition_info["food"]}</h1>
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
        <td class="card-label">${key}</td>
        <td class="card-value">${value}</td>
    </tr>`;

    document
      .getElementById("card-table")
      .insertAdjacentHTML("beforeend", nutritionRow);
  }
}

function displayCalories(totalCalories) {}

function displayRecentFoods(recentFood) {}
