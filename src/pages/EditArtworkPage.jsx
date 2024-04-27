import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import artworksService from "../services/artworks.services";
import cityService from "../services/city.services";
import { AuthContext } from "../context/auth.context";
import "../styles/EditArtwork.css";

function EditArtworkPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [cityOptions, setCityOptions] = useState([])

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [city, setCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");

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

  function handleImageUpload(e) {
    e.preventDefault();

    const copiedImages = [imageToUpload,...imagesUrl]
    console.log(imageToUpload)
    setImagesUrl(copiedImages)
  }

  function handleDeleteImage(e,index){
    e.preventDefault()
    const copiedImages = [...imagesUrl]
    copiedImages.splice(index, 1)
    setImagesUrl(copiedImages)
  }

  function handleDeleteArtwork(e) {
    e.preventDefault();

    // open a modal to confirm choice
    // then make the delete call
  }

  function handleSubmit(e) {
    e.preventDefault();

    const changedArtwork = {
      title: title,
      artist: artwork.artist,
      year: year,
      city: city,
      dimensions: {
        x: dimensionsX,
        y: dimensionsY,
        z: dimensionsZ,
      },
      images_url: imagesUrl,
      medium: medium,
      genre: genre,
      isForSale: artwork.isForSale,
    };

    artworksService
      .updateArtwork(id, changedArtwork)
      .then((response) => {
        console.log("successfully changed an artwork");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="EditArtworkPage" className="page-wrapper">
    <div className="edit-artwork-heading-wrapper">
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
                type="text"
                onChange={(e) => {
                  setImageToUpload(e.target.value);
                }}
              />
              <button onClick={(e)=>handleImageUpload(e)}>Upload Image</button>
              <div className="edit-artwork-img-section">
              {imagesUrl && imagesUrl.map((oneUrl, index) => {
                return (
                  <div className="edit-artwork-img-wrapper" key={index}>
                    <img src={oneUrl} alt={title} />
                    <button className="edit-artwork-img-delete-button" onClick={(e,index)=>{handleDeleteImage(e,index)}}>x</button>
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
          <button onSubmit={handleSubmit}>Submit Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditArtworkPage;
