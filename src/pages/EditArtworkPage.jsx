import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import artworksService from "../services/artworks.services";
import uploadService from "../services/file-upload.services";
import cityService from "../services/city.services";
import { AuthContext } from "../context/auth.context";
import "../styles/EditArtwork.css";
import Popup from "../components/Popup";

function EditArtworkPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { id } = useParams();

  const [showPopup, setShowPopup] = useState(false)

  const [artwork, setArtwork] = useState(null);
  const [cityOptions, setCityOptions] = useState([])

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [city, setCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);

  const [imagesUrl, setImagesUrl] = useState([]);
  const [imageData, setImageData] = useState("")
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();

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

    // FETCH all cities from the cities model
    // FETCH all cities within germany from an API ?
    // ---> display as options of the city select

    cityService.getAllCities()
    .then((response)=>{
        console.log("fetched all cities", response.data)
        let cityNames = response.data.map((oneCity)=>{
            return {value:oneCity.name, label:oneCity.name}
        })
        console.log(cityNames)
        setCityOptions(cityNames)
    })
    .catch((err)=>{
        console.log(err)
    })
    artworksService
      .getArtwork(id)
      .then((response) => {
        const initialArtwork = response.data;
        console.log(initialArtwork);
        setArtwork(initialArtwork);
        setTitle(initialArtwork.title);
        setYear(initialArtwork.year);
        setCity(initialArtwork.city);
        setDimensionsX(initialArtwork.dimensions.x);
        setDimensionsY(initialArtwork.dimensions.y);
        setDimensionsZ(initialArtwork.dimensions.z);
        setImagesUrl(initialArtwork.images_url);
        setMedium(initialArtwork.medium);
        setGenre(initialArtwork.genre);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function handleImagesUrl(e) {
    e.preventDefault();


    const files = e.target.files;
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append("images", files[i]);
    }

    setImageData(uploadData);
  }

  function handleDeleteImage(e,index){
    e.preventDefault()
    const copiedImages = [...imagesUrl]
    copiedImages.splice(index, 1)
    setImagesUrl(copiedImages)
  }

  // content for delete popup
    function handleYes(e){
      e.preventDefault()

      artworksService.deleteArtwork(id)
      .then((deletedArtwork)=>{
        console.log(deletedArtwork)
        navigate("/profile")
      })
      .catch((err)=>{
        console.log(err)
      })
    
    }
    function handleNo(e){
      e.preventDefault()
      setShowPopup(false)
    }
  const deleteButton = <div className="">
    <button onClick={(e)=>{handleYes(e)}}>Yes</button>
    <button onClick={(e)=>{handleNo(e)}}>No</button>

    </div>

  function handleDeleteArtwork(e) {
    e.preventDefault();

    setShowPopup(true)


  }

  function handleSubmit(e) {
    e.preventDefault();

    let updatedArtwork = {
      title: title,
      artist: artwork.artist,
      year: year,
      city: city,
      dimensions: {
        x: dimensionsX,
        y: dimensionsY,
        z: dimensionsZ,
      },
      // images_url: imagesUrl,
      medium: medium,
      genre: genre,
      isForSale: artwork.isForSale,
    };

    console.log("imageData ", imageData)

    if(imageData){
      uploadService
        .uploadImage(imageData)
        .then((response) => {
          let newImages = response.data.fileUrls
          
          console.log("response is: ", response.data.fileUrls);
          
          let allImagesArray = [...imagesUrl, ...newImages];
          // setImagesUrl(copiedArray);
          updatedArtwork.images_url = allImagesArray;
          return artworksService.updateArtwork(artwork._id, updatedArtwork);
        })
        .then((response) => {
          console.log("successfully updated an artwork with images");
          console.log(response.data);
          navigate(`/artworks/${artwork._id}`)
        })
        .catch((err) => console.log("Error while uploading the file: ", err));
    }
    else{
      updatedArtwork.images_url = imagesUrl
      artworksService.updateArtwork(artwork._id, updatedArtwork)
      .then((response)=>{
        console.log("successfully updated an artwork");
          console.log(response.data);
          navigate(`/artworks/${artwork._id}`)
      })
      .catch((err)=>{
        console.log("Error while uploading the file: ", err)
      })
    }
  }

  return (
    <div id="EditArtworkPage" className="page-wrapper">
    <Popup
    headline={"Are you sure?"}
    showPopup={showPopup}
    setShowPopup={setShowPopup}
    text={"Deleting the artwork is irreversible"}
    button={deleteButton}
     />
    <div className="heading-wrapper">
      <h1>Edit Artwork</h1>
      <button className="back-button" onClick={(e)=>{e.preventDefault(); navigate(-1)}}>{"< Back"}</button>
    </div>

      {isLoggedIn && artwork && (
        <form
        className="edit-artwork-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
            <label htmlFor="title">Title</label>
            <input
              className="edit-artwork-input"
              name="title"
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="year">Year</label>
            <input
              className="edit-artwork-input"
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
            <div className="edit-dimensions">
              <input
                className="edit-artwork-input"
                type="number"
                value={dimensionsX}
                onChange={(e) => {
                  setDimensionsX(e.target.value);
                }}
              />
              x
              <input
                className="edit-artwork-input"
                type="number"
                value={dimensionsY}
                onChange={(e) => {
                  setDimensionsY(e.target.value);
                }}
              />
              y
              <input
                className="edit-artwork-input"
                type="number"
                value={dimensionsZ}
                onChange={(e) => {
                  setDimensionsZ(e.target.value);
                }}
              />
              z
            </div>
            <label htmlFor="">Images</label>
              <input
                className="edit-artwork-input"
                type="file"
                multiple
                onChange={(e) => {
                  handleImagesUrl(e);
                }}
              />
              {/* <button onClick={(e)=>handleImageUpload(e)}>Upload Image</button> */}
              <div className="edit-artwork-img-section">
              {imagesUrl && imagesUrl.map((oneUrl, index) => {
                return (
                  <div className="edit-artwork-img-wrapper" key={index}>
                    <img src={oneUrl} alt={title} />
                    <button className="edit-artwork-img-delete-button" onClick={(e)=>{handleDeleteImage(e,index)}}>x</button>
                  </div>
                );
              })}
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
            <button onClick={handleDeleteArtwork}>Delete Artwork</button>
          <button onSubmit={handleSubmit}>Submit Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditArtworkPage;
