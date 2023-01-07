const dropArea = document.getElementById("drop-area");
const input = document.getElementById("image-file");

dropArea.addEventListener("dragenter", handleDragEnter);
dropArea.addEventListener("dragleave", handleDragLeave);
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("drop", handleDrop);

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
    if (result) {
      dragSpan.remove();
      console.log("removed");
    } else {
      dragSpan.innerHTML = "Something went wrong, please try again";
    }
  });
}
