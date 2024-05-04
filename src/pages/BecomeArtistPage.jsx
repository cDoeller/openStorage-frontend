import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";
import cityService from "../services/city.services";
import uploadService from "../services/file-upload.services";
import artworksServices from "../services/artworks.services";
import Select from "react-select";
import "../styles/Forms.css";
import citiesGermany from "../data/cities-germany.json";

function BecomeArtistPage() {
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [artistStatement, setArtistStatement] = useState("");
  const [realName, setRealName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  // const [imagesUrl, setImagesUrl] = useState([]);
  const [imageData, setImageData] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [artworkCity, setArtworkCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");

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

  let countryOptions = [
    { value: "Germany", label: "Germany" },
  ];

  const [cityOptions, setCityOptions] = useState(null);
  const [artworkCityOptions, setArtworkCityOptions] = useState(null);

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
  function handleArtworkCitiesSelectChange(selectedOption) {
    setArtworkCity(selectedOption.value);
  }
  function handleCountrySelectChange(selectedOption) {
    setCountry(selectedOption.value);
  }

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

  // * CITY NAMES
  useEffect(() => {
    const cityNames = citiesGermany.map((oneCity) => {
      return { value: oneCity.city, label: oneCity.city };
    });
    setCityOptions(cityNames);
    setArtworkCityOptions(cityNames);
  }, []);

  useEffect(() => {
    userService.getUser(user._id).then((response) => {
      const initialData = response.data;
      setRealName(initialData.real_name);
      setStreet(initialData.contact.address.street);
      setCity(initialData.contact.address.city);
      setCountry(initialData.contact.address.country);
      setPostcode(initialData.contact.address.postal_code);
    });
  }, [user]);

  function handleDeleteImage(e, index) {
    e.preventDefault();
    const copiedImages = [...uploadedImages];
    copiedImages.splice(index, 1);
    setUploadedImages(copiedImages);
  }

  function handleImagesUpload(e) {
    e.preventDefault();

    const files = e.target.files;
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append("images", files[i]);
    }

    setImageData(uploadData);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      // performs the action of sending the data
      const cloudinaryResponse = await uploadService.uploadImage(imageData);

      let artworkData = {
        title: title,
        year: year,
        artist: user._id,
        city: artworkCity,
        dimensions: {
          x: dimensionsX,
          y: dimensionsY,
          z: dimensionsZ,
        },
        medium: medium,
        genre: genre,
      };

      artworkData.images_url = cloudinaryResponse.data.fileUrls;
      console.log("response is: ", cloudinaryResponse);
      // response carries "fileUrl" which we can use to update the state
      let copiedArray = [
        ...uploadedImages,
        ...cloudinaryResponse.data.fileUrls,
      ];
      setUploadedImages(copiedArray);

      const createFirstArtwork = await artworksServices.createArtwork(
        artworkData
      );
      console.log("response from artwork creation", createFirstArtwork);

      let verificationData = {
        real_name: realName,
        artist_statement: artistStatement,
        contact: {
          address: {
            street: street,
            city: city,
            country: country,
            postal_code: postcode,
          },
        },
        artwork: createFirstArtwork.data.newArtwork,
      };

      console.log("verification data sent to backend", verificationData);

      const verificationResponse = await userService.verifyArtist(
        user._id,
        verificationData
      );
      console.log("response from verification: ", verificationResponse);

      navigate(`/profile`);
    } catch (err) {
      console.log("Error while verifying artist: ", err);
    }
  }

  return (
    <div className="page-wrapper mobile-dvh">
      <div className="heading-wrapper">
        <h1>Become an Artist</h1>
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
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="real name">Real Name</label>
        <input
          className="input"
          type="text"
          required
          name="real name"
          value={realName}
          onChange={(e) => {
            setRealName(e.target.value);
          }}
        />

        <label htmlFor="artist-statement">Artist Statement</label>
        <textarea
          className="textarea"
          name="artist-statement"
          required
          value={artistStatement}
          onChange={(e) => {
            setArtistStatement(e.target.value);
          }}
          placeholder="Write a short description of your artistic practice"
        />

        <h4>Contact Information</h4>
        <label htmlFor="street">Street Name / No.</label>
        <input
          name="street"
          type="text"
          required
          className="input"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />

        <label htmlFor="city">City</label>
        <Select
          name="city"
          required
          options={cityOptions}
          onChange={handleCitiesSelectChange}
          value={{ label: city }}
          styles={selectStles}
        />

        <label htmlFor="">Country</label>
        <Select
          required
          options={countryOptions}
          onChange={handleCountrySelectChange}
          value={{ label: country }}
          styles={selectStles}
        />

        <label htmlFor="">Postal Code</label>
        <input
          type="text"
          className="input"
          required
          minLength={4}
          maxLength={5}
          value={postcode && postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
        />

        <h4>Upload Artwork</h4>

        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          required
          className="input"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <label htmlFor="year">Year</label>
        <input
          name="year"
          type="number"
          required
          className="input"
          value={year}
          onChange={(e) => {
            setYear(e.target.valueAsNumber);
          }}
        />

        {/* CITY */}
        <label htmlFor="artworkcity" className="filterinterface-form-label">
          City
        </label>
        <Select
          name="artworkcity"
          required
          options={artworkCityOptions}
          onChange={handleArtworkCitiesSelectChange}
          value={{ label: artworkCity }}
          styles={selectStles}
        />

        <label htmlFor="">Images</label>
        <input
          type="file"
          required
          multiple
          className="input"
          onChange={(e) => {
            handleImagesUpload(e);
          }}
        />
        {/* <button onClick={(e)=>{handleImagesUpload(e)}}>Upload Image</button> */}
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

        <label htmlFor="">Dimensions [cm]</label>
        <div className="create-dimensions-wrapper">
          <input
            className="create-artwork-input"
            type="number"
            required
            min={0}
            value={dimensionsX}
            onChange={(e) => {
              setDimensionsX(e.target.valueAsNumber);
            }}
          />
          x
          <input
            className="create-artwork-input"
            type="number"
            required
            min={0}
            value={dimensionsY}
            onChange={(e) => {
              setDimensionsY(e.target.valueAsNumber);
            }}
          />
          y
          <input
            className="create-artwork-input"
            type="number"
            min={0}
            value={dimensionsZ}
            onChange={(e) => {
              setDimensionsZ(e.target.valueAsNumber);
            }}
          />
          z
        </div>
        {/* MEDIUM */}
        <label htmlFor="" className="filterinterface-form-label">
          Medium
        </label>
        <Select
          required
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
          required
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

export default BecomeArtistPage;
