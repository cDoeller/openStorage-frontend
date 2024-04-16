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
      .post("http://localhost:5005/api/upload", uploadData)
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

// library documentation
// https://www.npmjs.com/package/multer-storage-cloudinary