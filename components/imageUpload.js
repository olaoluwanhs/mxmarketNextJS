export function uploadImage(file) {
  //
  const Result = new Promise(async (resolve, reject) => {
    //
    let data = new FormData();
    data.append("image", file);
    const res = await fetch("http://localhost:4000/image", {
      method: "post",
      credentials: "include",
      body: data,
    });
    const result = await res.json();
    //
    // console.log(result);
    if (result.message != "Upload successful") {
      resolve(result);
      throw result.error.message;
    } else {
      resolve(result);
    }
    //
  });
  return Result;
  //
}

export function uploadImages(files) {
  //
  // console.log(files);
  return new Promise(async (resolve, reject) => {
    //
    let imageForm = new FormData();
    Array.from(files).forEach((e) => {
      imageForm.append("images", e);
    });
    let result = await fetch("http://localhost:4000/images", {
      method: "post",
      credentials: "include",
      body: imageForm,
    });
    result = await result.json();
    //
    // console.log(result);
    resolve(result);
  });
  //
}
