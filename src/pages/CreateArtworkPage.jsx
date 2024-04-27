import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Select from "react-select";
import cityService from "../services/city.services";
import "../styles/CreateArtwork.css";
import artworksService from "../services/artworks.services";
import uploadService from "../services/file-upload.services";

function CreateArtworkPage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [cityOptions, setCityOptions] = useState();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date());
  // array for local file paths
  const [localImagesUrl, setLocalImagesUrl] = useState([]);
  const [imageData, setImageData] = useState("");
  const [city, setCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");

  // adding and removing a single path of a file to be uploaded
  const [imageToUpload, setImageToUpload] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  // REACT SELECT OPTIONS
  let mediaOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Photography", label: "Photography" },
    { value: "Painting", label: "Painting" },
    { value: "Installation", label: "Installation" },
    { value: "Drawing", label: "Drawing" },
  ];
  let genreOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Surreal", label: "Surreal" },
    { value: "Dada", label: "Dada" },
    { value: "Minimalism", label: "Minimalism" },
    { value: "Digital Art", label: "Digital Art" },
    { value: "Abstract", label: "Abstract" },
    { value: "Figurative", label: "Figurative" },
    { value: "Conceptual Art", label: "Conceptual Art" },
  ];

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleMediaSelectChange(selectedOption) {
    setMedium(selectedOption.value);
  }
  function handleGenreSelectChange(selectedOption) {
    setGenre(selectedOption.value);
  }
  function handleCitiesSelectChange(selectedOption) {
    setCity(selectedOption.value);
  }

  // REACT SELECT STYLING
  // https://react-select.com/styles#inner-components
  const selectStles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "none",
      outline: "red",
      borderRadius: "0",
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: "red",
      border: "none",
      borderRadius: "0",
      borderBottom: "2px solid black",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      border: "none",
      outline: "none",
      color: "black",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      margin: "0",
      borderRadius: "0",
      maxHeight: "7rem",
      overflow: "scroll",
    }),
  };

  useEffect(() => {
    cityService.getAllCities().then((response) => {
      let cityNames = response.data.map((oneCity) => {
        return { value: oneCity.name, label: oneCity.name };
      });
      // console.log(cityNames);
      setCityOptions(cityNames);
    });
  }, []);

  function handleDeleteImage(e, index) {
    e.preventDefault();
    const copiedImages = [...uploadedImages];
    copiedImages.splice(index, 1);
    setUploadedImages(copiedImages);
  }

  function handleImagesUrl(e) {
    e.preventDefault();

    const files = e.target.files;
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append("images", files[i]);
    }

    setImageData(uploadData);
  }

  // function handleFilesUpload(localImagesUrl) {
  //   localImagesUrl.map((oneUrl)=>{
  //     // creates the data to be sent to the uploader in the backend
  //     let uploadData = new FormData()
  //     uploadData.append("imageUrl", oneUrl)
  //     console.log("empty uploadData", uploadData)

  //     // performs the action of sending the data
  //     uploadService.uploadImage(uploadData)
  //       .then((response) => {
  //         console.log("response is: ", response);
  //         // response carries "fileUrl" which we can use to update the state
  //         let copiedArray = [...uploadedImages, response.data.fileUrl]
  //         setUploadedImages(copiedArray)
  //       })
  //       .catch((err) => console.log("Error while uploading the file: ", err));
  //     })
  //     console.log("url array to be put into images_url", uploadedImages)
  //     // return urlArray
  //   }

  function handleSubmit(e) {
    e.preventDefault();
    let newArtwork = {
      title: title,
      year: year,
      artist: user._id,
      city: city,
      dimensions: {
        x: dimensionsX,
        y: dimensionsY,
        z: dimensionsZ,
      },
      // images_url:uploadedImages,
      medium: medium,
      genre: genre,
    };

    uploadService
      .uploadImage(imageData)
      .then((response) => {
        newArtwork.images_url = response.data.fileUrls;

        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        let copiedArray = [...uploadedImages, response.data.fileUrls];
        setUploadedImages(copiedArray);
        return artworksService.createArtwork(newArtwork);
      })
      .then((response) => {
        console.log("successfully created a new artwork");
        const newArtwork = response.data.newArtwork;
        console.log(newArtwork);
        // navigate(`/artworks/${newArtwork._id}`)
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }

  return (
    <div id="CreateArtworkPage" className="page-wrapper">
      <div className="create-artwork-heading-wrapper">
        <h1>Create Artwork</h1>
        <button
          className="back-button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {" "}
          {"< Back"}
        </button>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="create-artwork-form"
      >
        <label htmlFor="title">Title</label>
        <input
          className="create-artwork-input"
          name="title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="year">Year</label>
        <input
          className="create-artwork-input"
          name="year"
          value={year}
          type="number"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />

        {/* CITY */}
        <label htmlFor="" className="filterinterface-form-label">
          City
        </label>
        <Select
          options={cityOptions}
          onChange={handleCitiesSelectChange}
          value={{ label: city }}
          styles={selectStles}
        />

        <label htmlFor="">Dimensions</label>
        <div className="create-dimensions-wrapper">
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsX}
            onChange={(e) => {
              setDimensionsX(e.target.value);
            }}
          />
          x
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsY}
            onChange={(e) => {
              setDimensionsY(e.target.value);
            }}
          />
          y
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsZ}
            onChange={(e) => {
              setDimensionsZ(e.target.value);
            }}
          />
          z
        </div>

        <div className="create-artwork-img-section">
          <label htmlFor="images">Images</label>
          <input
            name="images"
            multiple
            onChange={(e) => {
              handleImagesUrl(e);
            }}
            type="file"
          />
          {/* <button
            onClick={(e) => {
              handleImagesUrl(e);
            }}
          >
            Upload Image
          </button> */}
          <div className="create-artwork-thumbnail-wrapper">
            {uploadedImages &&
              uploadedImages.map((oneImage, index) => {
                return (
                  <div key={index} className="create-artwork-img-wrapper">
                    <img src={oneImage} alt={title} />
                    <button
                      className="create-artwork-delete-img-button"
                      onClick={(e) => {
                        handleDeleteImage(e, index);
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* MEDIUM */}
        <label htmlFor="" className="filterinterface-form-label">
          Medium
        </label>
        <Select
          options={mediaOptions}
          onChange={handleMediaSelectChange}
          value={{ label: medium }}
          styles={selectStles}
        />

        {/* GENRE */}
        <label htmlFor="" className="filterinterface-form-label">
          Genre
        </label>
        <Select
          options={genreOptions}
          onChange={handleGenreSelectChange}
          value={{ label: genre }}
          styles={selectStles}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateArtworkPage;
