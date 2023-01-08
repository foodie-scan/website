const dropArea = document.getElementById("drop-area");
const input = document.getElementById("image-file");

dropArea.addEventListener("dragenter", handleDragEnter);
dropArea.addEventListener("dragleave", handleDragLeave);
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("drop", handleDrop);

var base64str;

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
  c = preview_image(fileList[0]);
  const dragSpan = document.getElementById("label");
  c.then((result) => {
    console.log("result", result);
    if (result.status) {
      dragSpan.remove();
      console.log(result.img);
      inference(result.img);
    } else {
      dragSpan.innerHTML = "Something went wrong, please try again";
    }
  });
}

function updateNutritionCard(data) {
  //TODO: update card UI from new food and update in recent foods
}
