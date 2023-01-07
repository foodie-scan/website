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

async function image_to_base64(file) {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.onerror = (error) => {
      console.log(error);
      alert("An Error occurred please try again, File might be corrupt");
    };
    fileReader.readAsDataURL(file);
  });
  return result_base64;
}

async function preview_image(fileImg) {
  try {
    var userImg = await image_to_base64(fileImg);
    const resized = await reduce_image_file_size(userImg);
    //display image in drop zone
    document.getElementById("preview").src = resized;
    document.getElementById("card-image").src = resized;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
