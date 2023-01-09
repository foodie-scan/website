// js file to handle image reszing and preview output
async function reduce_image_file_size(
  //TODO: set padding for non-square images
  base64Str,
  MAX_WIDTH = 256,
  MAX_HEIGHT = 256
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
      canvas.width = 256;
      canvas.height = 256;
      let ctx = canvas.getContext("2d"); //define 2 dimensional rendering context
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 256, 256);
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

function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((buf) => {
      return new File([buf], filename, { type: mimeType });
    });
}

function image_to_ndarray(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    const data = new Uint8Array(reader.result);
    const image = ndarray(data, [256, 256, 3]);
    const imageArray = image.reshape([1, 256, 256, 3]);
  };
  return imageArray;
}

// final function used
async function preview_image(fileImg) {
  try {
    // convert image to base64 & resize
    var base64Img = await image_to_base64(fileImg);
    const resized = await reduce_image_file_size(base64Img);
    //display image in drop zone
    document.getElementById("preview").src = resized;
    // convert resized base64 back to file object
    const resizedImgFile = await urltoFile(
      resized,
      fileImg["name"],
      fileImg["type"]
    );
    // const img_ndarray = image_to_ndarray(resizedImgFile);
    return {
      img: resized,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}
