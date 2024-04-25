import React, { useState } from "react";
import axios from "axios";

function Cloudinary() {
    const [imageUrl, setImageUrl] = useState("")

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        // console.log(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div>
      <input type="file" onChange={(e)=>handleFileUpload(e)} />
    </div>
  );
}

export default Cloudinary;


// 1) sends pic to upload route 
// 2) response = url of picture
// 3) set state to image url
// 4) store URL in Database via post request

// many images: "files"

// library documentation
// https://www.npmjs.com/package/multer-storage-cloudinary


// Image Resizing 

// From:
// https://res.cloudinary.com/
// demo/image/upload/
// balloons.jpg

// To:
// https://res.cloudinary.com/
// demo/image/upload/
// w_700,h_530,c_scale/
// balloons.jpg

// I was testing out, and i think the best way of using it would be something like:

// https://res.cloudinary.com/demo/image/upload/w_400,c_scale/balloons.jpg

// So you just set the width and it autoscales height
// or the contrary
// https://res.cloudinary.com/demo/image/upload/h_400,c_scale/balloons.jpg