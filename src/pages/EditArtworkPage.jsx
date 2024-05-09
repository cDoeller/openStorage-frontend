import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import Popup from "../components/Popup";
import artworksService from "../services/artworks.services";
import uploadService from "../services/file-upload.services";
import "../styles/styles-pages/EditArtwork.css";
import "../styles/styles-templates/Forms.css";
import germanCities from "../data/cities-germany.json";
import FileUploader from "../components/UploadButton";

function EditArtworkPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageElement = (
    <>
      <h3 className="page-error-messages">{errorMessage}</h3>
    </>
  );

  const [showPopup, setShowPopup] = useState(false);
  
  const [artwork, setArtwork] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [city, setCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);
  
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [isForSale, setIsForSale] = useState(null)
  
  const navigate = useNavigate();

  // REACT SELECT OPTIONS
  let mediaOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Photography", label: "Photography" },
    { value: "Painting", label: "Painting" },
    { value: "Installation", label: "Installation" },
    { value: "Drawing", label: "Drawing" },
    { value: "Sculpture", label: "Sculpture" },
    { value: "Object", label: "Object" },
    { value: "Print", label: "Print" },
    { value: "Collage", label: "Collage" },
    { value: "Mixed Media", label: "Mixed Media" },
  ];
  let genreOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Surreal", label: "Surreal" },
    { value: "Dada", label: "Dada" },
    { value: "Minimal", label: "Minimal" },
    { value: "Digital", label: "Digital" },
    { value: "Abstract", label: "Abstract" },
    { value: "Figurative", label: "Figurative" },
    { value: "Conceptual", label: "Conceptual" },
    { value: "Real", label: "Real" },
    { value: "Natural", label: "Natural" },
    { value: "Arte Povera", label: "Arte Povera" },
    { value: "Pop", label: "Pop" },
    { value: "Ready Made", label: "Ready Made" },
    { value: "Assemblage", label: "Assemblage" },
    { value: "Concrete", label: "Concrete" },
    { value: "Kinetic", label: "Kinetic" },
    { value: "Political", label: "Political" },
    { value: "Interactive", label: "Interactive" },
    { value: "Art & Design", label: "Art & Design" },
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
      border: "0",
      outline: "red",
      borderRadius: "10px",
      boxShadow: "0 0 1rem var(--greydark)",
      padding: "0.2rem",
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: "red",
      border: "none",
      borderRadius: "0",
      // padding: "1rem"
      // borderBottom: "2px solid black",
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
    setCityOptions(germanCities);
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
        setOldImages(initialArtwork.images_url);
        setMedium(initialArtwork.medium);
        setGenre(initialArtwork.genre);
        setIsForSale(initialArtwork.is_for_sale)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    let formattedOptions = germanCities.map((oneCity) => {
      return { value: oneCity.city, label: oneCity.city };
    });
    setCityOptions(formattedOptions);
  }, []);

  function handleImagesUrl(filesToUpload) {
    // e.preventDefault();

    const files = Array.from(filesToUpload);
    const newImageData = [...imageData, ...files];

    const previewImages = newImageData.map((files) =>
      URL.createObjectURL(files)
    );

    console.log(previewImages);

    const newPreviews = [...previewImages];

    setImageData(newImageData);
    setNewImages(newPreviews);
    console.log("image data after adding new ", imageData);
  }

  function handleDeleteImage(index) {
    const newImagePreviews = [...newImages];
    const newImageData = [...imageData];

    newImageData.splice(index, 1);
    newImagePreviews.splice(index, 1);

    setImageData(newImageData);
    setNewImages(newImagePreviews);
  }

  function handleDeleteOldImage(index) {
    const copiedOldImages = [...oldImages];

    copiedOldImages.splice(index, 1);

    setOldImages(copiedOldImages);
  }

  // DELETE ARTWORK POPUP
  function handleYes(e) {
    e.preventDefault();

    artworksService
      .deleteArtwork(id)
      .then((deletedArtwork) => {
        console.log(deletedArtwork);
        setShowPopup(false);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteButton = (
  
      <button className="popup-button"
        onClick={(e) => {
          handleYes(e);
        }}
      >
        Yes
      </button>

  );

  function handleDeleteArtwork(e) {
    e.preventDefault();
    setShowPopup(true);
  }

  async function handleSubmit(e) {
    try {
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
        is_for_sale:isForSale,
      };

      console.log("imageData ", imageData);

      if (imageData.length > 0) {
        const uploadData = new FormData();

        imageData.forEach((file) => {
          uploadData.append("images", file);
        });

        const cloudinaryResponse = await uploadService.uploadImage(uploadData);

        let newImagesUrls = cloudinaryResponse.data.fileUrls;

        console.log("response is: ", cloudinaryResponse.data.fileUrls);

        let allImagesArray = [...oldImages, ...newImagesUrls];

        updatedArtwork.images_url = allImagesArray;
        const newImagesArtworkResponse = await artworksService.updateArtwork(
          artwork._id,
          updatedArtwork
        );

        console.log("successfully updated an artwork with images");
        console.log(newImagesArtworkResponse.data);
        navigate(`/artworks/${artwork._id}`);
      } else if (oldImages.length >= 1) {
        updatedArtwork.images_url = oldImages;
        const artworkResponse = await artworksService.updateArtwork(
          artwork._id,
          updatedArtwork
        );
        console.log("successfully updated an artwork");
        console.log(artworkResponse.data);
        navigate(`/artworks/${artwork._id}`);
      } else {
        setErrorMessage("The artwork needs to have at least one image");
      }
    } catch (err) {
      console.log("Error while uploading the file: ", err);
      setErrorMessage(err);
    }
  }

  return (
    <>
      {user && artwork && user._id === artwork.artist._id && (
        <div id="EditArtworkPage" className="page-wrapper mobile-dvh">
          <Popup
            headline={"Are you sure?"}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            text={"Deleting the artwork is irreversible"}
            button={deleteButton}
          />
          <div className="heading-wrapper">
            <h1 className="form-headline highlight">Edit Artwork</h1>
            <button
              className="back-button"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              {"< Back"}
            </button>
          </div>

          {artwork && (
            <form
              className="edit-artwork-form form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <label htmlFor="title">Title</label>
              <input
                required
                className="input"
                name="title"
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <label htmlFor="year">Year</label>
              <input
                required
                className="input"
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
                required
                options={cityOptions}
                onChange={handleCitiesSelectChange}
                value={{ label: city }}
                styles={selectStles}
              />

              {/* DIMENSIONS */}
              <label htmlFor="">Dimensions [cm]</label>
              <div className="edit-dimensions">
                <input
                  required
                  className="input dimensions-input"
                  type="number"
                  min={1}
                  value={dimensionsX}
                  onChange={(e) => {
                    setDimensionsX(e.target.value);
                  }}
                />
                w
                <input
                  required
                  className="input dimensions-input"
                  type="number"
                  min={1}
                  value={dimensionsY}
                  onChange={(e) => {
                    setDimensionsY(e.target.value);
                  }}
                />
                h
                <input
                  className="input dimensions-input"
                  type="number"
                  min={0}
                  value={dimensionsZ}
                  onChange={(e) => {
                    setDimensionsZ(e.target.value);
                  }}
                />
                d
              </div>
              
              <div className="edit-artwork-img-section">
                <div className="file-input-container">
                  <label htmlFor="upload">Images (max. 5 files)</label>
                  <FileUploader handleFileUpload = {handleImagesUrl} />
                </div>

                <div className="edit-artwork-thumbnail-wrapper">
                  {oldImages &&
                    oldImages.map((oneUrl, index) => {
                      return (
                        <div className="edit-artwork-img-thumbnail" key={index}>
                          <div className="edit-artwork-img-wrapper">
                            <img src={oneUrl} alt={title} />
                          </div>
                          <button
                            type="button"
                            className="delete-img-button"
                            onClick={() => {
                              handleDeleteOldImage(index);
                            }}
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
                  {newImages &&
                    newImages.map((oneUrl, index) => {
                      return (
                        <div className="edit-artwork-img-thumbnail" key={index}>
                          <div className="edit-artwork-img-wrapper">
                            <img src={oneUrl} alt={title} />
                          </div>
                          <button
                            type="button"
                            className="delete-img-button"
                            onClick={() => {
                              handleDeleteImage(index);
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
              <label htmlFor="medium" className="filterinterface-form-label">
                Medium
              </label>
              <Select
                required
                name="medium"
                options={mediaOptions}
                onChange={handleMediaSelectChange}
                value={{ label: medium }}
                styles={selectStles}
              />

              {/* GENRE */}
              <label htmlFor="genre" className="filterinterface-form-label">
                Genre
              </label>
              <Select
                name="genre"
                required
                options={genreOptions}
                onChange={handleGenreSelectChange}
                value={{ label: genre }}
                styles={selectStles}
              />

<div className="forsale">
          <input type="checkbox" checked={isForSale} onChange={()=>{setIsForSale(!isForSale)}} />
          <label htmlFor="forsale">Is this artwork for sale?</label>
        </div>

              <div className="edit-artwork-button-wrapper">
                <button
                  onClick={handleDeleteArtwork}
                  className="button edit-artwork-button-delete"
                >
                  Delete Artwork
                </button>
                <button
                  type="submit"
                  className="button edit-artwork-button-submit"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          )}
          {errorMessage && errorMessageElement}
        </div>
      )}
    </>
  );
}

export default EditArtworkPage;
