import "../styles/styles-components/UploadButton.css"
import { useRef } from "react";

function FileUploader({handleFileUpload}){

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click(); 
    };

    const handleChange = event => {
        event.preventDefault()
        const files = event.target.files;
        handleFileUpload(files);                   // ADDED
      };


    return (
      <>
        <button
        className="button-upload button"
        onClick={(event)=>handleClick(event)} 
        >
          Upload a file
        </button>

        <input
          ref={hiddenFileInput}
            name="images"
            className="file-input"
            type="file"
            accept=".jpg, .png"
            multiple
            onChange={(event) => {
              handleChange(event);
            }}
            style={{display:'none'}}
          />
  

      </>
    );
  }

  export default FileUploader