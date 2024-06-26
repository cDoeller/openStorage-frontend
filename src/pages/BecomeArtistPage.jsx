import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";
import uploadService from "../services/file-upload.services";
import artworksServices from "../services/artworks.services";
import Select from "react-select";
// import Loading from "../components/Loading"
import "../styles/styles-templates/Forms.css";
import "../styles/styles-pages/CreateArtwork.css";
import citiesGermany from "../data/cities-germany.json";
import FileUploader from "../components/UploadButton";

function BecomeArtistPage() {
  const { user } = useContext(AuthContext);
  const [isArtist,setIsArtist] = useState(false)
  
  const [errorMessage,setErrorMessage] = useState(null)
  const errorMessageElement = (
    <>
      <h3 className="page-error-messages">{errorMessage}</h3>
    </>
  );

  
  // const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate();

  const [isForSale, setIsForSale] = useState(false)
  
  // console.log("is loading ?", isLoading)
  const [artistStatement, setArtistStatement] = useState("");
  const [realName, setRealName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);

  // Image states
  const [imageData, setImageData] = useState([]);
  // const [imageToUpload, setImageToUpload] = useState("");
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  let countryOptions = [{ value: "Germany", label: "Germany" }];

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
      border: "0",
      outline: "red",
      borderRadius: "10px",
      boxShadow: '0 0 1rem var(--greydark)',
      padding: "0.2rem"
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
      const address = initialData.contact.address;

      setIsArtist(initialData.isArtist)
      
      if (initialData.real_name) {
        setRealName(initialData.real_name);
      }
      
      if (address) {
        if (address.street) {
          setStreet(address.street);
        }
        if (address.city) {
          setCity(address.city);
        }
        if (address.postal_code) {
          setPostcode(address.postal_code);
        }
        if (address.country) {
          setCountry(address.country);
        }
      }
    });
  }, [user]);

  function handleDeleteImage(index) {
    const newImageData = [...imageData];
    const newImagePreviews = [...imagePreviews];

    newImageData.splice(index, 1);
    newImagePreviews.splice(index, 1);

    setImageData(newImageData);
    setImagePreviews(newImagePreviews);
  }

  function handleImagesUpload(filesToUpload) {
    // e.preventDefault();
    setErrorMessage("")

    const files = filesToUpload;
    const newImageData = [...files, ...imageData];

    setImageData(newImageData);

    const newImagePreviews = newImageData.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(newImagePreviews);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      
      
      if(imageData.length > 0){
        // setErrorMessage("Missing images for artwork. Please upload at least 1 image.")
      }
      const formData = new FormData();
      imageData.forEach((file) => formData.append("images", file));
      
      const cloudinaryResponse = await uploadService.uploadImage(formData);

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
        is_for_sale: isForSale
      };

      artworkData.images_url = cloudinaryResponse.data.fileUrls;
      console.log("response is: ", cloudinaryResponse);

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

      

      // setIsLoading(false)
      // console.log("is loading ?", isLoading)

      navigate(`/profile`);

    } catch (err) {
      console.log("Error while verifying artist: ", err);
      setErrorMessage(err.response.data.message)
    }
  }

  return (
<>
    {/* {isLoading && <Loading />} */}
    {!isArtist && (
      <>
    <div className="page-wrapper mobile-dvh">
      <div className="heading-wrapper">
        <h1 className="highlight form-headline">Verify Artist Account</h1>
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
          minLength={2}
          maxLength={50}
          autoComplete="name"
          required
          name="real name"
          value={realName && realName}
          onChange={(e) => {
            setRealName(e.target.value);
          }}
        />

        <label htmlFor="artist-statement">Artist Statement</label>
        <textarea
          className="textarea"
          name="artist-statement"
          required
          minLength={20}
          maxLength={300}
          value={artistStatement && artistStatement}
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
          minLength={5}
          maxLength={100}
          autoComplete="street-address"
          className="input"
          value={street && street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />

        <label htmlFor="city">City</label>
        <Select
          name="city"
          required
          autoComplete="address-level2"
          options={cityOptions}
          onChange={handleCitiesSelectChange}
          value={{ label: city }}
          styles={selectStles}
        />

        <label htmlFor="">Country</label>
        <Select
          required
          autoComplete="country"
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
          autoComplete="postal-code"
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

        <div className="create-artwork-image-section">
          <div className="file-input-container">
            <label htmlFor="">Images (max. 5 files)</label>
            <FileUploader handleFileUpload={handleImagesUpload} />
            <div className="create-artwork-thumbnail-wrapper">
              {imagePreviews &&
                imagePreviews.map((oneImage, index) => {
                  return (
                    <div key={index} className="create-artwork-img-thumbnail">
                    <div className="create-artwork-img-wrapper">
                      <img src={oneImage} alt={title} />
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
        </div>

        <label htmlFor="">Dimensions [cm]</label>
        <div className="create-dimensions-wrapper">
          <input
            className="create-artwork-input input dimensions-input"
            type="number"
            required
            min={1}
            value={dimensionsX}
            onChange={(e) => {
              setDimensionsX(e.target.valueAsNumber);
            }}
          />
          w
          <input
            className="create-artwork-input input dimensions-input"
            type="number"
            required
            min={1}
            value={dimensionsY}
            onChange={(e) => {
              setDimensionsY(e.target.valueAsNumber);
            }}
          />
          h
          <input
            className="create-artwork-input input dimensions-input"
            type="number"
            min={0}
            value={dimensionsZ}
            onChange={(e) => {
              setDimensionsZ(e.target.valueAsNumber);
            }}
          />
          d
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

        <div className="forsale">
          <input type="checkbox" checked={isForSale} onChange={()=>{setIsForSale(!isForSale)}} />
          <label htmlFor="forsale">Is this artwork for sale?</label>
        </div>

        <button type="submit" className="button submit-button">Submit</button>
        {errorMessage && errorMessageElement}
      </form>
    </div>
      </>
    )}
</>
  );
}

export default BecomeArtistPage;
